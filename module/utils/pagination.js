const knex = require('../../mysql/index')
/**
 * 默认分页功能
 * @param {*} req 
 * @param {*} res 
 * @param {*} schema 
 * 目前会将 is_deleted == 1 的 排除掉
 */
const pagination = (req, res, schema, message) => {
    const originContainer = 'blog' // 具体是哪一张表
    const {
        page, pageSize
    } = req.body; // 获取当前页数和每页展示数量
    const startIndex = (page - 1) * pageSize; // 计算起始查询位置

    knex(`${originContainer}.${schema}`)
        .count('* as total') // 查询数据总数
        .where('is_deleted', 0) // 添加筛选条件：is_deleted=0
        .then(([{ total }]) => {
            knex(`${originContainer}.${schema}`)
                .select()
                .where('is_deleted', 0) // 添加筛选条件：is_deleted=0
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
                        message: `${message}`,
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

module.exports = pagination