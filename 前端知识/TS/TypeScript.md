##  TS简介
**TS相比JS的优势**

1. 更早的发现错误
2. 任何位置都有代码提示
3. 强大的类型系统提升代码的可维护性
4. 支持最新ECMAScript语法
5. TS类型推断机制，不需要在代码中的每个地方都显示标注类型

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736861922189-4273c1f1-34ae-4b98-8f20-99bc5f30f8d7.png)

**简化ts运行步骤**

全局安装ts-node包

```jsx
npm i -g ts-node
ts-node xx.ts
```

##  常用的类型
基础类型概述

基础类型：

1. JS已有类型
+ 原始类型：number/string/boolean/null/undefined/symbol
+ 对象类型：object(数组、对象、函数等)
2. TS新增类型
+ 联合类型、自定义类型(类型别名)、接口、元组、字面量类型、枚举、void、any等

### 类型注解
作用：为变量添加**类型约束**

```typescript
let age: number = 18  //number就是类型注解，约定数据的类型
```

### 原始类型
完全按照JS类型的写法

```typescript
let age: number = 18
let name: string = 'wyj'
let flag: boolean = false
let a: null = null
let b: undefined = undefined
```

### 对象类型
#### 数组类型
```typescript
1.写法 1
let number: number[] = [1,2,3] //数值的数组类型
let strs: string[] = ['a','b','c'] //表示的是字符串数组
2.写法 2
let number: Array<number> = [1,2,3]
let arr: Array<string> = ['a','b','c']

// | :表示联合类型,由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种
let arr: (number|string)[] = [1,'a','c'] // 既包含number和string的数组
```

### 类型别名
类型别名(自定义类型)：为任意类型起别名

使用场景：当统一类型被多次使用时，可以通过类型别名，简化该类型的使用。

```typescript
type customArray = (number|string)[] // 使用type关键字来 创建类型别名
let arr1: customArray = [1,'a',3,'b'] // 直接使用该类型别名作为变量类型注解
let arr2: customArray = ['x','y',6,7]
```

### 函数类型
函数类型：函数参数和返回值类型

两种方式：

+ 单独指定参数，返回值的类型 
+ 同时指定参数，返回值的类型

```typescript
function add(num1:number,num2:number):number{
  return num1+num2;
}
const add = (num1:number,num2:number):number =>{
  return num1+num2;
}
// 同时指定参数，返回值的类型 这种形式只能适用于函数表达式
const add: (num1:number,num2:number)=>number = (num1,num2) =>{
  return num1+num2;
}
```

#### void类型
函数没有返回值，函数的返回值类型： void

```typescript
const add = (num1:number,num2:number): void =>{
  console.log('wyj')
}
```

#### 可选参数
使用函数实现某个功能是，参数可以传也可以不传，在给函数参数指定类型时，就用到可选参数。**<font style="color:#ED740C;">必选参数必须位于可选参数之前</font>**

```typescript
//可选参数：在可传可不传的参数名称后面添加？
//必选参数必须位于可选参数之前
function mySlice(start?: number,end?: number):void{
  console.log('起始索引：'，start,'结束索引：'，end)
}
```

### 对象类型
```typescript
// 为对象指定类型
let person:{ name:string; age:number; sayHi():void greet(name:string): void }={
  name:'jack',
  age:19,
  sayHi(){},
  greet(name){}
}

let person:{ 
  name:string
  age:number
  sayHi:()=>void
  greet:(name:string)=>void 
}={
  name:'jack',
  age:19,
  sayHi(){},
  greet(name){}
}
```

注：

如果一行代码只指定一个类型，可以去掉分号

方法的类型可以使用箭头函数

#### 对象可选属性
可选属性和可选参数的写法一致

```typescript
function axios(config:{url:string;method?:string}){
  //method可选
}
```

#### 接口
当一个对象类型被多次使用时，一般会用接口来描述对象，达到**<font style="color:#ED740C;">复用</font>**的目的；表示约束，约束对象和类

```typescript
//interface：声明接口
//IPerson：接口名称

//声明接口
interface IPerson{
  name:string
  age:number
  sayHi:()=>void
}
//使用
let person:IPerson = {
  name:'jack',
  age:19,
  sayHi(){},
}
```

#### 接口与类型别名的对比
相同点：为对象指定类型

