/**
 * Flatten:数组扁平化
 */
// 方式1：DFS
function FlattenDfs(data){
    let res = []
    for(let i = 0; i < data.length; i++){
        if(Array.isArray(data[i])){
            res.push(...FlattenDfs(data[i]))
        }else{
            res.push(data[i])
        }
    }
    return res
}

// 方式2： reduce+concat
function FlattenReduce(data){
    return data.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? FlattenReduce(cur) : cur)
    }, [])
}
// 方式3：迭代
function FlattenIter(data){
    let res = []
    let stack = [...data]
    while(stack.length){
        let cur = stack.pop()
        if(Array.isArray(cur)){
            stack.push(...cur)
        }else{
            res.push(cur)
        }
    }
    return res.reverse()
}


