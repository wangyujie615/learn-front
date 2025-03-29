/**
 * 手写new
 * @param {构造函数} Func 
 * @param  {...any} args 
 */
function MyNew(Func, ...args) {
    const obj = {};
    obj.__proto__ = Func.prototype;
    //当前对象调用构造函数
    const instance = Func.apply(obj, args)
    if (typeof instance === 'object') return instance;
}