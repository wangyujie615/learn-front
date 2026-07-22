function DeepClone(obj, map = new WeakMap()) {
    if (typeof obj === 'object' && !obj) {
        return obj
    }
    if (map.has(obj)) {
        return map.get(obj)
    }
    if (obj instanceof Date) {
        return new Date(obj.getDate());
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    if (obj instanceof Map) {
        const clonedMap = new Map();
        map.set(obj, clonedMap)
        obj.forEach((value, key) => {
            clonedMap.set(DeepClone(key, map), DeepClone(value, map));  // 修正：递归克隆 key 和 value
        });
        return clonedMap
    }
    if (obj instanceof Set) {
        const clonedSet = new Set();
        map.set(obj, clonedSet)
        obj.forEach(value => {
            clonedSet.add(DeepClone(value, map));  // 修正：递归克隆 value
        });
        return clonedSet
    }
    const arr = Array.isArray(obj) ? [] : {};
    map.set(obj, arr)
    for (const p in obj) {
        if (obj.hasProperty(p)) {
            arr[p] = DeepClone(obj[p], map)
        }
    }
    return arr
}