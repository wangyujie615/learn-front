/**
 * Leetcode_494: 目标和
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    // 从输入的角度
    // 操作：选择当前的元素添加负号
    const n = nums.length
    let count = 0
    let sum = nums.reduce((pre, cur) => pre + cur)
    const dfs = (i) => {
        if (i === n) {
            if (sum === target) {
                count++
            }
            return
        }
        //不选当前的元素添加负号
        dfs(i + 1)
        //选择当前元素添加负号
        sum = sum - nums[i] * 2
        dfs(i + 1)
        //恢复现场
        sum = sum + nums[i] * 2
    }
    dfs(0)
    return count
};

var findTargetSumWays2 = function (nums, target) {
    // 从输出的角度观察
    // 操作：枚举第i个元素添加负号 添加负号是具备一定的条件的
    const n = nums.length
    let sum = nums.reduce((pre, cur) => pre + cur)
    // 初始化
    let count = sum === target ? 1 : 0
    const dfs = (start) => {
        if (start === n) {
            return
        }
        for (let i = start; i < n; i++) {
            if (sum >= target) {
                //添加负号
                sum -= 2 * nums[i]
                if (sum === target) count++
                dfs(i + 1)
                sum += 2 * nums[i]
            }
        }
    }
    dfs(0)
    return count
};
