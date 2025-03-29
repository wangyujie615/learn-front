/**
 * Leetcode_784: 字母大小写全排列
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
    //从输入的角度看
    const n = s.length;
    const cur = s.split('');
    const res = [];
    const path = [];
    const dfs = (i) => {
        if (i === n) {
            res.push(cur.join(''))
            return
        }
        dfs(i + 1)
        if (/[a-zA-Z]/.test(s[i])) {
            //当前元素是字母
            cur[i] = String.fromCharCode(cur[i].charCodeAt(0) ^ 32)
            dfs(i + 1)
            cur[i] = String.fromCharCode(cur[i].charCodeAt(0) ^ 32)
        }
    }
    dfs(0)
    return res
};

var letterCasePermutation = function (s) {
    //从答案的角度看
    const cur = s.split(''), n = s.length;
    const res = [];
    const dfs = (start) => {
        res.push(cur.join(''))
        for (let i = start; i < n; i++) {
            if (/[a-zA-Z]/.test(cur[i])) {
                cur[i] = String.fromCharCode(cur[i].charCodeAt(0) ^ 32)
                dfs(i + 1)
                cur[i] = String.fromCharCode(cur[i].charCodeAt(0) ^ 32)
            }
        }
    }
    dfs(0)
    return res
};