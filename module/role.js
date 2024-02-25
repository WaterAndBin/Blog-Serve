const knex = require('../mysql/index')
const pagination = require('./utils/pagination')

exports.getRoleList = (req, res) => {
    pagination(req, res, 'role_table', '角色列表')
};