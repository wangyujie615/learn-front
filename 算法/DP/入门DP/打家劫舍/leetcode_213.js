/**
 * leetcode_213:打家劫舍II
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // 环形的数据处理方案之一 分段法
    //
    // 房间之间形成了一个环  2 3 2 
    // dp[i] = max(dp[i-1],dp[i-2]+cost[i])
    // 考虑偷不偷第一家
    // 偷：最后一家就不能偷
    // 不偷：最后一家可以偷
    const n = nums.length
    const dp1 = Array(n + 1).fill(0)
    const dp2 = Array(n + 1).fill(0)
    if (n === 1) return nums[0]
    let res = 0
    dp1[1] = nums[0] // 偷
    for (let i = 2; i <= n - 1; i++) {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + nums[i - 1])
    }
    res = dp1[n - 1]
    for (let i = 2; i <= n; i++) {
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + nums[i - 1])
    }
    res = Math.max(res, dp2[n])
    return res
};

// 198. 打家劫舍
var rob1 = function(nums) {
    let f0 = 0, f1 = 0;
    for (const x of nums) {
        [f0, f1] = [f1, Math.max(f1, f0 + x)]
    }
    return f1;
};

var rob = function(nums) {
    const n = nums.length;
    return Math.max(nums[0] + rob1(nums.slice(2, n - 1)), rob1(nums.slice(1)))
};
