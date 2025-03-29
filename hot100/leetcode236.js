
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**236.二叉树的最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    //最近公共祖先
    //1.root.left = p root.right = q
    //2.p.left = q or p.right = q
    //3.q.left = p or q.right = p
    if (!root || root === p || root === q) {
        return root
    }
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if (left && right) {
        return root
    }
    return left ?? right
};