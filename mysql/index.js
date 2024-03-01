/* os 模块来获取当前系统的相关信息 */
const os = require('os');
// 获取当前登录用户信息
const userInfo = os.userInfo();
// console.log(`当前登录用户名: ${userInfo.username}`);

/* 使用knex连接数据库 */
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: userInfo.username == 'weibin.ye' ? 'root' : 'admin123', // admin123
        database: 'blog'
    }
});

/* 连接数据库失败的语句 */
knex.on('error', (error) => {
    console.error('连接数据库失败:', error)
})

/* 判断是否连接数据库成功 */
knex.raw('SELECT 1')
    .then(() => console.log('连接数据库成功'))
    .catch((error) => console.error('连接数据库失败:', error))

module.exports = knex