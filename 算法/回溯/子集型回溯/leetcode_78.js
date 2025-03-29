/** Leetcode_78: 子集
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    //两种角度看问题
    //从输入的角度看
    // 当前操作: 对于数组中的当前元素选/不选
    // 子问题: 查看后续>i中元素
    // 下一个子问题: 查看后续>i+1中元素
    const n = nums.length;
    const res = [];
    const path = [];
    const dfs = (i) => {
        if (i === n) {
            //子集构造完毕
            res.push(path.slice())
            return
        }
        //当前元素不选 跳过
        dfs(i + 1)
        //选择当前元素
        path.push(nums[i])
        dfs(i + 1)
        //恢复现场
        path.pop()
    }
    dfs(0)
    return res
};

var subsets2 = function (nums) {
    //从输出的角度看
    // 当前操作: 枚举选那个元素
    // 子问题: 
    // 下一个子问题: 查看后续>i+1中元素
    const n = nums.length;
    const res = [];
    const dfs = (start, path) => {
        res.push(path.slice())
        for (let i = start; i < n; i++) {
            path.push(nums[i])
            dfs(i + 1, path)
            path.pop()
        }
    }
    dfs(0, [])
    return res
};
