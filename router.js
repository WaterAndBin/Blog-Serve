// 注册路由
module.exports = (app) => {
    app.use('/user', require('./router/user'))
    app.use('/role', require('./router/role'))
}