/**
 * 41.缺失的第一个正数 暴力法
 * @param {number[]} nums
 * @return {number} 
 */
var firstMissingPositive = function (nums) {
    //事件复杂度：O(n) 常数级空间
    //最小正整数
    const search = (nums, target) => {
        let left = -1, right = nums.length
        while (left + 1 < right) {
            const mid = left + Math.floor((right - left) / 2)
            if (nums[mid] === target) {
                return mid
            } else if (nums[mid] > target) {
                right = mid
            } else {
                left = mid
            }
        }
        return -1
    }
    //O(Nlog(n))
    nums.sort((a, b) => a - b)
    if (nums[0] > 1) return 1
    const n = nums.length
    //二分
    for (let i = 1; i <= 1000000; i++) {
        const index = search(nums, i)
        if (index < n && index >= 0) {
            continue;
        } else {
            return i;
        }
    }
    return 1
};

/**
 * 41.缺失的第一个正数 原地hash:O(N) O(N)
 * @param {number[]} nums
 * @return {number} 
 */
var firstMissingPositive = function (nums) {
    const len = nums.length
    const set = new Set()
    for (const num of nums) {
        set.add(num)
    }
    for (let i = 1; i <= len; i++) {
        if (!set.has(i)) {
            return i
        }
    }
    return len + 1;
}

/**
 * 41.缺失的第一个正数 原地hash
 * @param {number[]} nums
 * @return {number} 
 */
var firstMissingPositive = function (nums) {
    const len = nums.length
    const set = new Set()
    for (const num of nums) {
        set.add(num)
    }
    for (let i = 1; i <= len; i++) {
        if (!set.has(i)) {
            return i
        }
    }
    return len + 1;
}
/**
 * 41.缺失的第一个正数 置换的方法
 * @param {number[]} nums
 * @return {number} 
 */
var firstMissingPositive = function (nums) {
    //[1,-1,0,3]=>[1,-1,3,0] 恢复为正常时 我们就知道缺乏的位置是那个元素了
    const len = nums.length
    for (let i = 0; i < len; i++) {
        while (nums[i] > 0 && nums[i] <= len && nums[i] !== nums[nums[i] - 1]) {
            const temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }
    //[]
    //这里对于任何都会转换为[1,2,3,4,.....]
    for (let i = 0; i < len; i++) {
        if (nums[i] !== i + 1) {
            return i + 1
        }
    }
    return len + 1
}
let nums = [3, 4, -1, 1]
console.log(firstMissingPositive(nums));