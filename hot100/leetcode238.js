/**
 * 238.除以自身以外数组的乘积
 * 前后缀写法
 * 思路：除了自身的乘积：前缀*后缀
 * @param {*} nums 
 */
var productExceptSelf = function (nums) {
    //O(n)
    const n = nums.length
    const preM = Array(n)
    const nextM = Array(n)
    preM[0] = nums[0]
    for (let i = 1; i < n; i++) {
        preM[i] = preM[i - 1] * nums[i]
    }
    nextM[n - 1] = nums[n - 1]
    for (let i = n - 2; i >= 0; i--) {
        nextM[i] = nextM[i + 1] * nums[i]
    }
    const res = Array(n)
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            //无前缀
            res[i] = nextM[i + 1]
            continue
        }
        if (i === n - 1) {
            //无后缀
            res[i] = preM[i - 1]
            continue
        }
        res[i] = preM[i - 1] * nextM[i + 1]
    }
    return res
};
let nums = [-1, 1, 0, -3, 3]
console.log(productExceptSelf(nums));