const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户路由处理函数对应的模块
const permissions = require('../module/permissions')

// 设置菜单的权限
router.post('/setMenuPermissions', permissions.setMenuPermissions)
// 创建菜单权限列表
router.post('/createMenuPermissions', permissions.createMenuPermissions)
// 获取菜单权限列表数据
router.post('/getMenuPermissionsList', permissions.getMenuPermissionsList)

module.exports = router