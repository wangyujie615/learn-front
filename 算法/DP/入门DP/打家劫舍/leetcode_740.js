/**
 * leetcode_740:删除并获得点数
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
    //分析：a-1 a a+1
    // 删除a 会将a附近的都删除掉
    // dp[i]：表示到第i个元素的最大点数 = Max(dp[i-2]+i,dp[i-1])
    // 先排序 
    nums.sort((a, b) => a - b)
    const n = nums.length
    const end = nums[n - 1]
    const cnt = Array(end + 1).fill(0)
    for (const num of nums) {
        cnt[num]++
    }
    const dp = Array(end + 1).fill(0)
    dp[1] = cnt[1] * 1
    for (let i = 2; i <= end; i++) {
        dp[i] = Math.max(dp[i - 2] + i * cnt[i], dp[i - 1])
    }
    return dp[end]
};

var deleteAndEarn = function (nums) {
    // 先排序  优化
    nums.sort((a, b) => a - b)
    const n = nums.length
    const end = nums[n - 1]
    const cnt = Array(end + 1).fill(0)
    for (const num of nums) {
        cnt[num]++
    }
    let pre = 0, res = 0
    let second = cnt[1]
    for (let i = 2; i <= end; i++) {
        res = Math.max(pre + i * cnt[i], second)
        pre = second
        second = res
    }
    return res === 0 ? second : res;
};