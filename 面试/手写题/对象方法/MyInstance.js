/**
 * MyInstanceof:判断对象是否是某个类的实例==>查看原型链中是否有这个对象
 */

function MyInstanceof(obj, target) {
    // 获取当前对象的原型
    let proto = Object.getPrototypeOf(obj)
    // 获取目标对象的原型
    let prototype = target.prototype
    while (true) {
        if (!proto) return false
        if (proto === prototype) return true
        // 向下继续查找原型
        proto = Object.getPrototypeOf(proto)
    }
}