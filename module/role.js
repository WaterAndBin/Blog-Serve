const knex = require('../mysql/index')

// 登录的处理函数
exports.getRoleList = (req, res) => {
    // 接收表单的数据
    console.log('成功了！')
    knex('blog.role_table').select().then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })

    res.send({
        status: 200,
        message: '这是一条成功的消息',
    })
}