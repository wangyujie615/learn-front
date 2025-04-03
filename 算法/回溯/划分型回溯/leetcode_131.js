/**
 * Leetcode_131:分割回文串
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const n = s.length
    const res = [], path = []
    const isHuiWen = (s, start, end) => {
        while (start < end) {
            if (s[start] !== s[end]) return false
            start++;
            end--;
        }
        return true
    }
    /**
     * 由于子串要清楚开始的位置和结束的位置 类似与双指针的思路
     * @param {*} i 
     * @param {*} start 下一个子串开始的位置 
     * @returns 
     */
    const dfs = (i, start) => {
        if (i === n) {
            res.push(path.slice())
            return
        }
        //不选i和i+1之间的逗号 不选的区间[0,n-2] 开始位置保持不变
        if (i < n - 1) {
            dfs(i + 1, start)
        }
        //判断子串是否是回文
        if (isHuiWen(s, start, i)) {
            path.push(s.substring(start, i + 1))
            dfs(i + 1, i + 1)
            //这里为什么要恢复现场 "aa" "ac" "ad"
            path.pop()
        }
    }
    dfs(0, 0)
    return res
};

var partition2 = function (s) {
    //从答案的角度出发
    //枚举回文子串的结束的位置
    const n = s.length
    const path = [], res = []
    const isHuiWen = (s, start, end) => {
        while (start < end) {
            while (s[start] !== s[end]) return false
            start++
            end--
        }
        return true
    }
    const dfs = (start) => {
        if (start === n) {
            //枚举的位置到达最后时 在放入
            res.push(path.slice())
            return
        }
        for (let i = start; i < n; i++) {
            if (isHuiWen(s, start, i)) {
                path.push(s.substring(start, i + 1))
                dfs(i + 1)
                path.pop()
            }
        }
    }
    dfs(0)
    return res
};

