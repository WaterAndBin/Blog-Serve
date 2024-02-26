express、mysql、knex、 multer、jwt、bcryptjs、joi

express => 服务器封装框架
mysql
knex => 构建sql查询构建起，不建议直接写mysql查询语句在服务器上面运行
multer => 中间件，用于处理 multipart/form-data 类型的表单数据，主要用于上传文件
jwt => 生成token
bcryptjs => 
joi => 数据验证
faker => 生成一个随机的名字

host: '127.0.0.1', //数据库的 IP 地址
user: 'root', //登录数据库的账号
password: 'admin123', //登录数据库的密码
database: 'my-first-mysql' //指定要操作哪个数据库

    /* 生成密钥 */
    const key = new NodeRSA({ b: 512 });
    /* 加密 */
    let encrypted = key.encrypt(password, 'base64');
    console.log('加密之后的密码')
    console.log(encrypted)
    /* 解密 */
    let decrypted = key.decrypt(encrypted, 'utf8');
    console.log(decrypted);


2024/2/15
1. 开始搭建后端

2024/2/25
1. 开始完善登录模块