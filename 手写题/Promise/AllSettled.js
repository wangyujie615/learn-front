// 实现 Promise.allSettled() 方法
function myPromiseAllSettled(promiseArr) {
  // 检查参数是否为数组
  if (!Array.isArray(promiseArr)) {
    return Promise.reject(new TypeError('Argument must be an array'));
  }

  // 返回一个新的 Promise
  return new Promise((resolve) => {
    // 如果数组为空，直接返回空数组
    if (promiseArr.length === 0) {
      return resolve([]);
    }

    const results = []; // 存储所有 Promise 的结果
    let settledCount = 0; // 已完成的 Promise 数量

    // 遍历每个 Promise
    promiseArr.forEach((promise, index) => {
      // 确保处理的是 Promise 对象，非 Promise 对象用 Promise.resolve 包装
      Promise.resolve(promise)
        .then((value) => {
          // Promise 成功，添加状态为 fulfilled 的结果
          results[index] = {
            status: 'fulfilled',
            value
          };
        })
        .catch((reason) => {
          // Promise 失败，添加状态为 rejected 的结果
          results[index] = {
            status: 'rejected',
            reason
          };
        })
        .finally(() => {
          // 无论成功失败，都增加已完成计数
          settledCount++;
          
          // 当所有 Promise 都已完成时，解析返回的 Promise
          if (settledCount === promiseArr.length) {
            resolve(results);
          }
        });
    });
  });
}
