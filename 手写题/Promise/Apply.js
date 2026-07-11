Function.prototype.myApply = function (context, args) { 
    if(typeof this !== 'function'){
        throw new TypeError('not a function')
    }
    context = context || window
    context.fn = this
    let result
    if(Array.isArray(args)){
        result = context.fn(...args)
    }else{
        result = context.fn()
    }
    delete context.fn
    return result
}