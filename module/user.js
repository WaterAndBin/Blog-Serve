/* 导入md5 */
const md5 = require('md5');

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
    console.log(req.body)

    res.send({
        code: 200,
        message: '注册成功',
    })
}