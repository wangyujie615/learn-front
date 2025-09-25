Array.prototype.MyReduce = function (callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new Error(callback + ' is not function')
    }
    const arr = this //指向被调用的数组
    let accumulator = initialValue
    let startIndex = 0
    //如果没有提供初始值
    if (arguments.length < 2) {
        //空数组且无初始值时报错
        if (arr.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value')
        }
        // 将数组的第一个元素作为初始值
        accumulator = arr[0]
        startIndex = 1
    }
    //遍历数组
    for (let i = startIndex; i < arr.length; i++) {
        //调用回调函数，传入累加器、当前元素、索引和原数组
        accumulator = callback(accumulator, arr[i])
    }
    return accumulator;
}
console.log([1, 2, 3, 4].MyReduce((a, b) => a + b))