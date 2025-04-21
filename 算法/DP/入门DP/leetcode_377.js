/**
 * Leetcode_377:组合总和
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum3 = function (nums, target) {
    //暴力搜索
    let count = 0
    const n = nums.length
    const dfs = (sum) => {
        if (sum === target) {
            count++;
        }
        for (let i = 0; i < n; i++) {
            if (sum < target) {
                sum += nums[i]
                dfs(sum)
                sum -= nums[i]
            }
        }
    }
    dfs(0)
    return count
};
var combinationSum4 = function (nums, target) {
    //动态规划
    //dp[i]表示
    //dp[i] 表示数字i被nums[i]元素组成的次数
    const dp = Array(target+1).fill(0)
    dp[0] = 1
    for (let i = 0; i <= target; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i >= nums[j]) {
                dp[i] += dp[i - nums[j]]
            }
        }
    }
    return dp[target]
}

const res = combinationSum4([1,2,3],4)