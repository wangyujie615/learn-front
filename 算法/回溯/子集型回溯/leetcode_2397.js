/**Leetcode_2397: 被列覆盖的最多行数
 * @param {number[][]} matrix
 * @param {number} numSelect
 * @return {number}
 */
var maximumRows = function (matrix, numSelect) {
    //记录矩阵每一行中元素为1的坐标
    const n = matrix[0].length
    let res = 0
    const dfs = (i, count) => {
        if (i === n) {
            if (count === numSelect) {
                //选中的列数
                let num = 0
                for (const row of matrix) {
                    if (row.every(item => (item === -1 || item === 0))) {
                        num++
                    }
                }
                res = Math.max(res, num)
            }
            return
        }
        dfs(i + 1, count)
        //选中当前列
        count += 1
        //统计当前覆盖的行数
        for (const row of matrix) {
            if (row[i] !== 0) {
                //标记
                row[i] = -1
            }
        }
        dfs(i + 1, count)
        count -= 1
        for (const row of matrix) {
            if (row[i] !== 0) {
                //标记
                row[i] = 1
            }
        }
    }
    dfs(0, 0)
    return res
};

var maximumRows2 = function (matrix, numSelect) {
    const n = matrix[0].length
    let res = 0
    const dfs = (start, count) => {
        if (count === numSelect) {
            let num = 0
            for (const row of matrix) {
                if (row.every(item => item === -1 || item === 0)) num++
            }
            res = Math.max(num, res)
        }
        for (let i = start; i < n; i++) {
            if (count < numSelect) {
                count += 1
                //标记访问的行元素
                for (const row of matrix) {
                    if (row[i] !== 0) row[i] = -1
                }
                dfs(i + 1, count)
                for (const row of matrix) {
                    if (row[i] !== 0) row[i] = 1
                }
                count -= 1
            }
        }
    }
    dfs(0, 0)
    return res
};