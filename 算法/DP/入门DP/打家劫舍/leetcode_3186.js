/**
 * leetcode_3186:施咒的最大总伤害
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
    //使用p[i],不能使用p[i]-1 p[i]-2 p[i]+1 p[i]+2
    //p[i]*num+p[i]-3,p[i]-1,p[i]-2
    const map = new Map()
    for (const p of power) {
        map.set(p, (map.get(p) || 0) + 1);
    }
    const keys = Array.from(map.keys()).sort((a, b) => a - b);
    const n = map.size;
    //dp[i]:表示从a[0]到a[i]中选择，可以得到的伤害值之和最大
    //dp[i] = max(dp[i-1],dp[j-1]+a[i]*cnt[a[i]])
    const dp = new Array(n + 1).fill(0);
    let j = 0;
    for (let i = 0; i < n; i++) {
        const x = keys[i]
        //搜索j
        while (keys[j] < x - 2) {
            j++;
        }
        dp[i + 1] = Math.max(dp[i], dp[j] + x * map.get(x));
    }
    return dp[n];
};
//记忆化搜索
var maximumTotalDamage = function (power) {
    const cnt = new Map();
    for (const x of power) {
        cnt.set(x, (cnt.get(x) || 0) + 1);
    }

    const n = cnt.size;
    const a = Array.from(cnt.keys());
    a.sort((x, y) => x - y);
    //记忆之前的结果
    const memo = new Array(n).fill(-1);

    const dfs = (i) => {
        if (i < 0) {
            return 0;
        }
        if (memo[i] !== -1) {
            //表示已经标记了
            return memo[i];
        }
        const x = a[i];
        let j = i;
        while (j > 0 && a[j - 1] >= x - 2) {
            j--;
        }
        return memo[i] = Math.max(dfs(i - 1), dfs(j - 1) + x * cnt.get(x));
    };

    return dfs(n - 1);
}