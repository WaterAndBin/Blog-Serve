// 导入定义规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const account = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义id,email , nickname 的验证规则
const id = joi.number().integer().min(1).required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    account,
    password
}

// 验证规则对象 - 更新用户基本信息
exports.res_user_update = {
    id: id
}