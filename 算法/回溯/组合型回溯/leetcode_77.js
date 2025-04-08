/** Leetcode_77:组合问题
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    const ans = [];  // 存储所有组合结果
    const path = [];  // 当前组合路径

    const dfs = (i) => {
        const d = k - path.length;  // 还需要选择的数字个数
        if (d === 0) {  // 已经选够k个数
            ans.push([...path]);  // 将当前组合加入结果
            return;
        }

        // 如果当前数字i大于还需要选的数字d，可以选择跳过i
        if (i > d) {
            dfs(i - 1);  // 不选i的情况
        }

        // 选择当前数字i的情况
        path.push(i);  // 选择i
        dfs(i - 1);    // 递归处理前一个数字
        path.pop();    // 回溯，撤销选择
    };

    dfs(n);  // 从最大的数字n开始递归
    return ans;
};
var combine = function (n, k) {
    const path = [], res = []
    const dfs = (start, len) => {
        if (len === k) {
            res.push(path.slice())
        }
        for (let i = start; i <= n; i++) {
            if (len < k) {
                path.push(i)
                len++
                dfs(i + 1, len)
                len--
                path.pop()
            }
        }
    }
    dfs(1, 0)
    return res
}