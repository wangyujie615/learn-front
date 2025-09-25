/**
 * promise.all
 * 返回值是一个promise
 * @returns 
 */
function MyPromiseAll(promiseArr) {
    return new Promise((resolve, reject) => {
        // 如果输入不是一个promise对象，直接reject
        if (!promiseArr || typeof promiseArr[Symbol.iterator] !== 'function') {
            return reject(new TypeError('Arguments is not iterable'))
        }
        const results = []
        let competedCount = 0
        const promiseCount = promiseArr.length
        // 处理空数组
        if (promiseCount === 0) {
            resolve(results)
        }
        promiseArr.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((result) => {
                    results[index] = result
                    competedCount++
                    if (competedCount === promiseCount) {
                        resolve(results)
                    }
                }).catch((error) => {
                    reject(error)
                })
        })
    })
}