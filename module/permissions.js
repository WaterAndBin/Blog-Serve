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
