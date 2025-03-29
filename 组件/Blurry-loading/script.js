//2025/3/3
const bg = document.querySelector('.bg')
const loading = document.querySelector('.loading-text')
let load = 0
//每隔30毫秒执行
let timer = setInterval(blurring, 30)

function blurring() {
    load++
    if (load > 99) {
        clearInterval(timer)
    }
    loading.innerText =`${load}%`
    loading.style.opacity = scale(load, 0, 100, 1, 0)//[0-100]--[1-0]
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`//[0-100]--[30-0]
}
// 数值范围映射 [0-100]
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}