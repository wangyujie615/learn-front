function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
//104.二叉树的最大深度
var maxDepth = function (root) {
    //解法1:自顶向下结算深度
    let maxDep = 0
    const dfs = (root, depth) => {
        if (!root) return null
        depth++
        maxDep = Math.max(maxDep, depth)
        dfs(root.left, depth)
        dfs(root.right, depth)
    }
    dfs(root, 0)
    return maxDep
};

var maxDepth = function (root) {
    //解法2:自底向上搜索

    const dfs = (root) => {
        if (!root) return 0
        let left = dfs(root.left)
        let right = dfs(root.right)
        return Math.max(left, right) + 1
    }
    return dfs(root)
};

var maxDepth = function (root) {
    //解法3: 层序遍历
    if(!root) return 0 
    const que = []
    let dep = 0
    que.push(root)
    while(que.length>0){
        let size = que.length
        dep++
        while(size-->0){
            const node = que.shift()
            if(node.left) que.push(node.left)
            if(node.right) que.push(node.right)
        }
    }
    return dep
};