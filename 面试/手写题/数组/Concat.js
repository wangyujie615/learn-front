/**
 * Concat方法
 * @param  {...any} args 
 * @returns 
 */
function Concat(...args){
    let res = []
    for(let i = 0; i < args.length; i++){
        if(Array.isArray(args[i])){
            // 浅拷贝
            res.push(...args[i])
        }else{
            res.push(args[i])
        }
    }
    return res
}