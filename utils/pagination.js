const knex = require('../mysql/index')

/* 分页功能 */
const pagination = (req, res) => {
    const { page = 1, pageSize = 10 } = req.query; // 获取当前页数和每页展示数量
    const startIndex = (page - 1) * pageSize; // 计算起始查询位置

    knex('blog.role_table').count('* as total') // 查询数据总数
        .then(([{ total }]) => {
            return knex('blog.role_table')
                .select()
                .limit(pageSize)
                .offset(startIndex) // 查询当前页的数据
                .then((data) => {
                    const totalPages = Math.ceil(total / pageSize); // 计算总页数
                    res.send({
                        status: 200,
                        message: {
                            currentPage: page,
                            pageSize,
                            total,
                            totalPages,
                            data,
                        },
                    });
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: '服务器错误',
            });
        });
};