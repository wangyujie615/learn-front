function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
/**
 * 437.路径总和III 前缀和+哈希
 * @param {*} root 
 * @param {*} targetSum 
 * @returns 
 */
var pathSum = function (root, targetSum) {
    //前缀和+哈希
    //a - b =target 
    let count = 0
    const map = new Map()
    map.set(0,1)
    const dfs = (root, preSum) => {
        if (!root) return
        const sum = preSum + root.val
        if (map.has(sum - targetSum)) {
            count += map.get(sum - targetSum)
        }
        map.set(sum, (map.get(sum) ?? 0) + 1)
        dfs(root.left, sum)
        dfs(root.right, sum)
        //恢复现场 由于是树
        map.set(sum,map.get(sum)-1)
    }
    dfs(root, 0)
    return count

};