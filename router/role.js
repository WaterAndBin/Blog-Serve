const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证规则对象
const {
    pageRules
} = require('../schema/common')
const {
    reg_insert_role, reg_update_role
} = require('../schema/role')
// 导入用户路由处理函数对应的模块
const role = require('../module/role')

// 获取到角色列表
router.post('/getRoleList', expressJoi(pageRules), role.getRoleList)
/* 插入角色 */
router.post('/addRole', expressJoi(reg_insert_role), role.addRole)
/* 更新数据 */
router.post('/updateRole', expressJoi(reg_update_role), role.updateRole)
/* 获取到所有角色 */
router.get('/getAllRole', role.getAllRole)

module.exports = router