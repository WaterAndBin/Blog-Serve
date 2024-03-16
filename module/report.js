/* 文章 */
const knex = require('../mysql/index')
const insertData = require('./utils/insertData')
/* 分页方法 */
const pagination = require('./utils/pagination')
/* 获取到当前事件 */
const getFullTime = require('../utils/time')
/* 更新通用方法 */
const updateData = require('./utils/updateData')

/**
 * 举报文章
 * @param {*} req 
 * @param {*} res 
 */
exports.reportArticle = (req, res) => {
    console.log(req.body)
    insertData(req, res, 'report_table', { ...req.body }, '举报文章成功')
}