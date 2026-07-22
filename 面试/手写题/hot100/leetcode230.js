function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**230.二叉搜索树中第K小的元素
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    //二叉搜索树中序遍历有序
    const dfs = (root) => {
        if (!root) return -1
        const leftRes = dfs(root.left)
        if (leftRes !== -1) {
            return leftRes
        }
        if (k === 1) {
            return root.val
        } else {
            k--
        }
        return dfs(root.right)
    }
    return dfs(root)
};