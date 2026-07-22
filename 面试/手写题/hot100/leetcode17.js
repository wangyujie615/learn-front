/**17.电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if(!digits) return []
    const table = ["", "","abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
    const n = digits.length
    const res = []
    const dfs = (start, temp) => {
        if (temp.length === n) {
            res.push(temp.join(''))
            return
        }
        for (let i = start; i < n; i++) {
            const num = +digits[i]
            for (const char of table[num]) {
                temp.push(char)
                dfs(i + 1, temp)
                temp.pop()
            }
        }
    }
    dfs(0, [])
    return res
};
const digits = "23"
console.log(letterCombinations(digits));