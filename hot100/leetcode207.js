/**207.课程表
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    //有向图无环
    //判断课程之间是否存在环
    //有环既可以完成
    //三色标记法:定义三种颜色 标志三种状态：未访问 正在访问 完全访问完毕
    const g = Array.from({ length: numCourses }, () => [])
    //邻接表
    for (const [a, b] of prerequisites) {
        g[b].push(a)
    }
    //定义颜色数组
    const colors = Array(numCourses).fill(0)
    const dfs = (x) => {
        colors[x] = 1;//标志正在访问中
        for (const y of g[x]) {
            if (colors[y] === 1 || colors[y] === 0 && dfs(y)) {
                //若当前的元素正在访问 或者 未被访问 搜索得到的元素可以防问得到
                return true
            }
        }
        //x完全访问完毕
        colors[x] = 2;
        return false;
    }
    for (let i = 0; i < numCourses; i++) {
        if (colors[i] === 0 && dfs(i)) {
            return false;
        }
    }
    return true;

};


let num = 2, prerequisites = [[2, 1], [1, 0]]
console.log(canFinish(num, prerequisites));