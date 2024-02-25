/* 检查是否有重复的键值对 */
const checkReset = () => {
    knex('your_table_name') // 请替换为你的表名  
        .select(knex.raw('COUNT(DISTINCT account) as unique_count, COUNT(*) as total_count'))
        .then(([row]) => {
            // 如果 unique_count 不等于 total_count，说明有重复的 account  
            if (row.unique_count !== row.total_count) {
                console.log('存在重复的 account');
            } else {
                console.log('没有重复的 account');
            }
        })
        .catch(err => {
            console.error('查询出错:', err);
        });
}