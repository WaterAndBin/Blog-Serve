const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证规则对象
const {
    pageRules
} = require('../schema/common')
const {
    reg_insert_tabs,
    reg_update_tabs
} = require('../schema/tabs')
// 导入用户路由处理函数对应的模块
const tabs = require('../module/tabs')

// 获取到角色列表
router.post('/getTabsList', expressJoi(pageRules), tabs.getTabsList)
/* 插入角色 */
router.post('/addTabs', expressJoi(reg_insert_tabs), tabs.addTabs)
/* 更新数据 */
router.post('/updateTabs', expressJoi(reg_update_tabs), tabs.updateTabs)

module.exports = router