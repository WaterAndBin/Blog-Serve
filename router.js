// 注册路由
module.exports = (app) => {
    app.use('/users', require('./router/user'))
    app.use('/role', require('./router/role'))
}