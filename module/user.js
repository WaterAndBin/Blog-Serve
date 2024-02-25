/* 导入md5 */
const md5 = require('md5');
const knex = require('../mysql/index')
const {
    encrypt
} = require('../utils/password')

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

    console.log(encrypt(password))
    return
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
                // 将密码进行加密
                console.log(encrypt(password))

                // res.send({
                //     code: 200,
                //     message: '注册成功',
                // })
            }
        })
        .catch(err => {
            console.error('查询出错:', err);
        });
}