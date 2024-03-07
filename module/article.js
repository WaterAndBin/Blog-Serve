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
 * 发布文章
 * @param {*} req 
 * @param {*} res 
 */
exports.publishArticle = (req, res) => {
    console.log(req.body)
};

/**
 * 获取文章列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getArticle = (req, res) => {
    pagination(req, res, 'article_table', '文章列表')
};