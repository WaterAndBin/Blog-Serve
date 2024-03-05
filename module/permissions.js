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
/* 获取到树状 */
const getTree = require('../utils/tree')

/**
 * 设置权限
 * @param {*} req 
 * @param {*} res 
 */
exports.setMenuPermissions = (req, res) => {
    knex(`blog.menu_table`)
        .select()
        .where('is_deleted', 0) // 添加筛选条件：is_deleted=0
        .then((data) => {
            let treeData = getTree(data)
            // console.log(treeData)

            res.send({
                code: 200,
                data: treeData,
                message: '获取所有菜单成功',
            });
        });
};

/**
 * 设置权限
 * @param {*} req 
 * @param {*} res 
 */
exports.createMenuPermissions = (req, res) => {
    /* 找到角色的最后一条数据 */
    knex('role_table')
        .orderBy('id', 'desc')
        .first()
        .then((lastEntry) => {
            /* 获取到用户的id */
            const {
                id
            } = req.auth
            /* 获取到当前的时间 */
            const fullTime = getFullTime()
            /* 创建一个需要插入的元素 */
            const insertState = {
                role_id: lastEntry.id,
                created_id: id,
                created_time: fullTime
            }
            /* 调用公用的插入元素 */
            /* 插入数据 */
            knex(`blog.menu_permissions`)
                .insert({
                    ...insertState
                })
                .then(() => {
                    console.log('添加成功')
                })
                .catch(err => {
                    console.log(err)
                });
        })
        .catch((error) => {
            console.error('查询过程中出错:', error);
        });
};

/**
 * 获取菜单权限列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getMenuPermissionsList = (req, res) => {
    const { page, pageSize } = req.body;
    const startIndex = (page - 1) * pageSize;

    // 查询总记录数
    knex('blog.menu_permissions')
        .join('role_table', 'menu_permissions.role_id', 'role_table.id')
        .where('role_table.is_deleted', 0)
        .count('* as total')
        .then((totalRows) => {
            const total = totalRows[0].total;

            // 查询数据列表
            knex('blog.menu_permissions')
                .join('role_table', 'menu_permissions.role_id', 'role_table.id')
                .where('role_table.is_deleted', 0)
                .select('menu_permissions.*', 'role_table.role_name')
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
                        message: '获取列表成功',
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).send({
                        code: 500,
                        message: '服务器错误',
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