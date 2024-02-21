const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证规则对象
const {
    pageRules
} = require('../schema/common')
// 导入用户路由处理函数对应的模块
const role = require('../module/role')

// 注册新用户
router.post('/getRoleList', expressJoi(pageRules), role.getRoleList)

module.exports = router