function debounce(func, delay) {
    let timer = null
    // 剩余参数 收集所有参数到数组中 确保任意参数传递给原函数
    // 防抖函数返回的新函数可能接收 任意数量的参数（如 input 事件可能传入 event 对象）
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
