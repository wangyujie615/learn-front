/**
 * Leetcode_216:组合总和
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum2 = function (k, n) {
    const path = [], res = []
    const dfs = (start, len, sum) => {
        if (sum > n || path.length > k) return
        if (len === k && sum === n) {
            res.push(path.slice())
        }
        for (let i = start; i <= 9; i++) {
            sum += i
            len++
            path.push(i)
            dfs(i + 1, len, sum)
            path.pop()
            sum -= i
            len--
        }
    }
    dfs(1, 0, 0)
    return res
};

console.log(combinationSum3(9, 45))