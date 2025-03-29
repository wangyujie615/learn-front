function side1(arr){
    arr[0] = arr[2]
}
function a(a,b,c=3){
    c = 10
    side1(arguments)
    return a+b+c
}
console.log(a(1,1,1));