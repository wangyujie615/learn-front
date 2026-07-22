/**46.全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const n = nums.length
    const res = []
    const vis = Array(n).fill(false)
    const dfs = ( temp, visited) => {
        if (temp.length === n) {
            res.push([...temp])
            return
        }
        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                temp.push(nums[i])
                visited[i] = true
                dfs(temp, visited)
                //回溯
                visited[i] = false
                temp.pop()
            }
        }
    }
    dfs([], vis)
    return res
};