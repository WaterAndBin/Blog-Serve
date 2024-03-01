// 注册路由
module.exports = (app) => {
    app.use('/user', require('./router/user'))
    app.use('/role', require('./router/role'))
    app.use('/tabs', require('./router/tabs'))
    app.use('/menu', require('./router/menu'))
    app.use('/permissions', require('./router/permissions'))
}