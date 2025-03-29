const o = {
    a: 1,
    b: 1,
    // __proto__ 设置了[[Prototype]]。在这里被指定为一个对象字面量
    __proto__: {
        b: 2, c: 3
    }
}
console.log(o.a); // 1 对象原本的方法
console.log(o.b); // 1 查找b元素 原始对象上有该元素 原型的元素就会被遮蔽
console.log(o.c); // 3 原始对象上没有该元素 就向上查找原型中是否包含该元素

const parent = {
    value: 2,
    method() {
        return this.value + 1
    }
}
console.log(parent.method());
//继承了 一个parent对象
const child = {
    __proto__: parent
}
console.log(child.method()); //继承的父对象中的this指向的是继承的对象
// this指向child
// 向上查找value
child.value = 4 //现在child添加了value属性 父对象的value属性就会被遮蔽
console.log(child.method()); //5 这里说明继承的父对象中的this指向的是继承的对象 不是指向的父对象

//构造函数 每个构造函数会自动为每个构造的对象设置原型
function Box(value) {
    this.value = value
    this.prototype = {}
}

//Box.prototype:就是一个普通的对象 {}
//向这个对象中添加属性或方法
//Constructor.prototype有一个默认的属性：constructor-->指向构造函数
Box.prototype.getValue = () => {
    return this.value
}
//在任何实例中访问原始构造函数。
console.log(Box.prototype.constructor);
const boxes = [new Box(1), new Box(2), new Box(3)]
console.log(boxes[0].__proto__);
// 通过构造函数创建的每一个实例都会自动将构造函数的 prototype 属性作为其 [[Prototype]] 
const m = {}
console.log(m.__proto__ === Object.prototype);
function name() {
    console.log('1');
}

function f(){
    console.log(2);
}
f.prototype.input = function(){
    console.log('1');
}
//要想访问原型对象中的方法 要先实例化对象
const  p = new f()
console.log(p.input());
console.log(Function.__proto__===Function.prototype);