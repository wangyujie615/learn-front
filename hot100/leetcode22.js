/**
 * leetcode22:括号生成
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const res = []
    const dfs = (i, path, open) => {
        if (i === 2 * n) {
            //判断有效的情况
            res.push(path.join(""))
            return
        }
        if (open < n) {
            path.push('(')
            dfs(i + 1, path, open + 1);
        }
        if (i - open < n) {
            path.push(')')
            dfs(i + 1, path, open)
        }
    }
    dfs(n, [], 0)
    return res
};