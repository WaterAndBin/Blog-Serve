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
 * 获取所有的菜单元素
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllMenu = (req, res) => {
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
 * 获取菜单
 * @param {*} req 
 * @param {*} res 
 */
exports.getMenu = (req, res) => {
    /* 获取到用户的角色id */
    const {
        role_id
    } = req.auth
    console.log(role_id)

    knex('blog.menu_permissions')
        .select('lists') // 只获取lists字段，避免查询额外的字段
        .where('role_id', role_id) // 进一步过滤出对应的role_id
        .then((result) => {
            if (result.length === 0) {
                res.status(404).send({
                    code: 404,
                    message: '没有找到对应的权限',
                });
                return;
            }

            const lists = result[0].lists; // 获取lists数组

            knex('blog.menu_table')
                .select()
                .whereIn('id', JSON.parse(lists)) // 在menu_table中查找lists数组中包含的id
                .andWhere('status', 0) // 添加状态过滤条件
                .andWhere('is_deleted', 0) // 添加删除标记过滤条件
                .then((data) => {
                    const treeData = getTree(data);

                    res.send({
                        code: 200,
                        data: treeData,
                        message: '获取所有菜单成功',
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send({
                        code: 500,
                        message: '获取菜单失败',
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
                code: 500,
                message: '获取菜单权限失败',
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
        menu_parent: menu_parent ? menu_parent : 0,
        created_id: id,
        created_time: fullTime
    }
    /* 调用公用的插入元素 */
    insertData(req, res, 'menu_table', insertState, '添加菜单成功')
};

/**
 * 修改菜单
 * @param {*} req 
 * @param {*} res 
 */
exports.updateMenu = (req, res) => {
    updateData(req, res, 'menu_table', '修改菜单成功')
};

/**
 * 批量查询路由
 * @param {*} req 
 * @param {*} res 
 */
exports.searchMenu = (req, res) => {
    knex('menu_table')
        .whereIn('id', ids) // 通过一组 id 进行批量查询
        .andWhere('status', 0) // 判断状态为 0
        .andWhere('is_deleted', 0) // 判断未被删除
        .then(data => {
            let treeData = getTree(data)
            res.send({
                code: 200,
                data: treeData,
                message: '获取所有菜单成功',
            });
        })
        .catch(error => {
            console.error(error);
        });
};