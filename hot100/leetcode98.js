function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**98.验证二叉搜索树
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    //解法1：中序遍历
    //左小右大 中序遍历
    let tag = -Infinity
    const dfs = (root) => {
        if (!root) return true
        const left = dfs(root.left)
        if (!left) {
            return false
        }
        if (tag >= root.val) return false
        tag = root.val
        return dfs(root.right)
    }
    return dfs(root)
};

var isValidBST = function (root) {
    //解法2：自顶向下递归
    //根据根节点我们可以将二叉树划分为两个区间
    //[-Infinity,Infinity]
    const dfs = (root, left = -Infinity, right = Infinity) => {
        if(!root) return true
        if (root.val > left && root.val < right) {
            const l = dfs(root.left, left, root.val)
            const r = dfs(root.right, root.val, right)
            return l && r
        } else {
            return false
        }
    }
    return dfs(root)
};
