/**
 * leetcode_2320：统计放置房子的方式数
 * @param {number} n
 * @return {number}
 */
var countHousePlacements = function (n) {
    //考虑第i哥地块
    // i放： f[i] = f[i-1]
    // i不放：f[i] = f[i-2]
    const MOD = BigInt(10 ** 9 + 7)
    const dp = Array(n + 1).fill(0n)
    dp[0] = 1n
    dp[1] = 2n
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return parseInt(dp[n] ** 2n % MOD)
}