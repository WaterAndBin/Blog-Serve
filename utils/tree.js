/* 获得树状数据 */
const getTree = (arrs) => {
    /* 利用递归来循环 */
    const result = arrs.filter(item => item.menu_parent == 0)

    function insertChildren(nodes) {
        /* 临时变量，存储被循环到的数据 */
        let timerData = null;
        for (let i = 0; i < nodes.length; i++) {
            /* 给传进来的节点进行children初始化 */
            nodes[i].children = nodes[i].children || []

            for (let j = 0; j < arrs.length; j++) {
                /* 对传进来的数据进行children的推入和判断 */
                if (arrs[j].menu_parent == nodes[i].id) {
                    nodes[i].children.push(arrs[j])
                    timerData = timerData || {}
                    timerData[arrs[j].id] = arrs[j]
                }
            }
        }
        /* 判断临时数据是否存在 */
        if (timerData) {
            let arr = []; //定义数组
            for (var i in timerData) {
                arr.push(timerData[i]);
            }
            /* 递归循环 */
            insertChildren(arr)
        }
    }

    insertChildren(result)

    return result
}
module.exports = getTree
