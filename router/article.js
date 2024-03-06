/* 文章 */
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
const article = require('../module/article')

/* 发布文章 */
router.post('/publishArticle', article.publishArticle)
/* 获取文章 */
router.post('/getArticle', article.getArticle)

module.exports = router