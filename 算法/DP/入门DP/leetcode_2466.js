/**
 * Leetcode_2466: 统计构造好字符串的方案数
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
    //dp[i]:表示i个字符的数目
    //dp[i] = dp[i-zero]+dp[i-one] 记忆化搜索
    const MOD = 1_000_000_007;
    const memo = Array(high + 1).fill(-1); // -1 表示没有计算过
    function dfs(i) {
        if (i < 0) {
            return 0;
        }
        if (i === 0) {
            return 1;
        }
        if (memo[i] !== -1) { // 之前计算过
            return memo[i];
        }
        return memo[i] = (dfs(i - zero) + dfs(i - one)) % MOD;
    }
    let ans = 0;
    for (let i = low; i <= high; i++) {
        ans = (ans + dfs(i)) % MOD;
    }
    return ans;
};
console.log(countGoodStrings(2, 3, 1, 2))