不同点：

+ 接口：只能为对象指定类型
+ 类型别名：可以为任意类型指定别名

```typescript
//类型别名
type IPerson = {
  name:string
  age:number
  sayHi:()=>void
}
//使用
let person:IPerson = {
  name:'jack',
  age:19,
  sayHi(){},
}
```

#### 继承
如果两个接口之间有相同的属性或方法，<font style="color:#ED740C;">可以将公共属性或方法抽离出来，同过继承来实现继承复用</font>。使用`extends`关键字实现。

```typescript
interface Point2D{
    x:number
    y:number
}
//Point3D 继承了Point2D中的属性或方法
interface Point3D extends Point2D{
    z:number
}
```

继承属性同名会发生覆盖情况，后续属性会发生覆盖

```
```



### 元组类型

场景：明确知道元素的个数和类型

元组类型是另一种类型的数组，它确切的知道包含多少个元素，以及特定索引对应的类型

```typescript
let position:[number,number] = [39.231,199.222] //长度只有2
let a:[number,string] = [23,"aaa"] //第二个必须为string
```

### 类型推论
场景：

+ 声明变量并初始化时(没初始化时，必须指定变量类型)
+ 决定函数返回值时

### 类型断言
由于TS类型太过宽泛，使用<font style="color:#ED740C;">类型断言</font>定位类型

技巧：使用console.dir()打印元素

```typescript
//方式一：
const alink = document.getElementById('link') as  HTMLAnchorElement //类型断言
//方式二：
const alink = <HTMLAnchorElement>document.getElementById('link') //不常用
```

### 字面量类型
使用模式：字面量类型配合联合类型一起使用

使用场景：用来**<font style="color:#ED740C;">表示一组明确的可选值列表</font>**

```typescript
let str1 = "hello TS" //str1是string类型
const str2 = "hello TS" //str2是"hello TS",是一个字面量类型

function changeDirection(direction:'up'|'down'|'left'|'right'):void{
    console.log(direction);
    
}
//只能有四个选择
changeDirection('up');
```

### 枚举类型
枚举：定义一组命名常量。描述一个值，该值可以是这些命名常量中的一个

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right
}

function changeDirection(direction: Direction): void {
  console.log(direction);
}
changeDirection(Direction.Left);
```

注意：枚举成员是有值的，默认为从0开始自增的数值(数字枚举)

```typescript
//手动设定枚举的数值
enum Direction {
  Up = "wyj", //字符串枚举没有自增长行为，字符串枚举的每个成员必须有初始值
  Down = 10,
  Left = 10,
  Right //默认 为11 Left自增
}

function changeDirection(direction: Direction): void {
  console.log(direction);
}
changeDirection(Direction.Right);
//编译过来的JS带码

```

枚举会被编译为JS代码

```typescript
var Direction;
(function (Direction) {
    Direction["Up"] = "wyj";
    Direction[Direction["Down"] = 10] = "Down";
    Direction[Direction["Left"] = 10] = "Left";
    Direction[Direction["Right"] = 11] = "Right";
})(Direction || (Direction = {})); //自调用函数
```

**<font style="color:#ED740C;">推荐字面量+联合类型表示一组明确的可选值列表</font>**

### any类型(不推荐使用)
使用any类型时，可以对值进行任意操作。

```typescript
let obj: any = { name: "wyj", age: 9 };
console.log(obj.name);
```

### typeof操作符
使用typeof在类型上下文检查。只能用来查询变量和属性的类型，不能用于查询函数的类型。

```typescript
let p = { x: 1, y: 3 };
function formatPoint(point: {x:number,y:number}): void {
    console.log(typeof point);
}
// 等价
function formatPoint(point: typeof p): void {
    console.log(typeof point);
}
formatPoint(p)

```

## 高级类型
### class类
```typescript
//创建类
class Person {}
//创建实例
const p: Person = new Person();

```

#### 属性初始化
```typescript
class Person {
  age: number; //没有初始值 需要指明类型
  gender = "male"; //初始化后进行类型推断
}
//创建实例
const p: Person = new Person();

console.log(p.gender);
```

#### 构造方法
```typescript
//创建类
class Person {
  age: number; //没有初始值 需要指明类型
  gender = "male"; //初始化后进行类型推断
  //构造函数
  constructor(age: number, gender: string) {
    this.age = age;
    this.gender = gender;
  }
}
//创建实例
const p: Person = new Person(18, "female");

