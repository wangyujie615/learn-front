/**
 * 73.矩阵置0
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    /**使用O(m+n)空间 */
    //行
    const rows = []
    const cols = []
    const m = matrix.length
    const n = matrix[0].length
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rows.push(i)
                cols.push(j)
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rows.includes(i) || cols.includes(j)) {
                matrix[i][j] = 0
            }
        }
    }
};

/**
 * 73.矩阵置0 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    /**使用O(1)空间  利用标记变量*/
    const m = matrix.length,n = matrix[0].length
    let flagCol_first = false,flagRow_first = 0
    //记录第一行和第一列是否有0
    for (let i = 0; i < m; i++) {
        if(matrix[i][0]===0){
            flagCol_first = true;
            break;
        }
    }
    for (let j = 0; j < n; j++) {
        if(matrix[0][j]===0){
            flagRow_first = true;
            break;
        }
    }
    //将元素的0 标记到第一行或者而第一列
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if(matrix[i][j]===0){
                matrix[i][0]=matrix[0][j]=0
            }
        }
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1;j < n; j++) {
            if(matrix[i][0]===0||matrix[0][j]===0){
                matrix[i][j] = 0
            }
        }
    }
    //对第一行或者第一列元素进行处理
    if(flagCol_first){
        for (let i = 0; i < m;i++) {
            matrix[i][0]=0
        }
    }
    if(flagRow_first){
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }

};