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
        status: 1,
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
        .where('status', 1)
        .then(([{ total }]) => {
            knex(`blog.article_table`)
                .where('status', 1) //
                .limit(pageSize)
                .offset(startIndex)
                .then((articles) => {
                    const articlePromises = articles.map(article => {
                        return knex(`user_table`)
                            .where('id', article.author_id)
                            .select(['id', 'user_name', 'role_id', 'account', 'created_time', 'is_deleted', 'status'])
                    });

                    // 等待所有作者信息查询完成  
                    Promise.all(articlePromises)
                        .then(authors => {
                            // 组合文章和作者信息  
                            const data = articles.map((article, index) => {
                                return {
                                    ...article,
                                    author: authors[index][0]
                                };
                            });
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
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).send({
                                code: 500,
                                message: '服务器错误',
                            });
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

/**
 * 文章通过审核
 * @param {*} req 
 * @param {*} res 
 */
exports.setAuditArticle = (req, res) => {
    /* 获取当前时间 */
    const fullTime = getFullTime()
    /* 创建一个临时的数据 */
    const timerData = {
        ...req.body,
        auditors: req.auth.id,
        review_time: fullTime
    }

    knex(`blog.article_table`) // 'roles' 是你想要更新的表
        .where({ id: req.body.id }) // 使用where子句指定需要更新的记录，这里假设按照id来更新
        .update({ ...timerData }) // newRoleData 包含了你想要更新的字段和它们的新值
        .then((result) => {
            res.send({
                code: 200,
                massage: '审核成功'
            })
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
 * 文章通过审核
 * @param {*} req 
 * @param {*} res 
 */
exports.getMyArticle = (req, res) => {
    const {
        page, pageSize
    } = req.body; // 获取当前页数和每页展示数量
    const startIndex = (page - 1) * pageSize; // 计算起始查询位置

    knex(`blog.article_table`)
        .count('* as total') // 查询数据总数
        .where('is_deleted', 0) // 添加筛选条件：is_deleted=0
        .then(([{ total }]) => {
            knex(`blog.article_table`)
                .where('author_id', req.auth.id) // 添加筛选条件：is_deleted=0
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
                        message: `获取个人文章列表成功`,
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
}

/**
 * 更改文章
 * @param {*} req 
 * @param {*} res 
 */
exports.updateArticle = (req, res) => {
    updateData(req, res, 'article_table', '修改标签数据成功')
}

/**
 * 前台：获取所有的文章列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllArticleList = (req, res) => {
    const {
        page, pageSize
    } = req.body; // 获取当前页数和每页展示数量
    const startIndex = (page - 1) * pageSize; // 计算起始查询位置

    knex(`blog.article_table`)
        .count('* as total') // 查询数据总数
        .where('status', 2)
        .andWhere('is_deleted', '=', 0)
        .then(([{ total }]) => {
            knex(`blog.article_table`)
                .where('status', 2)
                .andWhere('is_deleted', '=', 0)
                .limit(pageSize)
                .offset(startIndex)
                .then((articles) => {
                    if (articles.length != 0) {
                        const articlePromises = articles.map(article => {
                            return knex(`user_table`)
                                .where('id', article.author_id)
                                .select(['id', 'user_name', 'role_id', 'account', 'created_time', 'is_deleted', 'status'])
                        });

                        // 等待所有作者信息查询完成  
                        Promise.all(articlePromises)
                            .then(authors => {
                                // 组合文章和作者信息  
                                const data = articles.map((article, index) => {
                                    return {
                                        ...article,
                                        author: authors[index][0]
                                    };
                                });
                                res.send({
                                    code: 200,
                                    data: {
                                        currentPage: page,
                                        pageSize,
                                        total,
                                        list: data,
                                    },
                                    message: `获取所有文章列表成功`,
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).send({
                                    code: 500,
                                    message: '服务器错误',
                                });
                            });
                    } else {
                        res.send({
                            code: 200,
                            data: {
                                currentPage: page,
                                pageSize,
                                total,
                                list: articles,
                            },
                            message: `获取所有文章列表成功`,
                        })
                    }
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

/**
 * 获取文章详细数据
 * @param {*} req 
 * @param {*} res 
 */
exports.getArticleDetail = (req, res) => {
    const { id } = req.body
    knex('blog.article_table').where('id', id).first()
        .then((row) => {
            knex('blog.user_table').where('id', row.author_id).first()
                .then((data) => {
                    res.send({
                        code: 200,
                        data: {
                            ...row,
                            author: data
                        },
                        message: '获取文章详情成功'
                    })
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send({
                        code: 500,
                        message: '获取文章详情失败',
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
                code: 500,
                message: '获取文章详情失败',
            });
        });
};

/**
 * 举报文章
 * @param {*} req 
 * @param {*} res 
 */
exports.reportArticle = (req, res) => {
    updateData(req, res, 'article_table', '举报文章成功')
}
