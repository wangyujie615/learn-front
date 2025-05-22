//无限函数柯里化
function Curry(fn) {
    return function curried(...args) {
        // function.length代表形参的个数
        if (args.length >= fn.length) {
            //当前参数多于函数需要的参数时 执行fn
            return fn.apply(this, args)
        } else {
            return function (...newArgs) {
                //当前参数少于需要参数时 继续柯里化
                return curried.apply(this, args.concat(newArgs))
            }
        }
    }
}
function sum(a, b, c, d) {
    return a + b + c + d
}
const currySum = Curry(sum)
console.log(currySum(1, 2, 3)(4))
