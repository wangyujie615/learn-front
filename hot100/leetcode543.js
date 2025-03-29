function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/** 543.二叉树的直径
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    //解法1：递归写法
    let MaxDepth = 0
    const dfs = (root) => {
        if (!root) return 0
        const left = dfs(root.left)
        const right = dfs(root.right)
        MaxDepth = Math.max(MaxDepth, left + right)
        return Math.max(left, right) + 1
    }
    return MaxDepth
};

