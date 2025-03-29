/**
 * 240.搜索二维矩阵II ==>Z字搜索
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    //思路一：对每行或者每列使用二分搜索 超时
    const n = matrix.length
    for (let i = 0; i < n; i++) {
        if (matrix[i].includes(target)) return true
    }
    return false
};

/**
 * 240.搜索二维矩阵II ==>Z字搜索
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    //**从右上角开始查找 Z字搜索*/
    const m = matrix.length, n = matrix[0].length
    let i = 0, j = n - 1
    while (i < m && j >= 0) {
        if (matrix[i][j] === target) {
            return true
        }
        if (matrix[i][j] > target) {
            i++
        } else {
            j--
        }
    }
    return false
};