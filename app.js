/* 导入express */
const express = require('express')
const {
    expressjwt
} = require('express-jwt');
const jwt = require('jsonwebtoken')
const {
    jwtSecretKey
} = require('./config')
const joi = require('joi')
const path = require('path')
const winston = require('winston');
const {
    format,
    transports
} = require("winston");

/* 创建服务器的实例对象 */
const app = express()

// 创建 winston logger 实例  
const logger = winston.createLogger({
    transports: [
        new transports.File({
            filename: "logs/server.log",
            level: "info",
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                format.align(),
                format.printf(
                    (info) =>
                    `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
    ],
});

// 导入并配置 cros 中间件
const cors = require('cors')
app.use(cors())

/* 跨域处理 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', ['mytoken', 'Content-Type']);
    next();
});

// 配置解析表单数据的中间件，注意这个中间件只能解析 x-www-form-urlencoded 的数据
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
/* 静态文件，访问图片 */
app.use('/public', express.static(__dirname + '/public'));

// 一定要在路由之前，封装全局错误信息
app.use((req, res, next) => {
    // status 默认值为1 表示失败的情况
    // err的值，可能是一个错误对象，也可以是一个错误的描述字符串
    res.error = (err, code = -1) => {
        logger.error(`错误：错误信息${err.toString()}，错误地址：${req.originalUrl}`);
        if (code == 500) {
            res.status(code).send({
                code: code,
                message: err instanceof Error ? err.message : err
            });
        } else {
            res.send({
                code: code,
                message: err instanceof Error ? err.message : err
            });
        }
    }
    next()
})

// app.use() 里面放的 expressJWT().unless()
// 注册 token 验证中间件
app.use(expressjwt({
    // 解析口令, 需要和加密的时候一致
    secret: jwtSecretKey,
    // 加密方式: SHA256 加密方式在 express-jwt 里面叫做 HS256
    algorithms: ['HS256']
}).unless({
    // 不需要验证 token 的路径标识符
    path: ['/user/login', '/user/register', '/article/getAllArticleList', '/article/getArticleDetail']
}))

// 检查用户请求的地址和方法
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    logger.info({
        message: `收到请求： 请求人id：${req?.auth?.id ?? '游客'}，请求方式：${req.method}，请求地址：${req.originalUrl}`,
    });
    next()
})

/* 挂载路由 */
require("./router.js")(app);

/* 使用 express-list-endpoints 库 */
// const listEndpoints = require('express-list-endpoints');
/* 在所有路由都被定义之后调用它，可以获取到所有路由的接口 */
// const endpoints = listEndpoints(app);
// 现在，endpoints 变量包含所有路由的列表
// console.log(endpoints);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) res.error(err, 401)
    // 身份过期
    if (err.name === 'UnauthorizedError') return res.error('登录过期', -1)
    // 未知的错误
    console.log(err)
    res.error('未知错误', 500)
})

// 启动服务器
app.listen(9090, () => {
    console.log('http://127.0.0.1:9090')
})