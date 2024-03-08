/* 文件上传 */
/* 标签 */
const knex = require('../mysql/index')
const fs = require('fs')
const multer = require('multer');
const path = require('path').posix;

// 设置 multer 存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

/**
 * 修改标签
 * @param {*} req 
 * @param {*} res 
 */
exports.picUpload = (req, res) => {
    const filePath = req.file.path; // 获取文件路径
    const unixPath = path.normalize(filePath).replace(/\\/g, '/');

    // 存储到数据库或返回给客户端
    res.send({
        code: 200,
        data: unixPath,
        message: '上传图片成功'
    });
};