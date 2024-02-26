/* 数据库工具 */
const knex = require('../mysql/index')
/* 加密 */
const NodeRSA = require('node-rsa');
/* 获取到当前事件 */
const getFullTime = require('../utils/time')
/* 随机生成名字工具 */
const faker = require('faker');

// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单的数据
    const userinfo = req.body
    console.log(req)
    console.log('成功了！')

    res.send({
        code: 200,
        message: '这是一条成功的消息',
        token: ''
    })
}

// 注册的处理函数
exports.register = (req, res) => {
    // 接收表单的数据
    // console.log(req.body)
    const {
        account,
        password
    } = req.body

    /* 检查是否有重复的账号 */
    knex('user_table') // 请替换为你的表名  
        .select('account', knex.raw('COUNT(*) as count'))
        .groupBy('account')
        .having('count', '>', 1)
        .then(rows => {
            // 如果 rows 有内容，说明有重复的 account  
            if (rows.length > 0) {
                res.error('已存在相同的账号', 201)
            } else {
                /* 生成密钥 */
                const key = new NodeRSA({ b: 512 });
                /* 加密之后的密码 */
                let encryptPassword = key.encrypt(password, 'base64');
                /* 插入数据 */
                knex('user_table')
                    .insert({
                        user_name: faker.name.findName(),
                        account: account, // 账号
                        password: encryptPassword, // 密码
                        role_id: 1, // 角色id
                        create_time: getFullTime()
                    })
                    .then(() => {
                        res.send({
                            code: 200,
                            message: '注册成功',
                        })
                    })
                    .catch(err => {
                        console.error('插入数据出错:', err);
                    });
            }
        })
        .catch(err => {
            console.error('查询出错:', err);
        });
}