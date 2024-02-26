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
    const {
        account,
        password
    } = req.body

    knex('user_table')
        .where('account', account).first()
        .then(result => {
            /* 生成密钥 */
            const key = new NodeRSA({
                b: 512
            });
            console.log(result.password)
            /* 解密密码 */
            let decryptPassword = key.decrypt(result.password, 'utf8');
            /* 判断密码是否相同 */
            if (decryptPassword == password) {
                res.send({
                    code: 200,
                    message: '查询成功！',
                    data: result
                });
            } else {
                res.error(201, '密码错误')
            }
        })
        .catch(error => {
            console.log(error)
            res.error(500, `${req.path} 数据库出错`)
        });
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
        .select('account')
        .where('account', account)
        .then(rows => {
            // 如果 rows 有内容，说明有重复的 account  
            if (rows.length > 0) {
                res.error(201, '已存在相同的账号')
            } else {
                /* 生成密钥 */
                const key = new NodeRSA({
                    b: 512
                });
                /* 加密之后的密码 */
                let encryptPassword = key.encrypt(password, 'base64');
                /* 插入数据 */
                knex('user_table')
                    .insert({
                        user_name: faker.name.findName(), // 用户姓名
                        account: account, // 账号
                        password: encryptPassword, // 密码
                        role_id: 1, // 角色id
                        create_time: getFullTime() // 创建时间
                    })
                    .then(() => {
                        res.info(200, '注册成功')
                    })
                    .catch(err => {
                        console.log(err)
                        res.error(500, `${req.path} 数据库出错`)
                    });
            }
        })
        .catch(err => {
            console.log(err)
            res.error(500, `${req.path} 数据库出错`)
        });
}