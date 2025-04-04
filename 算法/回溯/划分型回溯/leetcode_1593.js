/** Leetcode_1593:拆分字符串使唯一子字符串的数目最大
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
    //拆分后子字符串唯一 数组长度最大
    let maxLength = 0, n = s.length
    const dfs = (start, path) => {
        if (start === n) {
            maxLength = Math.max(maxLength, path.length)
            return
        }
        for (let i = start; i < n; i++) {
            const t = s.substring(start, i + 1)
            if (!path.includes(t)) {
                path.push(t)
                dfs(i + 1, path)
                path.pop(t)
            }
        }
    }
    dfs(0, [])
    return maxLength
};

var maxUniqueSplit2 = function (s) {
    //拆分后子字符串唯一 数组长度最大
    let maxLength = 0, n = s.length
    const path = []
    const dfs = (i, start) => {
        if (i === n) {
            maxLength = Math.max(maxLength, path.length)
            return
        }
        if (i < n - 1) {
            dfs(i + 1, start)
        }
        const t = s.substring(start, i + 1)
        if (!path.includes(t)) {
            path.push(t)
            dfs(i + 1, i + 1)
            path.pop()
        }
    }
    dfs(0, 0)
    return maxLength
};