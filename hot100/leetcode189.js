/**
 * 189.轮转数组
 * @param {*} nums 
 * @param {*} k 
 * 不知道哪里出错
 */
var rotate = function(nums, k) {
    const template = nums.concat(nums)
    const n = nums.length
    return template.splice(n-k,n)
};

/**
 * 双指针 反转
 * @param {*} nums 
 * @param {*} k 
 * 没有返回值 原地修改
 */
var rotate = function(nums, k) {
    const reverse = (i,j)=>{
        while(i<j){
            [nums[i],nums[j]]=[nums[j],nums[i]]
            i++
            j--
        }
    }
    const n = nums.length
    k%=n
    reverse(0,n-1)
    reverse(0,k-1)
    reverse(k,n-1)
};