console.log(p.gender);
```

#### 实例方法
```typescript
//创建类
class Person {
  age: number //没有初始值 需要指明类型
  gender: string //初始化后进行类型推断
  //构造函数
  constructor(age: number, gender: string) {
    this.age = age;
    this.gender = gender;
  }
  //实例方法
  scale(n:number){
    return this.age*=n
  }
}
//创建实例
const p: Person = new Person(18, "female");

console.log(p.gender);

console.log(p.scale(3));
```

#### 继承
方式：

+ extends：实现父类继承
+ implements：实现接口

```typescript
class Animal {
  gender: string;
  constructor(gender: string) {
    this.gender = gender;
  }
  move() {
    console.log("走路");
  }
}
//继承
class Dog extends Animal {
  name: string;
  constructor(name: string, gender: string) {
    super(gender);
    this.name = name;
  }
  bark() {
    console.log("狗叫");
  }
}
const dog: Dog = new Dog("Tom", "M");
dog.move();
dog.bark();
```

```typescript
// 接口约束
interface Person{
    name:string
    Eat():void
    Sing():void
}
class Man implements Person{
    name = "jack"

    Eat(): void {
        console.log(`${this.name}吃饭`);
    }
    Sing(): void {
       console.log(`${this.name}唱歌`);
       
    }
} 

const man:Man = new Man();
man.Eat()
man.Sing()
```

#### 类可见性修饰符
可见性修饰符：

1. public：表示共有的、公开的，公有成员可以被任何地方访问，默认可见性。
2. protected：表示收到保护的，仅对器声明所在类和子类中可见(实例对象无法访问)。
3. private：表示私有的，只在当前类中可见，**<font style="color:#ED740C;">对实例对象以及子类不可见</font>**。
4. readonly：表示只读，用来放置在钩爪函数之外对属性赋值，只能修饰属性，不能修饰方法。接口或{}表示对象是也可以使用readonly.

### 类型兼容性
类型兼容性：

+ 结构化类型系统(TS**<font style="color:#ECAA04;">只会检查两个对象的结构是否相同</font>**，属性相同和属性的类型也相同)，
+ 标明类型系统(java).

#### 对象
对于对象类型来说，y的成员至少与x相同，则x兼容y(**<font style="color:#ED740C;">成员多的可以赋值给少的</font>**)

```typescript
class Point2D{
    x:number
    y:number
}
class Point4D{
    x:number
    y:number
    z:number
    t:number
}
const p:Point2D = new Point4D()
//不行
const t:Point4D = new Point2D()
```

#### 接口
接口之间的兼容性类似于class。并且，class和interface之间也可以兼容。

```typescript
interface Point2D {
  x: number;
  y: number;
}
interface Point3D {
  x: number;
  y: number;
  z: number;
}
class Point4D {
  x: number;
  y: number;
  z: number;
  t: number;
}
let p1: Point2D
let p2: Point3D
const t: Point4D= new Point4D()
p1 = p2;
p2 = t;
//不行
p2 = p1;
```

#### 函数
函数兼容性需要考虑：1.参数个数；2.参数类型；3.返回值类型

+ 参数个数，参数多的兼容参数少的(**<font style="color:#ED740C;">参数少的可以赋值给多的</font>**)

```typescript

type F1 = (a: number) => void;
type F2 = (a: number, b: number) => void;
let f1: F1;
let f2: F2;
f2 = f1;
// 不行
f1 = f2;
```

+ 参数类型，相同位置的参数类型要相同(原始类型)或兼容

```typescript
type F1 = (a: number) => void;
type F2 = (a: number) => void;
let f1: F1
let f2: F2
f1 = f2
f2 = f1;

