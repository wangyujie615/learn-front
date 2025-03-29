function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**108.将有序数组转换为二叉搜索树
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    // 二叉搜索树 左大右小
    // 平衡二叉树 左右子树的高度差不超过1
    // 数组有序：
    const dfs = (nums, start, end) => {
        if (end <= start) return null
        if (end - start === 1) return new TreeNode(nums[start])
        let mid = start + Math.floor((end - start) / 2)
        const root = new TreeNode(nums[mid])
        root.left = dfs(nums, start, mid)
        root.right = dfs(nums, mid + 1, end)
        return root
    }
    return dfs(nums, 0, nums.length)
};