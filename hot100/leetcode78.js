/**78.子集
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    //去重
    const n = nums.length
    const res = []
    const dfs = (start, temp) => {
        res.push(temp.slice())
        for (let i = start; i < n; i++) {
            temp.push(nums[i])
            dfs(i + 1, temp)
            temp.pop()
        }
    }
    dfs(0,[])
    return res
};