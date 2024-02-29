/* 获得树状数据 */
const getTree = (data) => {
    /* 利用堆栈 */
    let bucket = []
    /* 得到的结果 */
    let result = []

    /* 利用for循环，先来看看谁的父节点为0 */
    for (let i = 0; i < data.length; i++) {
        if (data[i].menu_parent == 0) {
            result.push({
                ...data[i],
                children: []
            })
        } else {
            bucket.push({
                ...data[i],
                children: []
            })
        }
    }

    /* 来判断孩子节点 */
    for (let i = 0; i < bucket.length; i++) {
        for (let j = 0; j < result.length; j++) {
            if (bucket[i].menu_parent == result[j].id) {
                result[j].children.push(bucket[i])
            }
        }
    }

    // console.log(result)
    return result
}
module.exports = getTree