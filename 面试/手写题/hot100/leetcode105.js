
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**105.从前序与中序遍历构造二叉树
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    const n = preorder.length
    const index = new Map()
    for (let i = 0; i < n; i++) {
        index.set(inorder[i], i)
    }
    const dfs = (preL, preR, inL, inR) => {
        if (preL === preR) {
            //空节点
            return null
        }
        //此时左边节点的大小
        const leftSize = index.get(preorder[preL]) - inL;
        //这里preL+1 是因为第一个节点要用来创建
        const left = dfs(preL + 1, preL + 1 + leftSize, inL, inL + leftSize)
        const right = dfs(preL + leftSize + 1, preR, inL + 1 + leftSize, inR)
        return new TreeNode(preorder[preL], left, right)
    }
    return dfs(0, n, 0, n)
};