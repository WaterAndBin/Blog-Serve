const knex = require('../../mysql/index')
/* 获取到当前事件 */
const getFullTime = require('../../utils/time')

/**
 * 插入元素通用方法
 * @param {*} req 
 * @param {*} res 
 * @param {*} schema 哪个模块
 * @param {*} message 消息
 */
const updateData = (req, res, schema, message) => {
    const originContainer = 'blog' // 具体是哪一张表
    /* 获取当前时间 */
    const fullTime = getFullTime()
    /* 创建一个临时的数据 */
    let timerData
    if (req.path == '/reportArticle') {
        timerData = {
            ...req.body,
        }
    } else {
        timerData = {
            ...req.body,
            updated_id: req.auth.id,
            updated_time: fullTime
        }
    }

    knex(`${originContainer}.${schema}`) // 'roles' 是你想要更新的表
        .where({ id: req.body.id }) // 使用where子句指定需要更新的记录，这里假设按照id来更新
        .update({ ...timerData }) // newRoleData 包含了你想要更新的字段和它们的新值
        .then((result) => {
            console.log(result)
            res.send({
                code: 200,
                massage: message
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

module.exports = updateData