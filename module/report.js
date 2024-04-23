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
    /* 插入消息 */
    insertData(req, res, 'report_table', {
        ...req.body
    }, '举报文章成功')

    /* 改变文章状态 */
    knex(`article_table`)
        .where({
            id: req.body.article_id
        }).first()
        .update({
            type: 1
        })
        .then((result) => {
            res.send({
                code: 200,
                message: '举报成功',
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                code: 500,
                message: '服务器错误',
            });
        });
}

/**
 * 获取举报列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getRejectReasonList = (req, res) => {
    knex('report_table')
        .where({
            id: req.body.id
        }).andWhere('type', '=', '0') // 添加查询条件  
        .then(rows => {
            console.log(rows)
            res.send({
                code: 200,
                data: rows,
                message: '获取举报列表成功'
            })
        })
        .catch(err => {
            console.log(error);
            res.status(500).send({
                code: 500,
                message: '服务器错误',
            });
        });
}

/**
 * 处理举报列表
 * @param {*} req 
 * @param {*} res 
 */
exports.handleRejectReasonList = (req, res) => {
    knex('report_table')
        .update({
            type: 1
        })
        .where({
            article_id: req.body.article_id
        }) // 添加更新条件  
        .then(affectedRows => {
            res.send({
                code: 200,
                message: '处理举报列表成功'
            })
        })
        .catch(err => {
            res.error(
                err,
                500
            );
        });
}