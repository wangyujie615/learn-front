/**
 * promise.race([])
 * @param {Array} promises 
 */
function MyPromiseRace(promises) {
    return new Promise((resolve, reject) => {
        // 检查输入是否为可迭代对象
        if (!promises || typeof promises[Symbol.iterator] !== 'function') {
            return reject(new TypeError('Argument is not iterable'));
        }

        // 处理空数组情况
        if (promises.length === 0) {
            // 空数组将永远pending，与原生行为一致
            return;
        }
        for (const promise of promises) {
            Promise.resolve(promise)
                .then(resolve)
                .catch(reject)
        }
    })
}