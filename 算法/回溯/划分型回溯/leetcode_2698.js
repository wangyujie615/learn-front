/**
 * Leetcode_2698：求一个整数的惩罚数
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function (n) {
    let sum = 0
    const dfs = (start, m, preSum, target) => {
        if (start === m.length) {
            return preSum === target
        }
        let x = 0
        for (let i = start; i < m.length; i++) {
            //表示进行划分
            x = x * 10 + parseInt(m[i])
            if (dfs(i + 1, m, preSum + x, target)) return true
        }
        return false
    }
    for (let i = 1; i <= n; i++) {
        const m = (i * i).toString()
        //判断当前的数字是否符合要求
        sum += dfs(0, m, 0, i) ? i * i : 0;
    }
    return sum
}
