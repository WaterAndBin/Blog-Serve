const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证规则对象
const {
    reg_login_schema,
    res_user_update
} = require('../schema/user')

// 导入用户路由处理函数对应的模块
const menu = require('../module/menu')

/* 获取所有的菜单数据，包括 status == 1 */
router.get('/getAllMenu', menu.getAllMenu)
/* 获取菜单数据，一般都是渲染在侧边栏才调用 */
router.get('/getMenu', menu.getMenu)
/* 添加菜单 */
router.post('/addMenu', menu.addMenu)
/* 修改菜单数据 */
router.post('/updateMenu', menu.updateMenu)

module.exports = router