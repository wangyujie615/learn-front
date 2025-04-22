/**
 * leetcode_198:打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    //不能偷窃相邻房间
    // dp[i]:表示第i间被偷房间的最大金额= max(上一间房被偷的最大金额,偷这间房)
    // dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i])
    const n = nums.length
    const dp = Array(n).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(dp[0], nums[1])
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }
    return dp[n - 1]
};

var rob = function (nums) {
    //压缩空间
    const n = nums.length
    if(n===1) return nums[0]
    if(n===2) return Math.max(nums[0], nums[1])
    let pre = nums[0]
    let second = Math.max(pre, nums[1]), res = 0
    for (let i = 2; i < n; i++) {
        res = Math.max(second, pre + nums[i])
        pre = second
        second = res
    }
    return res
};