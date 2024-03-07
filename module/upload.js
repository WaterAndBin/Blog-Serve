/* 文件上传 */
/* 标签 */
const knex = require('../mysql/index')
const fs = require('fs')
const multer = require('multer');

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
    // const file = req.files.file; // 假设前端传过来的字段名是 'file'  
    // const filePath = path.join(__dirname, 'uploads', file.name); // 设置文件保存路径  

    // const stream = fs.createWriteStream(filePath); // 创建写入流  
    // file.stream.pipe(stream); // 将上传的文件流通过管道写入到文件  

    // stream.on('finish', () => {
    //     res.send('File uploaded successfully.');
    // });

    // stream.on('error', (err) => {
    //     res.status(500).send('Error uploading file.');
    // });
    console.log(6)
};
