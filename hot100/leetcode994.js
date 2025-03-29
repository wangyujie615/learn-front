/**994.腐烂的橘子
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    //BFS思路
    const m = grid.length, n = grid[0].length;
    let fresh = 0;
    let q = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                fresh++;
            } else if (grid[i][j] === 2) {
                //统计腐烂的橘子
                q.push([i, j])
            }
        }
    }
    let ans = 0;
    //结束条件 全部腐烂完或者 腐烂到最后一个
    while (fresh && q.length) {
        ans++;//一分钟后
        const tmp = q; // 上一次腐烂橘子
        q = [];//记录最新的位置
        for (const [x, y] of tmp) {
            for (const [i, j] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
                if (i >= 0 && i < m && j >= 0 && j < n && grid[i][j] === 1) {
                    //是新鲜橘子
                    fresh--
                    grid[i][j] = 2;
                    q.push([i, j])
                }
            }
        }
    }
    return fresh ? -1 : ans;
};