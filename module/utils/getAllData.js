const knex = require('../../mysql/index')

/**
 * 获取所有的数据
 * @param {*} req 
 * @param {*} res 
 * @param {*} schema 哪个模块
 * @param {*} message 消息
 */
const getAllData = (req, res, schema, message) => {
    const originContainer = 'blog' // 具体是哪一张表
    knex(`${originContainer}.${schema}`)
        .select()
        .where('is_deleted', 0) // 添加筛选条件：is_deleted=0
        .where('status', 0) // 添加筛选条件：is_deleted=0
        .then((data) => {
            res.send({
                code: 200,
                data,
                message: message,
            });
        });
}

module.exports = getAllData