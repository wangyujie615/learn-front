/**
 * 和为k的子数组
 * @param {*} nums 
 * @param {*} k 
 * @returns 
 */
var subarraySum = function(nums, k) {
    //子数组的和：前缀和
    const n = nums.length
    const preSum  = Array(n+1)
    preSum[0] = 0
    for (let i = 1; i <= n; i++) {
        preSum[i] = preSum[i-1]+nums[i-1]
    }
    //子数组的和：presum[first] - presum[second] = k
    //利用Hash存储
    // presum[first] - k = presum[second]
    // key: value:num
    const map = new Map()
    let count = 0
    for (const num of preSum) {
        if(map.has(num-k)){
            count+=map.get(num-k)
        }
        map.set(num,(map.get(num)??0)+1)
    }
    return count
}