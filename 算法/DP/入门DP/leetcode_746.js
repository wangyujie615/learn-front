/**Leetcode_746:使用最小花费爬楼梯
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
    //cost[i]:表示第i个台阶向上爬需要支付的费用
    //爬到顶部的最低花费
    //dp[i]:表示爬到第i个台阶的最低花费
    const n = cost.length;
    const dp = Array(n + 1).fill(0);
    dp[0] = 0
    dp[1] = 0
    for (let i = 2; i <= n; i++) {
        dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    }
    return dp[n]
};

var minCostClimbingStairs = function (cost) {
    //内存压缩
    const n = cost.length
    let first = 0, second = 0, res = 0
    for (let i = 2; i <= n; i++) {
        res = Math.min(second + cost[i - 1], first + cost[i - 2])
        first = second
        second = res
    }
    return res
};