/* 文件上传 */
/* 标签 */
const knex = require('../mysql/index')
const fs = require('fs')
const multer = require('multer');
const path = require('path').posix;
const sharp = require('sharp');

// 配置存储选项
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp') // 指定文件存储目录
    },
    filename: function (req, file, cb) {
        // 生成文件名
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

// 创建 multer 实例并指定存储配置
// const uploadData = multer({
//     storage: storage
// });

// 创建 multer 实例并指定存储配置  
const upload = multer({
    storage: storage
}).single('file');

/**
 * 修改标签
 * @param {*} req 
 * @param {*} res 
 */
exports.picUpload = (req, res) => {

    // const unixPath = path.normalize(filePath).replace(/\\/g, '/');

    upload(req, res, (err) => {
        if (err) {
            return res.error('压缩错误', 500)
        }

        const tempFilePath = req.file.path; // 临时文件路径  
        const targetDir = './public/images'; // 目标文件存储目录  
        const targetFileName = req.file.fieldname + '-' + Date.now() + req.file.originalname; // 压缩后的文件名  
        const targetFilePath = path.join(targetDir, targetFileName); // 压缩后的文件完整路径  

        // 使用 Sharp 压缩图片  
        sharp(tempFilePath)
            .jpeg({
                quality: 70
            }) // 设定压缩质量  
            .toFile(targetFilePath, (err, info) => {
                if (err) {
                    // 删除临时文件  
                    fs.unlink(tempFilePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error('Failed to delete temp file:', unlinkErr);
                        }
                    });
                    return res.status(500).json({
                        error: 'Compression failed: ' + err.message
                    });
                }

                // 删除临时文件  
                // fs.unlink(tempFilePath, (unlinkErr) => {
                //     if (unlinkErr) {
                //         console.error('Failed to delete temp file:', unlinkErr);
                //     }
                // });

                const unixPath = path.normalize(targetFilePath).replace(/\\/g, '/');
                // 返回成功信息  
                res.send({
                    code: 200,
                    message: '上传图片成功',
                    data: unixPath,
                    info
                });
            });
    })
};