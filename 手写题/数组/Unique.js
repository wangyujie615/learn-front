/**
 * 数组去重
 */
// 1.set
function UniqueBySet(arr){
    return [...new Set(arr)]
}
// 2.indexOf
function Unique(arr){
    return arr.filter((item,index,arr)=>{
        // indexOf:找到第一个元素
        return arr.indexOf(item) === index
    })
}
