express、mysql、knex、 multer、jwt、bcryptjs、joi

express => 服务器封装框架
mysql => 数据库
knex => 构建sql查询构建起，不建议直接写mysql查询语句在服务器上面运行
multer => 中间件，用于处理 multipart/form-data 类型的表单数据，主要用于上传文件
bcryptjs => 加密密码
joi => 数据验证
faker => 生成一个随机的名字
node-rsa => 加密密码，但是麻烦，这次项目不作处理，一旦上线生成的密文不能丢失，一旦丢失全部用户的密码都是错误的
jsonwebtoken => 生成JWT字符串
express-jwt => 用户 JWT 字符串还原成 JSON 对象

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

当数据库连接失败的时候，输入这个
ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';
root为你的数据库密码即可