/**
 * 53.最大子数组和
 */
/**
 * 思路正确 
 * 但是自己没写对
 * 思路1: 连续子数组=>前缀和
 *  */
var maxSubArray = function (nums) {
    //子数组和 ==>前缀和
    //preSum[i]-preSum[j] = max
    let ans = -Infinity
    let minPreSum = 0; //记录前面最小的前缀和
    let preSum = 0;
    for (const x of nums) {
        preSum += x;
        ans = Math.max(ans, preSum - minPreSum);
        minPreSum = Math.min(minPreSum, preSum);
    }
    return ans
};
/**
 * 思路2：DP
 * @param {*} nums 
 * 分析：
 * 定义：f[i]表示以nums[i]结尾的最大子数组和
 * 分类讨论：
 * 1.nums[i]单独组成一个子数组，那么f[i] = nums[i]
 * 2.nums[i]和前面的子数组拼接起来，也就是在以nums[i-1]结尾的最大子数组和之后添加nums[i],那么f[i] = f[i-1]+nums[i]
 */
var maxSubArray = function (nums) {
    const f = Array(nums.length)
    f[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
        // Math.max(f[i-1],0) 包含了自身元素
        // 也可以这么理解 前面的最大和比当前元素小的话 以当前元素为最大值向后传递
        f[i] = Math.max(f[i - 1], 0) + nums[i];
    }
    return Math.max(...f);
}
