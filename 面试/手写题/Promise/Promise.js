
class MyPromise {
    constructor(executor) {
        // 默认状态
        this.status = 'pending';
        // 存放成功状态的值
        this.value = undefined;
        // 存放失败状态的值
        this.reason = undefined;

        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks = [];
        
        // 使用箭头函数确保this指向正确
        const resolve = (value) => {
            // 如果value是一个Promise，需要等待这个Promise完成
            if (value instanceof MyPromise) {
                return value.then(resolve, reject);
            }
            
            if (this.status === 'pending') {
                this.status = 'fulfilled';
                this.value = value;
                // 依次将对应的函数执行
                this.onResolvedCallbacks.forEach(fn => {
                    setTimeout(fn, 0); // 异步执行回调
                });
            }
        };
        
        const reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                // 依次将对应的函数执行
                this.onRejectedCallbacks.forEach(fn => {
                    setTimeout(fn, 0); // 异步执行回调
                });
            }
        };
        
        try {
            // 执行executor，传入resolve和reject函数
            executor(resolve, reject);
        } catch (error) {
            // 如果执行过程中出错，直接reject
            reject(error);
        }
    }
    
    // then方法实现
    then(onFulfilled, onRejected) {
        // 处理onFulfilled和onRejected不是函数的情况
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        };
        
        // 创建新的Promise用于链式调用
        const promise2 = new MyPromise((resolve, reject) => {
            // 若当前的promise 处理成功状态
            if (this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        // 则执行onFulfilled函数
                        const x = onFulfilled(this.value);
                        // 调用辅助函数
                        this.resolvePromise(promise2, x, resolve,reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            
            // 处理失败状态
            if (this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve,reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            
            // 处理pending状态
            if (this.status === 'pending') {
                // 将成功回调存入数组
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                
                // 将失败回调存入数组
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });
        
        // 返回新的Promise以支持链式调用
        return promise2;
    }
    
    // 用于解析Promise结果的辅助方法
    resolvePromise(promise2, x, resolve, reject) {
        // 如果promise2和x引用同一个对象，抛出TypeError
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'));
        }
        
        // 标记是否已经调用过resolve或reject
        let called = false;
        
        // 如果x是一个Promise
        if (x instanceof MyPromise) {
            if (x.status === 'pending') {
                // 如果x是pending状态，等待x完成
                x.then(y => {
                    this.resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    reject(r);
                });
            } else {
                // 如果x已经是fulfilled或rejected状态，直接调用对应的回调
                x.then(resolve, reject);
            }
        } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            // 如果x是对象或函数，尝试获取x.then
            try {
                const then = x.then;
                if (typeof then === 'function') {
                    // 如果then是函数，将x作为this调用then
                    then.call(x, y => {
                        if (called) return;
                        called = true;
                        this.resolvePromise(promise2, y, resolve,reject);
                    }, r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    });
                } else {
                    // 如果then不是函数，将x作为promise2的值
                    if (called) return;
                    called = true;
                    resolve(x);
                }
            } catch (error) {
                // 如果获取then或调用then时出错，reject promise2
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            // 如果x是其他值，将x作为promise2的值
            if (called) return;
            called = true;
            resolve(x);
        }
    }
    
    // catch方法实现
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    
    // finally方法实现
    finally(onFinally) {
        return this.then(
            value => {
                return MyPromise.resolve(onFinally()).then(() => value);
            },
            reason => {
                return MyPromise.resolve(onFinally()).then(() => {
                    throw reason;
                });
            }
        );
    }
    
    // 静态方法：Promise.resolve
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        
        return new MyPromise((resolve, reject) => {
            resolve(value);
        });
    }
    
    // 静态方法：Promise.reject
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }
    
    // 静态方法：Promise.all
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises must be an array'));
            }
            
            const result = [];
            let count = 0;
            
            if (promises.length === 0) {
                return resolve(result);
            }
            
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        result[index] = value;
                        count++;
                        
                        if (count === promises.length) {
                            resolve(result);
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                );
            });
        });
    }
    
    // 静态方法：Promise.race
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises must be an array'));
            }
            
            if (promises.length === 0) {
                return;
            }
            
            promises.forEach(promise => {
                MyPromise.resolve(promise).then(resolve, reject);
            });
        });
    }
    
    // 静态方法：Promise.allSettled
    static allSettled(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises must be an array'));
            }
            
            const result = [];
            let count = 0;
            
            if (promises.length === 0) {
                return resolve(result);
            }
            
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise)
                    .then(
                        value => {
                            result[index] = { status: 'fulfilled', value };
                        },
                        reason => {
                            result[index] = { status: 'rejected', reason };
                        }
                    )
                    .finally(() => {
                        count++;
                        if (count === promises.length) {
                            resolve(result);
                        }
                    });
            });
        });
    }
    
    // 静态方法：Promise.any
    static any(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('promises must be an array'));
            }
            
            const errors = [];
            let count = 0;
            
            if (promises.length === 0) {
                return reject(new AggregateError([], 'All promises were rejected'));
            }
            
            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        errors[index] = reason;
                        count++;
                        
                        if (count === promises.length) {
                            reject(new AggregateError(errors, 'All promises were rejected'));
                        }
                    }
                );
            });
        });
    }
}

// 导出MyPromise类
module.exports = MyPromise;