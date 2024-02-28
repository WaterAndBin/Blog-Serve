// 导入定义规则的包
const joi = require('joi')

const tab_name = joi.string().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_insert_tabs = {
    tab_name,
}

const id = joi.number().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_update_tabs = {
    id: id,
}