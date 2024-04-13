const express = require('express')
const router = express.Router()

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2.导入需要验证规则对象
const {
    reg_login_schema,
    res_user_update
} = require('../schema/user')

// 导入用户路由处理函数对应的模块
const user = require('../module/user')

/* 登录 */
router.post('/login', expressJoi(reg_login_schema), user.login)
/* 注册 */
router.post('/register', expressJoi(reg_login_schema), user.register)
/* 获取用户列表 */
router.post('/getUserList', expressJoi(reg_login_schema), user.getUserList)
/* 获取用户列表 */
router.post('/updateUser', expressJoi(res_user_update), user.updateUser)
/* 获取个人信息 */
router.post('/getMyInfo', user.getMyInfo)

module.exports = router