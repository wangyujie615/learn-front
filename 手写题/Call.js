Function.prototype.myCall = function (context) { 
    if(typeof this !== 'function'){
        throw new TypeError('not a function')
    }
    context = context || window
    context.fn = this
    let args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}