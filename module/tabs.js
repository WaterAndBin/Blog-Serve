/* 标签 */
const knex = require('../mysql/index')
const insertData = require('./utils/insertData')
/* 分页方法 */
const pagination = require('./utils/pagination')
/* 获取到当前事件 */
const getFullTime = require('../utils/time')
/* 更新通用方法 */
const updateData = require('./utils/updateData')
/* 获取所有的数据 */
const getAllData = require('./utils/getAllData')

/**
 * 获取标签列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getTabsList = (req, res) => {
    pagination(req, res, 'tabs_table', '标签列表')
};

/**
 * 添加标签
 * @param {*} req 
 * @param {*} res 
 */
exports.addTabs = (req, res) => {
    console.log('进来了')
    /* 获取到用户的id */
    const {
        id
    } = req.auth
    /* 获取到当前的时间 */
    const fullTime = getFullTime()
    /* 获取角色名字 */
    const {
        tab_name
    } = req.body;
    console.log(tab_name)
    /* 创建一个需要插入的元素 */
    const insertState = {
        tab_name,
        created_id: id,
        created_time: fullTime
    }
    /* 调用公用的插入元素 */
    insertData(req, res, 'tabs_table', insertState, '添加标签成功')
};

/**
 * 修改标签
 * @param {*} req 
 * @param {*} res 
 */
exports.updateTabs = (req, res) => {
    updateData(req, res, 'tabs_table', '修改标签数据成功')
};

/**
 * 获取所有的标签
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllTabs = (req, res) => {
    getAllData(req, res, 'tabs_table', '获所有标签成功')
};