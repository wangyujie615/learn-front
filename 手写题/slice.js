const arr = [1, [2, 3], [4, [5, 6]]]
//数组扁平化 就是转化为 [1,2,3,4,5,6]
//方式 1 flat(depth)
console.log('flat:', arr.flat(1).flat(1));
//方式 2 递归 
const dfs = (arr, res) => {
    if (arr.length <= 0) return;
    for (const item of arr) {
        if (Array.isArray(item)) {
            dfs(item, res)
        } else {
            res.push(item)
        }
    }
}
//循环
const res = []
dfs(arr, res)
console.log('递归:', res);