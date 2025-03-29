/**
 * 56.合并区间
 * @param {*} intervals 
 * 暴力法
 */
var merge = function (intervals) {
    //先排序
    const res = []
    intervals.sort((a, b) => a[0] - b[0])
    for (const [start, end] of intervals) {
        if (res.length === 0) {
            res.push([start, end])
            continue
        }
        const left = res[res.length - 1][0]
        const right = res[res.length - 1][1]
        if (start <= right) {
            //有交集的时候就存入
            res.pop()
            res.push([left, Math.max(right, end)])
        }
        if (start > right) {
            res.push([start, end])
        }
    }
    return res
};