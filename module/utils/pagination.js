const knex = require('../../mysql/index')
/**
 * 默认分页功能
 * @param {*} req 
 * @param {*} res 
 * @param {*} schema 
 */
const pagination = (req, res, schema, message) => {
    const originContainer = 'blog' // 具体是哪一张表
    const {
        page = 1, pageSize = 10
    } = req.query; // 获取当前页数和每页展示数量
    const startIndex = (page - 1) * pageSize; // 计算起始查询位置

    knex(`${originContainer}.${schema}`).count('* as total') // 查询数据总数
        .then(([{
            total
        }]) => {
            return knex(`blog.${schema}`)
                .select()
                .limit(pageSize)
                .offset(startIndex) // 查询当前页的数据
                .then((data) => {
                    // const totalPages = Math.ceil(total / pageSize); // 计算总页数
                    res.send({
                        code: 200,
                        date: {
                            currentPage: page,
                            pageSize,
                            total,
                            // totalPages,
                            data,
                        },
                        message: `获取${message}成功`
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