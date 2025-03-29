function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    //思路1：层序遍历
    if (!root) return []
    const res = []
    const que = []
    que.push(root)
    while (que.length > 0) {
        let size = que.length
        for (let i = 0; i < size; i++) {
            const node = que.shift()
            if (i === size - 1) {
                res.push(node.val)
            }
            if (node.left) que.push(node.left)
            if (node.right) que.push(node.right)
        }
    }
    return res
};

var rightSideView = function (root) {
    //思路2:自顶向下搜索 利用深度来标记
    //左 中 右
    const map = new Map()
    const dfs = (root, dep) => {
        if (!root) return
        dep++
        map.set(dep, root.val)
        dfs(root.left, dep)
        dfs(root.right, dep)
    }
    dfs(root, 0)
    return [...map.values()];
};