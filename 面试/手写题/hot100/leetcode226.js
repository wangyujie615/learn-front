function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
//226.翻转二叉树
var invertTree = function (root) {
    //自底向上的写法
    const dfs = function (root) {
        if (!root) return null
        const left = dfs(root.left)
        const right = dfs(root.right)
        root.right = left
        root.left = right
        return root
    }
    return dfs(root)
};
var invertTree = function (root) {
    if (root === null) {
        return null;
    }
    [root.left, root.right] = [root.right, root.left]; // 交换左右儿子
    invertTree(root.left); // 翻转左子树
    invertTree(root.right); // 翻转右子树
    return root;
};