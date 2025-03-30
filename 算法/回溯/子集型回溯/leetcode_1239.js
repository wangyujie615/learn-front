/**
 * Leetcode_1239: 串联字符串的最大长度
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
    const n = arr.length
    let res = 0
    const dfs = (i, pre) => {
        if (i === n) {
            res = Math.max(res, pre.length)
            return
        }
        dfs(i + 1, pre)
        //校验是否有相同的字母
        const cur = pre.split('')
        //排除自身重复的情况
        const set = new Set(arr[i].split(''))
        if (!cur.some(item => arr[i].includes(item)) && set.size === arr[i].length) {
            pre += arr[i]
            dfs(i + 1, pre)
            pre = pre.slice(0, pre.length - arr.length)
        }
    }
    dfs(0, "")
    return res
};

var maxLength = function (arr) {
    const n = arr.length
    let res = 0
    const dfs = (start, pre) => {
        res = Math.max(res, pre.length)
        for (let i = start; i < n; i++) {
            const cur = arr[i].split('')
            const set = new Set(cur)
            if (set.size === cur.length && !cur.some(item => pre.includes(item))) {
                pre += arr[i]
                dfs(i + 1, pre)
                pre = pre.slice(0, pre.length - arr[i].length)
            }
        }
    }
    dfs(0, "")
    return res
};
