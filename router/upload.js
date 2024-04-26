const express = require('express')
const router = express.Router()
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户路由处理函数对应的模块
const upload = require('../module/upload')

const directory = '/public/images';
/* 创建目录，如果没有就创建目录 */
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {
        recursive: true
    });
}

// 获取标签列表
router.post('/picUpload', upload.picUpload)

module.exports = router