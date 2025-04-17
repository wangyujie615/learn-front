/**
 * leetcode_3376:破解锁的最少时间
 * @param {number[]} strength
 * @param {number} k
 * @return {number}
 */
var findMinimumTime = function (strength, k) {
    const n = strength.length
    const open = Array(n).fill(false)
    let ans = Infinity
    const dfs = (i, time) => {
        if (time >= ans) {
            return; // 剪枝
        }
        if (i === n) {
            //表示三把锁都开完
            ans = time;
            return;
        }
        const x = 1 + k * i;
        for (let j = 0; j < n; j++) {
            if (!open[j]) {
                open[j] = true
                dfs(i + 1, time + Math.ceil(strength[j] / x))
                open[j] = false
            }
        }
    }
    dfs(0, 0)
    return ans
}