/**
 * Leetcode_46:全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const res = [], path = []
    const visited = new Array(nums.length).fill(false)
    const dfs = () => {
        if (path.length === nums.length) {
            res.push(path.slice())
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (!visited[i]) {
                path.push(nums[i])
                visited[i] = true
                dfs(i + 1)
                visited[i] = false
                path.pop()
            }
        }
    }
    dfs()
    return res
};