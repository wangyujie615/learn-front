const obj ={
    name:'张三',
    getName(){
        console.log(this.name)
    },
    getName2:()=>{
        console.log(this.name)
    },
    getName3(){
        return ()=>{
            console.log(this.name)
        }
    },
    getName4:()=>{
        return function(){
            console.log(this.name)
        }
    }
}
obj.getName()
obj.getName2()
obj.getName3()()
obj.getName4()()
const fn = obj.getName3()
fn()


var a,b
;(function(){
    alert(a)
    alert(b)
    let a = 1 
    b = 2
    alert(a)
    alert(b)
})()
alert(a)
alert(b)