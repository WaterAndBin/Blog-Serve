/* 数据库工具 */
const knex = require('../mysql/index')
/* 获取到当前事件 */
const getFullTime = require('../utils/time')
/* 随机生成名字工具 */
const faker = require('faker');
/* 加密 */
const bcrypt = require('bcryptjs')
/* 生成token */
const jwt = require('jsonwebtoken')
/* 拿到密钥 */
const {
    jwtSecretKey
} = require('../config')
/* 导出需要插入插入的通用方法 */
const insertData = require('./utils/insertData')
/* 分页方法 */
const pagination = require('./utils/pagination')
/* 更新通用方法 */
const updateData = require('./utils/updateData')

// 登录的处理函数
exports.login = (req, res) => {
    // 接收表单的数据
    const {
        account,
        password
    } = req.body

    knex('user_table')
        .where('account', account).first()
        .then(result => {
            /* 判断密码是否相同 */
            if (bcrypt.compareSync(String(password), result.password)) {
                if (result.status == 1) {
                    res.send({
                        code: 202,
                        message: '该用户已被禁用'
                    })
                } else {
                    /* 删掉密码 */
                    delete result.password
                    /* 生成一个 token 返回给前端 */
                    const token = jwt.sign({
                        ...result
                    }, jwtSecretKey, {
                        expiresIn: '1h'
                    })

                    res.send({
                        code: 200,
                        message: '登录成功',
                        token
                    });
                }
            } else {
                res.error('密码错误', 201)
            }
        })
        .catch(error => {
            // console.log(error)
            // res.error(`${req.path} 数据库出错`, 500)
            res.send({
                code: 202,
                message: '该用户不存在'
            })
        });
}

// 注册的处理函数
exports.register = (req, res) => {
    // 接收表单的数据
    // console.log(req.body)
    const {
        account,
        password
    } = req.body

    /* 检查是否有重复的账号 */
    knex('user_table') // 请替换为你的表名  
        .select('account')
        .where('account', account)
        .then(rows => {
            // 如果 rows 有内容，说明有重复的 account  
            if (rows.length > 0) {
                res.error('已存在相同的账号', 201)
            } else {
                /* 设置需要插入的元素 */
                const insertState = {
                    user_name: faker.name.findName(), // 用户姓名
                    account: account, // 账号
                    password: bcrypt.hashSync(String(password), 10), // 加密密码
                    role_id: 23, // 角色id
                    created_time: getFullTime() // 创建时间
                }
                insertData(req, res, 'user_table', insertState, '注册成功')
            }
        })
        .catch(err => {
            console.log(err)
            res.error(`${req.path} 数据库出错`, 500)
        });
}

/**
 * 获取用户列表
 * @param {*} req 
 * @param {*} res 
 */
exports.getUserList = (req, res) => {
    /* 搜索条件 */
    let condition = ['id', 'user_name', 'role_id', 'account', 'created_time', 'is_deleted', 'status']
    pagination(req, res, 'user_table', '用户列表', condition)
};

/**
 * 修改用户
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUser = (req, res) => {
    knex(`blog.user_table`) // 'roles' 是你想要更新的表
        .where({
            id: req.body.id
        }) // 使用where子句指定需要更新的记录，这里假设按照id来更新
        .update({
            ...req.body
        }) // newRoleData 包含了你想要更新的字段和它们的新值
        .then((result) => {
            res.send({
                code: 200,
                massage: '更新用户数据成功'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                code: 500,
                message: '服务器错误',
            });
        });
};

/**
 * 获取个人信息
 * @param {*} req 
 * @param {*} res 
 */
exports.getMyInfo = (req, res) => {
    knex('user_table')
        .where('id', req.auth.id).first()
        .then(result => {
            res.send({
                code: 200,
                data: result,
                message: '获取个人信息成功',
            });
        })
        .catch(error => {
            console.log(err)
            res.error(`${req.path} 数据库出错`, 500)
        });
}

/**
 * 添加用户
 * @param {*} req 
 * @param {*} res 
 */
exports.addNewUser = (req, res) => {
    const {
        account,
        password,
        role_id,
        user_name
    } = req.body

    /* 检查是否有重复的账号 */
    knex('user_table') // 请替换为你的表名  
        .select('account')
        .where('account', account)
        .then(rows => {
            // 如果 rows 有内容，说明有重复的 account  
            if (rows.length > 0) {
                res.error('已存在相同的账号', 201)
            } else {
                /* 设置需要插入的元素 */
                const insertState = {
                    user_name: user_name, // 用户姓名
                    account: account, // 账号
                    password: bcrypt.hashSync(String(password), 10), // 加密密码
                    role_id: role_id, // 角色id
                    created_time: getFullTime() // 创建时间
                }
                insertData(req, res, 'user_table', insertState, '添加成功')
            }
        })
        .catch(err => {
            console.log(err)
            res.error(`${req.path} 数据库出错`, 500)
        });
}