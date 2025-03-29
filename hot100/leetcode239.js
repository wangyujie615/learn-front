//暴力法 超时
var maxSlidingWindow2 = function (nums, k) {
    //定长滑窗
    const n = nums.length
    const template = []
    const res = []
    for (let i = 0; i < n; i++) {
        if (i < k - 1) {
            template.push(nums[i])
            continue
        }
        template.push(nums[i])
        //拿到滑窗内的最大值
        res.push([...template].sort((a, b) => a - b)[k - 1])
        template.shift()
    }
    return res
};
/**
 * 滑动窗口的最大值
 * @param {*} nums 
 * @param {*} k 
 * @returns 
 */
var maxSlidingWindow = function (nums, k) {
    //定长滑窗
    //使用单调队列:要保证队列的单调性不变
    //队列有序
    const res = []
    const que = []
    const n = nums.length
    for (let i = 0; i < n; i++) {
        //这一步就是保证队列的单调性
        while (que.length > 0 && nums[i] > nums[que[0]]) {
            //当前元素大于队列头部元素 则弹出
            que.shift()
        }
        que.unshift(i)
        if (i - que[que.length-1] >= k) {
            //最大元素与当前元素距离超过窗口大小 则弹出
            que.pop()
        }
        if (i >= k - 1) {
            res.push(nums[que[que.length-1]])
        }
    }
    return res
};
let nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
maxSlidingWindow(nums, k)