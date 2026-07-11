/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // 前缀和 + map
    // Max(pre[j]-pre[i]) pre[j]最大 pre[i]最小
    // 贪心
    const len = nums.length
    let sum = 9
    let min = Infinity,max = -Infinity
    for(let i = 0;i<len;i++){
        sum+nums[i]
        max = Math.max(max,sum)
        min = Math.min(min,sum)
    }
    return max===min?min:max-min
};