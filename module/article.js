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
    let data = {
        author_id: req.auth.id,
        created_time: getFullTime(),
        type: 1,
        ...req.body
    }
    insertData(req, res, 'article_table', data, '发布文章成功')
};

/**
 * 获取未审核文章列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getAuditArticleList = (req, res) => {
    const {
        page, pageSize
    } = req.body; // 获取当前页数和每页展示数量
    const startIndex = (page - 1) * pageSize; // 计算起始查询位置

    knex(`blog.article_table`)
        .count('* as total') // 查询数据总数
        .where('type', 1) // 添加筛选条件：is_deleted=0
        .then(([{ total }]) => {
            knex(`blog.article_table`)
                .where('type', 1) //
                .limit(pageSize)
                .offset(startIndex)
                .then((data) => {
                    res.send({
                        code: 200,
                        data: {
                            currentPage: page,
                            pageSize,
                            total,
                            list: data,
                        },
                        message: `获取未审核文章列表成功`,
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                code: 500,
                message: '服务器错误',
            });
        });
};
