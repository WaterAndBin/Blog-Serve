const express = require('express')
const router = express.Router()
const multer = require('multer');

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入用户路由处理函数对应的模块
const upload = require('../module/upload')

// 配置存储选项
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // 指定文件存储目录
    },
    filename: function (req, file, cb) {
        // 生成文件名
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

// 创建 multer 实例并指定存储配置
const uploadData = multer({ storage: storage });

// 获取标签列表
router.post('/picUpload', uploadData.single('file'), upload.picUpload)

module.exports = router