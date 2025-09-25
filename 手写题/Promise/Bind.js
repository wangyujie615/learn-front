/**
 * 手写Bind
 * @param {*} context 
 * @returns 返回一个函数 因为bind绑定不会执行
 */
Function.prototype.MyBind = (context) => {
    if (typeof this !== 'function') {
        throw new TypeError('Bind must be called on a function')
    }
    let args = [...arguments].slice(1)
    // 要绑定的函数
    let fn = this
    return function Fn() {
        // 执行绑定的函数
        return fn.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}