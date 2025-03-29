
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
//101.对称二叉树 递归
var isSymmetric = function (root) {
    const dfs = (left, right) => {
        if (!left || !right) return left === right
        return left.val === right.val && dfs(left.right, right.left) && dfs(left.left, right.right)
    }
    if (!root) return true
    return dfs(root.left, root.right)
};
var isSymmetric = function (root) {
    if (!root) return true
    const que = []
    que.push(root.left)
    que.push(root.right)
    while (que.length > 0) {
        let first = que.shift()
        let second = que.shift()
        if (!first && !second) {
            continue
        }
        if (!first || !second || first.val !== second.val) {
            return false
        }
        que.push(first.left)
        que.push(second.right)
        que.push(first.right)
        que.push(second.left)
    }
    return true
};