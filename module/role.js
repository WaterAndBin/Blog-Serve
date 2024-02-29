const knex = require('../mysql/index')
const insertData = require('./utils/insertData')
/* 分页方法 */
const pagination = require('./utils/pagination')
/* 获取到当前事件 */
const getFullTime = require('../utils/time')
/* 更新通用方法 */
const updateData = require('./utils/updateData')
/* 获取所有元素的通用方法 */
const getAllData = require('./utils/getAllData')

/**
 * 获取角色列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getRoleList = (req, res) => {
    pagination(req, res, 'role_table', '角色列表')
};

/**
 * 添加角色
 * @param {*} req 
 * @param {*} res 
 */
exports.addRole = (req, res) => {
    /* 获取到用户的id */
    const {
        id
    } = req.auth
    /* 获取到当前的时间 */
    const fullTime = getFullTime()
    /* 获取角色名字 */
    const {
        role_name
    } = req.body;
    /* 创建一个需要插入的元素 */
    const insertState = {
        role_name,
        created_id: id,
        created_time: fullTime
    }
    /* 调用公用的插入元素 */
    insertData(req, res, 'role_table', insertState, '添加新角色成功')
};

/**
 * 修改角色
 * @param {*} req 
 * @param {*} res 
 */
exports.updateRole = (req, res) => {
    updateData(req, res, 'role_table', '修改角色数据成功')
};

/**
 * 获取所有的角色
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllRole = (req, res) => {
    getAllData(req, res, 'role_table', '获取所有角色成功')
};