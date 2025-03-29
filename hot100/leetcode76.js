//最小覆盖子串
/**
 * 最小覆盖子串
 * @param {*} s 
 * @param {*} t 
 */
var minWindow = function (s, t) {
    if (!s || !t || s.length < t.length) {
        return '';
    }
    //动态滑窗
    const map = new Map()
    for (const c of t) {
        map.set(c, (map.get(c) ?? 0) + 1)
    }
    const n = s.length
    let start = 0, end = n, res = n+1, left = 0;
    for (let i = 0; i < n; i++) {
        if (map.has(s[i])) {
            map.set(s[i], map.get(s[i]) - 1)
        }
        while ([...map.values()].every(value => value <= 0)) {
            if (map.has(s[left])) {
                map.set(s[left], map.get(s[left]) + 1)
            }
            if (res > i - left + 1) {
                res = i - left + 1
                start = left
                end = i
            }
            left++
        }
    }
    return res > s.length ? "" : s.substring(start, end + 1);
}