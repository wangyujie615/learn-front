/**
 * 48.旋转图像
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
import _ from 'lodash'
var rotate = function (matrix) {
    //第一行 旋转后变成最后一列 暴力法
    const m = matrix.length, n = matrix[0].length
    const res = new Array(n).fill(0).map(() => new Array(n).fill(0)); //创建二维数组
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            res[j][n - i - 1] = matrix[i][j]
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i][j] = matrix_new[i][j];
        }
    }
};

/**
 * 原地旋转
 * 由num[col][n-row-1] = num[row][col] 不断递推得到
 */
var rotate = function (matrix) {
    const n = matrix[0].length
    for (let i = 0; i < Math.floor(n/2); i++) {
        for (let j = 0; j < Math.floor((n+1)/2); j++) {
            const temp = matrix[i][j]
            matrix[i][j] = matrix[n - j - 1][i]
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]
            matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]
            matrix[j][n - i - 1] = temp
        }
    }
};
/**
 * 翻转代替旋转
 * 先水平翻转 [matrix[row][col],matrix[n-row][col]] =  [matrix[n-row][col],matrix[row][col]]
 * 主对角线翻转
 * @param {*} matrix 
 */
var rotate = function (matrix) {

    const n = matrix.length
    //水平翻转
    for (let i = 0; i < Math.floor(n/2); i++) {
        for (let j = 0; j < n; j++) {
            [matrix[i][j],matrix[n-i-1][j]]=[matrix[n-i-1][j],matrix[i][j]]
        }
    }
    // 主对角线翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

};
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
console.log(rotate(matrix));