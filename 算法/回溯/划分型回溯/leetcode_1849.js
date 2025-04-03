/**
 * @param {string} s
 * @return {boolean}
 */
var splitString = function (s) {
    const n = s.length
    const path = []
    let res = false
    const dfs = (start, pre) => {
        if (start === n) {
            if (path[0] - path[path.length - 1] + 1 === path.length&&path.length>1) {
                res = true
            }
            return
        }
        for (let i = start; i < n; i++) {
            const num = parseInt(s.substring(start, i + 1))
            if (pre !== 0 && num !== pre - 1) continue
            path.push(num)
            dfs(i + 1, num)
            path.pop()
        }
    }
    dfs(0, 0)
    return res
};
console.log(splitString("1234"))