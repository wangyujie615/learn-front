/**
 * 54.螺旋数组 按层模拟
 * @param {*} matrix 
 */
var spiralOrder = function (matrix) {
    if (!matrix.length || !matrix[0].length) {
        return [];
    }
    //按层遍历
    const rows = matrix.length, columns = matrix[0].length
    const order = [];
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1
    while (left <= right && top <= bottom) {
        //left~right
        for (let column = left; column <= right; column++) {
            order.push(matrix[top][column])
        }
        // top+1~bottom
        for (let row = top + 1; row <= bottom; row++) {
            order.push(matrix[row][right])
        }
        if (left < right && top < bottom) {
            // right-1~left+1
            for (let column = right - 1; column > left; column--) {
                order.push(matrix[bottom][column])
            }
            // bottom~top+1
            for (let row = bottom; row > top; row--) {
                order.push(matrix[row][left])
            }
        }
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
    }
    return order
};
/**
 * 标记法 优化写法
 * @param {*} matrix 
 */
var spiralOrder = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    //利用数组控制移动的方向 运动方向与矩阵方向是一致的 
    const Dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]] //右 下 左 上
    const res = Array(m * n)
    let i = 0, j = 0, di = 0
    for (let k = 0; k < m * n; m++) {
        res[k] = matrix[i][j]
        matrix[i][j] = Infinity //标记
        const x = i + Dirs[di][0];
        const y = j + Dirs[di][1]; //下一步的位置
        if (x < 0 || x >= m || y < 0 || y >= n || matrix[x][y] === Infinity) {
            //若下一步出界 或 已被标记过
            //则调整方向
            di = (di + 1) % 4
        }
        i += Dirs[di][0]
        j += Dirs[di][1]
    }
    return res
};