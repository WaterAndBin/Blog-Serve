// 获取到当前事件
const getFullTime = () => {
    const now = new Date();
    const year = now.getFullYear();      // 获取年份
    const month = now.getMonth() + 1;    // 获取月份（注意：月份从0开始）
    const day = now.getDate();           // 获取日期
    const hour = now.getHours();         // 获取小时
    const minute = now.getMinutes();     // 获取分钟

    // 格式化时间
    const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
    return formattedDate
}
module.exports = getFullTime