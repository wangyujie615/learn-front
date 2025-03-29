function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
//94.二叉树的中序遍历
var inorderTraversal = function (root) {
    //递归
    const res = []
    const dfs = (root) => {
        if (root == null) return null
        dfs(root.left)
        res.push(root.val)
        dfs(root.right)
    }
    dfs(root)
    return res
};
var inorderTraversal = function (root) {
    //迭代 回退
    const res = []
    if (!root) return res
    const stack = []
    while (stack.length > 0||root) {
        while (root) {
            stack.push(root)
            root = root.left
        }
        const node = stack.pop()
        res.push(node.val)
        root = node.right
    }
    return res
};