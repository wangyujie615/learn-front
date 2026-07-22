/**
 * 手写ObjectCreate()：基于原型创建对象
 */
function MyObjectCreate(proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'null') {
        throw new TypeError('Object prototype may only be an Object or null');
    }
    const obj = {}
    Object.setPrototypeOf(obj, proto) // 设置原型
    if (propertiesObject) {
        Object.defineProperties(obj, propertiesObject)
    }
    return obj
}