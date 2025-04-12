/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function TreeNode(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
}
var buildTree = function (preorder, inorder) {
    const dfs = (preL, preE, inL, inE) => {
        if (preL >= preE || inL >= inE) return null
        const value = preorder[preL]
        const index = inorder.indexOf(value)
        const root = new TreeNode(value)
        const num = inE - index - 1 // 右子树元素的个数
        root.left = dfs(preL + 1, preE - num, inL, index)
        root.right = dfs(preE - num, preE, index + 1, inE)
        return root
    }
    return dfs(0, preorder.length, 0, inorder.length)
};
const root = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