type F1 = (a: Point2D) => void;
type F2 = (a: Point3D) => void;
let f1: F1
let f2: F2
//不行 参数少的赋值参数多的 poin3d参数比point2d多
f1 = f2
//行
f2 = f1
```

+ 返回值，只关注返回值类型本省，返回值类型是原始类型相同可兼容，返回值类型是对象类型，这个时候成员多的可以赋值给成员少的

```typescript
type F1 = (a: Point2D) => { name: string };
type F2 = (a: Point2D) => { name: string; age: number };
let f1: F1;
let f2: F2;
f1 = f2;
//不行
f2 = f1;
```

### 交叉类型
交叉类型(&)：功能类似于接口继承，用于组合多个类型为一个类型(常用于对象类型)

```typescript
interface Person{
    name:string
}
interface Contact{
    phone:string
}
// 组合类型
type PersonDetail = Person&Contact
//同时具备两个属性
let detail:PersonDetail = {
    name:'wyj',
    phone:'123456'
}
```

#### 交叉类型和接口继承的对比
|  | 相同点 | 不同点 |
| :---: | :---: | --- |
| 交叉类型(&) | 都可以实现类型的组合 | 对于同名属性，处理类型冲突的方式不同(不会报错) |
| 接口继承(extends) | | 对于同名属性，处理类型冲突的方式不同(会报错) |


### 泛型和keyof
**<font style="color:#ED740C;">泛型</font>**是可以在**<font style="color:#ED740C;">保证类型安全</font>**前提下，让**<font style="color:#ED740C;">函数等于多种类型一起工作</font>**，从而**<font style="color:#ED740C;">实现复用</font>**，常用于：**<font style="color:#ED740C;">函数、接口、class中</font>**。

```typescript
//泛型函数
//1.函数名称<具体类型>
function id<Type>(value:Type):Type{
  return value;
}
let num = id(10) // 省略<类型>来简化泛型函数的调用
const num = id<number>(10) //指定number
const name = id<string>('name') // 指定string 
```

#### 泛型约束
**泛型约束**：默认情况下，泛型函数的类型变量Type可以代表多个类型，**<font style="color:#ED740C;">这导致无法访问任何属性</font>**。(用于收缩类型)

```typescript
//方式1：参数约束为数组 收缩类型 使得元素可以又相关的方法
function id<Type>(value:Type[]):Type[]{
  
}
//方式2：
interface ILength{length:number} 
function id<Type extends ILength>(value:Type):Type{
    console.log(value.length);
}
const p = id({length:10,name:'wyj'}) //extends满足后序的约束 有length属性

//泛型的类型变量有多个
// 1.两个类型变量用 (,)隔开
// 2.keyof关键字姐搜一个对象类型，生成其键的名称(可能是字符串或数字)的联合类型
// 对象 对象的键
function getProp<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let person = { name: "jack", age: 18 };
getProp(person, "name");
// 'name'|'age'

```

#### 泛型接口
```typescript
//泛型接口
//泛型接口
interface IdFunc<Type> {
  id: (value: Type) => Type;
  ids: () => Type[];
}
let obj: IdFunc<number> = {
  id(value) {
    return value;
  },
  ids() {
    return [1, 3, 5];
  }
};
//数组就是一个典型的泛型接口
```

#### 泛型类
```typescript
//泛型类
class GenericNumber<NumType> {
  defaultValue: NumType;
  constructor(value:NumType){
    this.defaultValue = value
  }
  add: (x: NumType, y: NumType) => NumType = (x, y) => {
    return x;
  };
}
const myNum = new GenericNumber(100); //构造函数会 自动推断
myNum.add(10,10)
```

#### 泛型工具类型
```typescript
//1.Partial<Type>：用于构造一个类型，将Type的所有属性设置为可选
interface Props{
    id:string
    children:number[]
}
type PartialProps = Partial<Props>
let p1:PartialProps = {id:'1'} //可选版本
let p2:Props = {} //会报错

//2.readonly<Type>用来构造一个类型，将Type的所有属性都设置为readonly(只读)
interface Props{
    id:string
    children:number[]
}
type ReadonlyProps = Readonly<Props>
let p3:ReadonlyProps = {id:'1',children:[1,2,3]}
p3.id ='2' //会报错 因为只可读 不可修改

//3.Pick<Type,Keys>从Type中选择一组属性来构建新类型
interface Props{
    id:string
    title:string
    children:number[]
}
type PickProps = Pick<Props,'id'|'title'> //选择两个属性
let p:PickProps = {id:'1',title:'w'}

//4.Record<Keys,Type>构造一个对象类型,属性键为Keys,属性类型为Type
//{
// a:string[],
// b:string[],
// c:string[],
//}
type RecordProps = Record<"a" | "b" | "c", string[]>;
let t: RecordProps = {
    a:['a'],
    b:['b'],
    c:['c']
}

