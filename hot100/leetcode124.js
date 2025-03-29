function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**124.二叉树中的最大路径和
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
    let maxPath = -Infinity
    const dfs = (root) => {
        if (!root) return 0
        const left = dfs(root.left)
        const right = dfs(root.right)
        maxPath = Math.max(maxPath, left + right + root.val)
        return Math.max(Math.max(left, right) + root.val, 0)
    }
    dfs(root)
    return maxPath
};