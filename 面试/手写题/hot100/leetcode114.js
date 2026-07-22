
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    //自底向上递归
    const dfs = (root) => {
        if (!root) return null
        //找到尾节点
        const left = dfs(root.left)
        const right = dfs(root.right)
        if (left) {
            left.right = root.right
            root.right = root.left
            root.left = null
        }
        return right ?? left ?? root
    }
    dfs(root)

};