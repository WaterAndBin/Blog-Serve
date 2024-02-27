// 导入定义规则的包
const joi = require('joi')

const role_name = joi.string().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_insert_role = {
    role_name,
}

const role_id = joi.number().required()
const update_role_name = joi.string()

// 定义验证注册和登录表单数据的规则对象
exports.reg_update_role = {
    role_id: role_id,
    role_name: update_role_name,
}