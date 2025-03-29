/** 200.岛屿数量
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    //岛屿的条件 上下左右都是水
    const m = grid.length, n = grid[0].length
    let ans = 0
    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] !== '1') {
            return
        }
        grid[i][j] = '2'
        dfs(i, j - 1)
        dfs(i, j + 1)
        dfs(i + 1, j)
        dfs(i - 1, j)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j)
                ans++
            }
        }
    }
    return ans
};
