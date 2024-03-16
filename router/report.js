const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户路由处理函数对应的模块
const report = require('../module/report')

/* 举报文章 */
router.post('/reportArticle', report.reportArticle)

module.exports = router