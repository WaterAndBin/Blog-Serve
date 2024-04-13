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
 * 发送评论
 * @param {*} req 
 * @param {*} res 
 */
exports.reqComments = (req, res) => {
    const data = {
        ...req.body,
        reviewer_id: req.auth.id,
        reviewer_time: getFullTime()
    }
    insertData(req, res, 'comments_table', data, '评论成功')
}

/**
 * 获取评论
 * @param {*} req 
 * @param {*} res 
 */
exports.getComments = (req, res) => {
    knex('comments_table')
        .where({
            article_id: req.body.article_id
        }).andWhere('is_deleted', '=', '0') // 添加查询条件  
        .then(rows => {
            const articlePromises = rows.map(article => {
                return knex(`user_table`)
                    .where('id', article.reviewer_id)
                    .select(['id', 'user_name', 'role_id', 'account', 'created_time', 'is_deleted', 'status'])
            });
            // 等待所有作者信息查询完成  
            Promise.all(articlePromises)
                .then(authors => {
                    // 组合文章和作者信息  
                    const data = rows.map((article, index) => {
                        return {
                            ...article,
                            author: authors[index][0]
                        };
                    });
                    res.send({
                        code: 200,
                        data: data,
                        message: `获取未审核文章列表成功`,
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send({
                        code: 500,
                        message: '服务器错误',
                    });
                });
        })
        .catch(err => {
            console.log(error);
            res.status(500).send({
                code: 500,
                message: '服务器错误',
            });
        });
}