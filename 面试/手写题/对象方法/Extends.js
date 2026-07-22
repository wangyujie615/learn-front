function Person(name) {
    this.name = name
}
function Man(name, gender) {
    //调用构造函数
    Person.call(this, name)
    this.gender = gender
}

//原型链混合继承
Man.prototype = Object.create(Person.prototype) //创建对象  这里也可以使用构造函数创建
Man.prototype.getName = function () {
    return this.name
}
const m = new Man('jie', 'male')
console.log(m.getName());