// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单的数据
    const userinfo = req.body
    console.log(req)
    console.log('成功了！')

    res.send({
        status: 200,
        message: '这是一条成功的消息',
    })
}