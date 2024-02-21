/* 导入express */
const express = require('express')

/* 创建服务器的实例对象 */
const app = express()

// 导入并配置 cros 中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件，注意这个中间件只能解析 x-www-form-urlencoded 的数据
app.use(express.urlencoded({
    extended: false
}))

// 检查用户请求的地址和方法
app.use((req, res, next) => {
    console.log(`收到请求：${req.method} ${req.path}`)
    next()
})

// 一定要在路由之前，封装全局错误信息
app.use((req, res, next) => {
    // status 默认值为1 表示失败的情况
    // err的值，可能是一个错误对象，也可以是一个错误的描述字符串
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 获取，更新用户信息的api接口
const users = require('./router/user')
app.use('/users', users)
/* 获取角色 */
const role = require('./router/role')
app.use('/role', role)

// 启动服务器
app.listen(9090, () => {
    console.log('http://127.0.0.1:9090')
})