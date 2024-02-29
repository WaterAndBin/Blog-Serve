/* 菜单 */
/* Permissions权限 */
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
 * 获取所有的菜单元素
 * @param {*} req 
 * @param {*} res 
 */
exports.getMenu = (req, res) => {
    knex(`blog.menu_table`)
        .select()
        .where('is_deleted', 0) // 添加筛选条件：is_deleted=0
        .where('status', 0) // 添加筛选条件：is_deleted=0
        .then((data) => {
            res.send({
                code: 200,
                data,
                message: '获取所有菜单成功',
            });
        });
};

/**
 * 获取所有的菜单元素
 * @param {*} req 
 * @param {*} res 
 */
exports.getMenu = (req, res) => {
    knex(`blog.menu_table`)
        .select()
        .where('is_deleted', 0) // 添加筛选条件：is_deleted=0
        .where('status', 0) // 添加筛选条件：is_deleted=0
        .then((data) => {
            res.send({
                code: 200,
                data,
                message: '获取所有菜单成功',
            });
        });
};

/**
 * 添加菜单
 * @param {*} req 
 * @param {*} res 
 */
exports.addMenu = (req, res) => {
    /* 获取到用户的id */
    const {
        id
    } = req.auth
    /* 获取到当前的时间 */
    const fullTime = getFullTime()
    /* 获取角色名字 */
    const {
        menu_name,
        menu_path,
        menu_parent
    } = req.body;
    /* 创建一个需要插入的元素 */
    const insertState = {
        menu_name,
        menu_path,
        menu_parent: menu_parent ?? 0,
        created_id: id,
        created_time: fullTime
    }
    /* 调用公用的插入元素 */
    insertData(req, res, 'menu_table', insertState, '添加菜单成功')
};