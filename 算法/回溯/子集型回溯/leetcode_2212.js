/**Leetcode_2212: 射箭比赛中的最大得分
 * @param {number} numArrows
 * @param {number[]} aliceArrows
 * @return {number[]}
 */
var maximumBobPoints = function (numArrows, aliceArrows) {
    const n = aliceArrows.length
    let maxScore = 0
    let path = new Array(n).fill(0)
    let res = []
    const dfs = (i, score) => {
        if (i === n) {
            if (score >= maxScore) {
                //不需要射光箭
                maxScore = score
                res = path.slice()
            }
            return
        }
        //不选当前得分区域
        dfs(i + 1, score)
        //选择当前得分区域
        if (numArrows > aliceArrows[i]) {
            score += i
            numArrows -= aliceArrows[i] + 1
            path[i] += aliceArrows[i] + 1
            dfs(i + 1, score)
            score -= i
            numArrows += aliceArrows[i] + 1
            path[i] -= aliceArrows[i] + 1
        }
    }
    dfs(1, 0)
    res[0] = numArrows - res.reduce((pre, cur) => pre + cur)
    return res
};
