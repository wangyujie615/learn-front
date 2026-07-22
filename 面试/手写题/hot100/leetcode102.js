
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    const res = []
    if (!root) return res
    const que = []
    que.push(root)
    while (que.length > 0) {
        let size = que.length
        const t = []
        while (size-- > 0) {
            const node = que.shift()
            t.push(node.val)
            if (node.left) que.push(node.left)
            if (node.right) que.push(node.right)
        }
        res.push(t)
    }
    return res
};