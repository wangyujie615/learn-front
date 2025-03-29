/**39.组合总和
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    //可以重复选择
    //剪枝
    //去重
    candidates.sort((a,b)=>a-b); 
    const n = candidates.length;
    const res = []
    const dfs = (sum, temp) => {
        if (sum === target) {
            res.push([...temp])
            return
        }
        for (let i = 0; i < n; i++) {
            sum += candidates[i]
            if (sum > target) return
            temp.push(candidates[i])
            dfs(sum, temp)
            sum -= candidates[i]
            temp.pop()
        }
    }
    dfs(0, [])
    return res

};