```

### 索引签名类型
使用场景：**<font style="color:#ED740C;">当无法确定对象中有哪些属性</font>**(或者说对象中可以出现任意多个属性)，此时，就用到索引签名类型。

```typescript
interface AnyObject {
  [key: number]: number; //key：占位符 [占位符: 索引] 索引的类型
}
let Obj: AnyObject = {
  123: 123,
};


//模拟数组
interface Array<Type> {
  [n: number]: Type;
}
let a: Array<number> = [1, 2, 3, 4, 5];
let str: Array<string> = ["a", "w", "e"];
```

### 映射类型
映射类型：基于旧类型创建新类型(对象类型)，只能在类型别名中使用，不能在接口中使用

```typescript
type PropsKeys = "x" | "y" | "z";
//映射类型
type type2 = { [Key in PropsKeys]: number };


//使用keyof 根据对象类型创建新类型
type PropsKeys = { x: number; y: number; z: number };
type propsNew = { [key in keyof PropsKeys]: string };

//  Partial也是基于这种方式实现的
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

### 索引查询类型
```typescript
type PropsKeys = { x: number; y: number; z: number };
type typeA = PropsKeys['x'] //索引查询

//同时查询多个索引
type PropsKeys = { x: number; y: string; z: boolean };
type n = PropsKeys['x'|'y'] //查询多个属性
type n = PropsKeys[keyof PropsKeys] //拿到所有的属性
```

### 类型声明文件
TS中有两种文件类型：1. .ts文件 2. .d.ts文件

+ .ts文件：
    - **<font style="color:#ED740C;">既包含类型信息又可执行代码</font>**
    - 可以被编译为.js文件，然后，执行代码
    - 用途：编写程序的地方
+ .d.ts文件：
    - **<font style="color:#ED740C;">只包含类型信息的类型声明文件</font>**
    - **<font style="color:#ED740C;">不会生成.js文件</font>**，仅用于提供类型信息
    - 用途：为.js提供类型信息

```typescript
//类型申明文件 只提供类型 不能写可执行代码
```

#### 说明
类型声明文件的使用方式：

1. 使用已有的类型声明文件(用)
2. 创建自己的类型声明文件(自己写)

内置类型声明文件：TS为JS运行时可用的所有标准化内置API都提供了声明文件。

第三方库的类型声明文件：

+ 库自带类型声明文件
+ 由DefinitelyTyped提供(DefinitelyTyped是一个github仓库，用来提供高质量TypeScript类型声明，以@types/*)

#### 创建自己的类型声明文件
情况：

1. 项目内共享类型：多个.ts文件中都用到一个类型

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1737101930363-4a8748b0-1914-4c12-a896-c5eea9337762.png)

2. 为已有的JS文件提供类型说明
    1. 在JS项目迁移到TS项目时，为了让已有的.js文件由类型声明
    2. 称为库作者，创建库给其他人使用

## 在React中使用TS
react-app-env.d.ts：React项目默认的类型声明文件

**三斜线指令**：指定依赖的其他类型声明文件，types表示依赖的类型声明文件包的名称。

```typescript
///<reference types='react-scripts'/>
```

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1737104110565-f2befc81-4eb6-47f8-b426-b65d8291227a.png)

+ tsconfig.json 文件所在目录为项目根目录(与 package.json 同级)
+ tsconfig.json 可以自动生成，命令:tsc--init.

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1737105364839-d57b70d6-a039-4b34-b382-794e5668c7e3.png)

### 函数组件
```typescript
import { FC } from "react";
type Props = { name: string; age?: number };
//写法1
const Hello: FC<Props> = ({ name, age }) => {
  return <div>这是函数{name}组件</div>;
};
const Hello2 = ({ name, age }: Props) => {
  return <div>这是函数{name}组件</div>;
};
```

### 常用属性
函数属性默认值

```typescript
import { FC } from "react";
type Props = { name: string; age?: number };
const Hello: FC<Props> = ({ name, age }) => {
  return <div>这是函数{name}组件</div>;
};
//设置默认属性
Hello.defaultProps = {age:18}

//简化
const Hello = ({ name, age:18 }:Props) => {
  return <div>这是函数{name}组件</div>;
};
```

事件绑定和事件对象

```typescript

```

