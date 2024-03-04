const knex = require('../../mysql/index')

/**
 * 插入元素通用方法
 * @param {*} req 
 * @param {*} res 
 * @param {*} schema 哪个模块
 * @param {*} data 需要插入的数据
 * @param {*} message 消息
 */
const insertData = (req, res, schema, data, message, callback) => {
    const originContainer = 'blog' // 具体是哪一张表
    /* 插入数据 */
    knex(`${originContainer}.${schema}`)
        .insert({
            ...data
        })
        .then(() => {
            res.send({
                code: 200,
                message
            })

            if (callback && typeof callback == 'function') {
                callback(req, res)
            }
        })
        .catch(err => {
            console.log(err)
            res.error(`${req.path} 数据库出错`, 500)
        });
}

module.exports = insertData