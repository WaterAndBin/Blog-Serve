// 注册路由
module.exports = (app) => {
    app.use('/user', require('./router/user')) // 用户
    app.use('/role', require('./router/role')) // 角色
    app.use('/tabs', require('./router/tabs')) // 标签
    app.use('/menu', require('./router/menu')) // 菜单
    app.use('/permissions', require('./router/permissions')) // 权限
    app.use('/article', require('./router/article')) // 文章
    app.use('/upload', require('./router/upload')) // 上传照片
    app.use('/report', require('./router/report')) // 举报
    app.use('/comments', require('./router/comments')) // 评论
}