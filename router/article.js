/* 文章 */
const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证规则对象
const {
    pageRules
} = require('../schema/common')
const {
    reg_login_schema,
    res_user_update
} = require('../schema/user')

// 导入用户路由处理函数对应的模块
const article = require('../module/article')

/* 发布文章 */
router.post('/publishArticle', article.publishArticle)
/* 获取未审核文章列表 */
router.post('/getAuditArticleList', expressJoi(pageRules), article.getAuditArticleList)
/* 文章审核 */
router.post('/setAuditArticle', article.setAuditArticle)
/* 获取我个人的文章 */
router.post('/getMyArticle', article.getMyArticle)
/* 更新文章 */
router.post('/updateArticle', article.updateArticle)
/* 获取文章所有列表 */
router.post('/getAllArticleList', article.getAllArticleList)
/* 获取文章详细数据 */
router.post('/getArticleDetail', article.getArticleDetail)
/* 获取举报文章列表 */
router.post('/getRejectArticleList', article.getRejectArticleList)

module.exports = router