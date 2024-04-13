/* 评论 */
const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户路由处理函数对应的模块
const comments = require('../module/comments')

// 发送评论
router.post('/reqComments', comments.reqComments)
/* 获取评论 */
router.post('/getComments', comments.getComments)

module.exports = router