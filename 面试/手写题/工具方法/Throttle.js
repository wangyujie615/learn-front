/**
 * 节流函数
 * @param {*} fnc 
 * @param  {...any} args 
 */
function Throttle(fnc, delay = 500) {
    let timer = null
    return function (...args) {
        if (timer) return
        timer = setTimeout(() => {
            fnc.apply(this, args)
            timer = null
        }, delay)
    }
}