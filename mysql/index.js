/* 使用knex连接数据库 */
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',// admin123
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