/**
 * Leetcode_70:爬楼梯
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    //优化方案 dp[i] = dp[i-1]+dp[i-2]
    let first = 1,second = 2,third = 0
    if(n===1) return first
    if(n===2) return second
    for (let i = 3; i <= n; i++) {
        third = first+second
        first = second
        second = third
    }
    return third
};