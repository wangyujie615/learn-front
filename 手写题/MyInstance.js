function MyInstanceof(obj, target) {
    let proto = Object.getPrototypeOf(obj)
    let prototype = target.prototype
    while (true) {
        if (!proto) return false
        if (proto === prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}