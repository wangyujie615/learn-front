/**
 * Leetcode_51:N皇后
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    //每行只能放一个皇后，记录每行的皇后放在那一列
    const ans = [];
    const queens = Array(n).fill(0) //皇后放在(r,queens[r]) 记录列的坐标
    //记录每列能否被访问的状态
    const col = Array(n).fill(false)
    const diag1 = Array(2 * n - 1).fill(false) // 主对角线
    const diag2 = Array(2 * n - 1).fill(false) // 副对角线
    const dfs = (r) => {
        if (r === n) {
            ans.push(queens.map(c => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c)))
            return
        }
        //在(r,c)放皇后
        for (let c = 0; c < n; c++) {
            // 1 0 1 0
            // 0 1 0 1    \方向 [i-1,j-1] [i+1,j+1] x-y = i-j
            // 1 0 1 0    /方向 [i-1,j+1] [i+1,j-1] x+y = i+j
            const rc = r - c + n - 1 // +n-1 避免负数
            if (!col[c] && !diag1[r + c] && !diag2[rc]) {
                //判断能否放皇后
                queens[r] = c
                col[c] = diag1[r + c] = diag2[rc] = true
                dfs(r + 1)
                col[c] = diag1[r + c] = diag2[rc] = false
            }
        }
    }
    dfs(0)
    return ans
};