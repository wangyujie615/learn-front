/**
 * 找到数组中缺失的第一个正整数
 * @param {number[]} nums - 输入的整数数组
 * @return {number} - 返回缺失的第一个正整数
 */
var firstMissingPositive = function (nums) {
    // 思路
    // [1,2,3,0]==>最小是4
    // [0,2,3,1]==>[1,2,3,0]最小是4 nums[i] ===i+1  1->0 2->1 3->2
    const len = nums.length
    // 第一遍遍历：将每个正整数放到其对应的位置上（值为x的数放到索引x-1的位置）
    for (let i = 0; i < len; i++) {
        while (nums[i] > 0 && nums[i] < len && nums[nums[i] - 1] !== nums[i]) {
            const temp = nums[nums[i] - 1]
            nums[nums[i] - 1] = nums[i]
            nums[i] = temp
        }
    }
    // 第二遍遍历：找到第一个不在正确位置上的数
    for (let i = 0; i < len; i++) {
        if (nums[i] !== i + 1) {
            return i + 1
        }
    }
    // 如果所有位置都正确，则缺失的第一个正整数是len+1
    return len + 1
};