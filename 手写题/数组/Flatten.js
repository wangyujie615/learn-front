// 递归
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

// reduce
function FlattenReduce(data){
    return data.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? FlattenReduce(cur) : cur)
    }, [])
}
// 迭代
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

