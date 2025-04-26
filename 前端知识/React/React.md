React由Meta公司研发，是一个用于构建web和原生交互界面的库。

**优势：**

+ 与传统基于DOM开发：组件化的开发方式、不错的性能
+ 相较于其他前端框架：丰富的生态、跨平台支持

## 开发环境的搭建
create-react-app：是一个快速创建React开发环境的工具，底层由Webpac构建，封装了配置细节，开箱即用。

```html
npx create-react-app react-basic
1.npx：node.js工具命令，查找并执行后续的
2.create-react-app：核心包，用于创建React项目
3.react-basic：react项目的名称(自定义)
```

## JSX
概念：JSX是JS和XML的缩写，表示在JS代码中编写HTML模板结构，它是React中编写UI模板的方式。

优势：

+ HTML的声明式模板写法
+ JS的可编程能力
### JSX的本质和流程
**JSX的本质**：JSX并不是标准的JS语法，它是**JS的语法扩展**，浏览器本身不能识别，需要**通过解析工具做解析后才能在浏览器中运行**。JSX虽然看起来很像HTML，但在**底层其实被转化为了 JavaScript 对象**，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个JSX标签必须要用一个父元素或者Fragment来包裹。

**JSX的转换的流程**：



### JSX规则
#### 只能返回一个根元素
如果想要在一个组件包含多个元素，需要**使用一个父标签把他们包裹起来**。


```jsx
<div>
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>

or

<> 
  <h1>海蒂·拉玛的待办事项</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

#### 标签必须闭合
<font style="color:rgb(255, 100,50);">**JSX 要求标签必须正确闭合(自闭和或对标签闭合)**。</font>

```jsx
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
      <li>发明一种新式交通信号灯</li>
      <li>排练一个电影场景</li>
      <li>改进频谱技术</li>
  </ul>
</>
```

#### 使用驼峰式命名法给大部分属性命名
<font style="color:rgb(255, 100, 47);">在React中，大部分HTML和SVG属性都用驼峰式命名法表示。例如，需要用</font>`strokeWidth`<font style="color:rgb(255, 139, 47);"> 代替</font>`stroke-width`<font style="color:rgb(255, 139, 47);">。由于</font>`class`<font style="color:rgb(255, 139, 47);">是一个保留字，所以在 React 中需要用 </font>`className`<font style="color:rgb(255, 139, 47);"> 来代替。</font>

### JSX中使用JS表达式
在JSX中可以通过**大括号语法**识别JS中的**表达式**，比如常见的变量、函数调用、方法调用等等。

+ 使用引号传递字符串
+ 使用JS变量
+ 函数调用和方法调用
+ 使用JS对象

```jsx
const data = 10;
const style = {
  color:'red',
  backgroundColor:'blue'
}
function getName(){
  return "wangyujie";
}
function App() {
  return (
    <div className="App">
      {/* 使用引号传递字符串 */}
      <div>{"this is react"}</div>
      {/* 使用JS变量 */}
      <div>{data}</div>
      {/* 使用函数调用 */}
      <div>{getName()}</div>
      {/* 方法调用 */}
      <div>{new Date().getDate()}</div>
      {/* 使用JS对象 */}
      <div style={style}>{24}</div>
    </div>
  );
}
```

### JSX中实现列表渲染
语法：在`JSX`中可以使用原生JS中的**`map`方法**遍历渲染列表

注意：加上一个独一无二的值，字符串或者`number`，`react`框架内部使用用于提升列表的更新性能。

```jsx
const list = [
  { id: 1001, name: "Vue" },
  { id: 1002, name: "React" },
  { id: 1003, name: "Angular" }
]
function App() {
  return (
    <div className="App">
      {/*  实现列表渲染  */}
      {/* 核心方法：map方法啊 */}
      {/* key的作用：加速React的渲染速度，加上一个独一无二的key值，必须是Number或者字符串 */}
      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}
```

### JSX中实现条件渲染
语法：在React中，可以通过**逻辑与运算符`&&`**、**三元表达式(`?:`)、复杂条件渲染**实现基础的条件渲染。

```jsx
const isLogin = false;
const articleType = 0 //0 1 2 
// 定义函数 根据文章类型返回不同的JSX模板
// 复杂条件渲染
function getArticle(){
  if(articleType===0){
    return <div>我是无图文章</div>
  }else if(articleType===1){
    return <div>我是单图文章</div>
  }else{
    return <div>我是3图文章</div>
  }
}
function App() {
  return (
    <div className="App">
      {/* 逻辑与&&:isLogin && <span>this is span</span> isLogin为True则显示后面内容,反之则不显示后面内容 */}
      {
        isLogin && <span>this is span</span>
      }
      <br></br>
      {/* 三元运算符:针对两种情况 */}
      {isLogin?<span>jack</span>:<span>wangyujie</span>}
      {/* 复杂条件渲染 */}
      {getArticle()}
    </div>
  );
}
```

### JSX实现基础事件绑定
```jsx
function App() {
  const handClick = ()=>{
    console.log("被点击了");
  }

  return (
    <div className="App">
      {/* 基础的事件函数绑定*/}
     <button onClick={handClick}>
      click me
     </button>
    </div>
  );
}
```

#### 事件参数的获取
```jsx
function App() {
  //e:事件参数
  const handClick = (e)=>{
    console.log("被点击了",e);
  }

  return (
    <div className="App">
      {/* 基础的事件函数绑定*/}
     <button onClick={handClick}>
      click me
     </button>
    </div>
  );
}
```

#### 传递自定义参数
语法：**事件绑定的位置改造为箭头函数的写法**，在执行handClick实际业务处理函数时候传递实参。

注：这里是一个箭头函数的写法，而**不是直接使用引用**。

```jsx
function App() {
  //e:事件参数
  const handClick = (name)=>{
    console.log("被点击了",name);
  }

  return (
    <div className="App">
      {/* 传递自定义参数 */}
     <button onClick={()=>handClick('jack')}>
      click me
     </button>
    </div>
  );
}

```

#### 同时传递自定义参数和事件参数
语法：在**事件绑定的位置传递事件实参e和自定义参数**，handClick中声明形参，注意顺序对应。

```jsx
function App() {
  //name:自定义参数 e:事件参数
  const handClick = (name,e)=>{
    console.log("被点击了",name,e);
  }

  return (
    <div className="App">
      {/* 传递自定义参数和事件对象 */}
     <button onClick={(e)=>handClick('jack',e)}>
      click me
     </button>
    </div>
  );
}
```

## 组件
概念：一个组件就是用户界面的一部分，它可以有自己的逻辑和外观，组件之间可以互相嵌套，也可以重复使用多次。![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735043244942-bf765a3f-57e1-4609-abf1-799425739258.png)

在React中，一个**组件就是首字母大写**的**函数**，内部存放了组件的逻辑和UI，渲染组件**只需要把组件当成标签来写**。

注意：

1. 组件的首字母必须大写
2. 组件中可以渲染其他组件，但不能在组件中定义组件。

```jsx
/* 定义组件 */
function Button(){
  return <button>click me</button>
}
// 箭头函数也可以定义组件
/* const Button = ()=>{
  return <button>click me</button>
} */
function App() {
  //name:自定义参数 e:事件参数
  return (
    /* 使用组件 */
    <div className="App">
      {/* 自闭和 */}
      <Button/>
      {/* 成对标签 */}
     <Button></Button>
    </div>
  );
}
```

### 默认导出与具名导出
特点：

+ 一个文件有<font style="color:#ECAA04;">且仅有一个默认导出</font>，可以<font style="color:#ED740C;">有任意多个具名导出</font>。
+ 使用默认导入时，import语句后面可以任意命名。
+ 使用具名导入时，导入和导出名称必须一致。
+ 文件中仅包含一个组件时，人们会选择默认导出，而当文件中包含多个组件或某个值需要导出时，则会选择具名导出。

```jsx
//默认导出语句
export default function Button(){}
//默认导入语句
import Button from './Button.js';
//具名导出语句
export function Button(){}
//具名导入语句
import {Button} from './Button.js'
```

### 组件基础样式控制
方式：

1. 行内样式(不推荐)
2. class类名控制

```jsx
// 1.行内样式控制
<div style={style}>{24}</div>

```

```jsx
// 1.定义css样式文件,导入到js文件中去
// 2.导入JSX中、
import './index.css'
function App() {
  return(
    /* 类名导入对应的样式 */
    <span className='foo'>this is css</span>
  ) 
}
```

### 将props传递给组件
<font style="color:rgb(35, 39, 47);">React 组件使用 </font>_**<font style="color:rgb(35, 39, 47);">props</font>**_**<font style="color:rgb(35, 39, 47);"> </font>**<font style="color:rgb(35, 39, 47);">来</font>**<font style="color:rgb(35, 39, 47);">互相通信</font>**<font style="color:rgb(35, 39, 47);">。每个父组件都可以提供props给它的子组件，从而将一些信息传递给它。</font>

<font style="color:rgb(35, 39, 47);">props：传递给JSX标签的信息。可以传递</font>**<font style="color:rgb(35, 39, 47);">任意的数据</font>**<font style="color:rgb(35, 39, 47);">(数字、字符串、布尔值、数组、对象、函数、JSX)，子组件</font>**<font style="color:rgb(35, 39, 47);">只能读取</font>**<font style="color:rgb(35, 39, 47);">props中的数据，不能直接修改。</font>

#### <font style="color:rgb(35, 39, 47);">1.将props传递给子组件</font>
```jsx
export default function Father() {
    //将props传递给Son,传递了两个props：person(一个对象) size(一个数字)
    return (
        <Son
            person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
            size={100}
        />
    );
}
```

#### 2.在子组件中读取props
```jsx
//在子组件读取props size =100：指定默认值，仅在却扫size或者size={undeifined}时生效
function Son({person,size=100}) {
    return (
        <img
            src={getImageUrl(person.imageId)}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}

function Son(props){
  let person = props.person;
  let size = props.size;
  //...
}
```

#### 嵌套标签(重要)
将自己定义的标签作为props嵌套到另外一个自定义标签

```jsx
import { getImageUrl } from "./utils";
//在子组件读取props
function Son({ person, size }) {
    return (
        <img
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}
function Card({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}
export default function Father() {
    return (
        <Card children={
            //将自定义的组件作为props进行传递 可以利用其他组件来填充父亲组件
            <Son person={{
                name: 'Katsuko Saruhashi',
                imageId: 'YfeOqp2'
            }}
                size={50}
            />
        }
        />
    );
}
```

#### 传递方式
##### 子传父(重要)
![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735125785374-82ce5d29-578a-47bc-a91f-f1f214f51436.png)

```jsx
function Son({ props }) {
    const info ='这是子组件'
    return (
        <>
            <img
                src={getImageUrl(props.person)}
                alt={props.person.name}
                width={props.size}
                height={props.size}
            />
             {/* 子组件传递数据到父组件 */}
            <button onClick={()=>props.handle(info)}>点击</button>
        </>
    );
}
export default function Father() {
    //通过调用父组件的函数进行传递
    const handleClick = (data) => {
        console.log('子组件传递到父组件',data);
    }
    //将props传递给Son,传递了两个props：person(一个对象) size(一个数字)
    return (
        <Card>
            <Son props={{
                person: {
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }, 
                size: 50,
                handle: handleClick
            }}
            />
        </Card>
    );
}
```

##### 兄弟组件通信
![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735126220319-56237ea0-6b5e-4bc1-b32e-3d19020f0772.png)

```jsx
function Card(props) {
  // 子组件
  const style = {
    width: '50px',
    height: '50px',
    backgroundColor: 'red'
  }
  // 受控组件绑定
  const [sendContent, setSendContent] = useState('');
  return (
    <div className={props.className} style={{ width: '200px', height: '220px', backgroundColor: 'gray', padding: '10px', margin: '10px' }}>
      <div className="avter" style={style}>
        <div className="title">
          <p>{props.name}</p>
        </div>
      </div>

      <div className="info" >
        <p>发送的消息:{sendContent}</p>
        <p>接受的消息:{props.accept}</p>
      </div>
      <input type="text" value={sendContent} onChange={(e) => setSendContent(e.target.value)} placeholder="请输入内容"></input>
      <button onClick={(e) => props.click(sendContent,e)}>send</button>
    </div>
  );
}

function Father() {
  // 这是父亲组件
  const [contentA, setContentA] = useState('');
  const [contentB, setContentB] = useState('');
  const handleClick = (data,e) => {
    //拿到传递的参数和事件参数 利用事件参数来获取点击的组件
    if(e.target.parentElement.classList.contains('A')){
      //保证 点击的是组件A
      setContentB(data);
    }
    if(e.target.parentElement.classList.contains('B')){
      //保证 点击的是组件B
      setContentA(data);
    }
  }
  return (
    <>  {/* 兄弟组件进行通信 通过子传给父组件 利用函数来进行通信 */}
      <Card className={'A'} name={'A'} accept={contentA} click={handleClick} />
      <Card className={'B'} name={'B'} accept={contentB} click={handleClick} />
    </>
  );
}
```

##### 跨层级组件通信
![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735126308106-11f397cd-8c03-4610-bf1f-bfb3b4ad72f7.png)

```jsx
function Card(props) {
    //子组件
    const style = {
        width: '50px',
        height: '50px',
        backgroundColor: 'red'
    }
    const [sendContent, setSendContent] = useState('');
    //子组件进行上下文数据的读取
    const msg = useContext(Ctx);
    return (
        <div className={props.className} style={{ width: '200px', height: '320px', backgroundColor: 'gray', padding: '10px', margin: '10px' }}>
            <div className="avter" style={style}>
                <div className="title">
                    <p>{props.name}</p>
                </div>
            </div>

            <div className="info" >
                {/* 将数据放置到对应的组件 */}
                <p>Message:{msg}</p>
                <p>发送的消息:{sendContent}</p>
                <p>接受的消息:{props.accept}</p>
            </div>
            <input type="text" value={sendContent} onChange={(e) => setSendContent(e.target.value)} placeholder="请输入内容"></input>
            <button onClick={(e) => props.click(sendContent, e)}>send</button>
        </div>
    );
}
//创建上下文对象
const Ctx = new createContext();
function Father() {
    // 这是父亲组件
    const [contentA, setContentA] = useState('');
    const [contentB, setContentB] = useState('');
    const msg = "完成通信";
    const handleClick = (data, e) => {
        if (e.target.parentElement.classList.contains('A')) {
            //保证 点击的是组件A
            setContentB(data);
        }
        if (e.target.parentElement.classList.contains('B')) {
            //保证 点击的是组件B
            setContentA(data);
        }
    }
    return (
        <>  {/* 兄弟组件进行通信 通过子传给父组件 利用函数来进行通信 */}
            {/* 利用上下文provider包裹组件，为里面的每一个逐渐指定一个上下文的值value */}
            <Ctx.Provider value={msg}>
                <Card className={'A'} name={'A'} accept={contentA} click={handleClick} />
                <Card className={'B'} name={'B'} accept={contentB} click={handleClick} />
            </Ctx.Provider>
        </>
    );
}
```

#### props随时间变化
一个组件可能会随着时间的推移收到不同的props。<font style="color:rgb(35, 39, 47);">props是</font>[**<font style="color:rgb(35, 39, 47);">不可变的</font>**](https://en.wikipedia.org/wiki/Immutable_object)<font style="color:rgb(35, 39, 47);">。当一个组件需要改变它的props（例如，响应用户交互或新数据）时，它不得不“请求”它的父组件传递</font>**<font style="color:rgb(35, 39, 47);">不同的props</font>**<font style="color:rgb(35, 39, 47);"> —— 一个新对象！它的旧props 被丢弃，最终JavaScript引擎将回收它们占用的内存。</font>**<font style="color:rgb(35, 39, 47);">不要尝试“更改 props”。</font>**<font style="color:rgb(35, 39, 47);"> 当你需要响应用户输入（例如更改所选颜色）时，你可以“设置 state”。</font>

#### <font style="color:rgb(35, 39, 47);">组件函数的纯粹(重要)</font>
**<font style="color:rgb(35, 39, 47);">React 假设你编写的所有组件都是纯函数</font>**<font style="color:rgb(35, 39, 47);">。也就是说，对于相同的输入，你所编写的 React 组件必须总是返回相同的 JSX。组件只负责渲染而不负责改变传入的数据。</font>

<font style="color:rgb(35, 39, 47);">一个组件必须是纯粹的，就意味着：</font>

+ **<font style="color:rgb(35, 39, 47);">只负责自己的任务。</font>**<font style="color:rgb(35, 39, 47);"> 它不会更改在该函数调用前就已存在的对象或变量。</font>
+ **<font style="color:rgb(35, 39, 47);">输入相同，则输出相同。</font>**<font style="color:rgb(35, 39, 47);"> 给定相同的输入，组件应该总是返回相同的 JSX。</font>

## <font style="color:rgb(35, 39, 47);">useState</font>
useState是一个React Hook(函数)，它允许我们向组件添加一个**状态变量**，从而控制影响组件的渲染结果。

本质：和普通JS变量不同的是**，状态变量一旦发生变化组件的试图UI也会跟着变化(数据驱动视图)**。![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735043752629-1953a800-b5b5-46f1-98ee-1ba9b0dd3ca7.png)

```jsx
import { useState } from 'react'
function App() {
  // 1.调用useState添加一个状态变量
  // count:状态变量
  // setCount:修改状态变量的函数
  const [count, setCount] = useState(0);
  // 2.点击事件回调
  const handClick = () => {
    /* 作用：
        1.用传入的新值修改count
        2.从刑使用新的count渲染UI
    */
    setCount(count + 1);
  }
  return (
    <div>
      <button onClick={handClick}>{count}</button>
    </div>
  );
}

```

### 修改状态的规则
在Raect中，useState以及其他以'use'开头的函数都被称为Hook,这种函数**只在React渲染时有效**。状态不可变，在React中状态被认为是只读的，状态只能替换而不能修改它。

特点：

+ **<font style="color:rgb(35, 39, 47);">如果你渲染同一个组件两次，每个副本都会有完全隔离的state</font>**
+ **<font style="color:rgb(35, 39, 47);">state 完全私有于声明它的组件</font>**<font style="color:rgb(35, 39, 47);">。父组件无法更改它。</font>

#### 修改对象状态
<font style="color:rgb(35, 39, 47);">每次你的组件渲染时，</font>`useState`<font style="color:rgb(35, 39, 47);"> 都会给你一个包含两个值的数组：</font>

1. **<font style="color:rgb(35, 39, 47);">state 变量</font>**<font style="color:rgb(35, 39, 47);"> (</font>`index`<font style="color:rgb(35, 39, 47);">) 会保存上次渲染的值。</font>
2. **<font style="color:rgb(35, 39, 47);">state setter 函数</font>**<font style="color:rgb(35, 39, 47);"> (</font>`setIndex`<font style="color:rgb(35, 39, 47);">) 可以更新 state 变量并触发 React 重新渲染组件。</font>

```jsx
import { useState } from 'react'
function App() {
  // 1.调用useState添加一个状态变量
  const [user,setUser] = useState({
    name:'jack'
  })
  // 2.点击事件回调
  const handClick = () => {
    /* 作用：
        1.用传入的新值修改count
        2.从刑使用新的count渲染UI
    */
   setUser({
    ...user,
    name:'wangyujie'
   }) //可以修改对应的视图中的数据
   // user.name = 'wangyujie';//不会修改视图中的数据
   console.log(user.name);
  }
  return (
    <div>
      <button onClick={handClick}>{user.name}</button>
    </div>
  );
}
```

:::warning
查看官方文档对于数组如何设置装填变量

:::

### 受控表单绑定
概念：使用React组件的状态(useState)控制表单的状态

![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735114906530-d759f5c2-3289-4a27-9020-6d3cfcf44634.png)

```jsx
function Inputform(){
    const [value,setValue] = useState('');
    return (
        <>
        <form>
            <input type = 'text' value={value} onChange={(e)=>setValue(e.target.value)}/>
        </form>
        </>
    );
}
```

## 渲染和提交
### 触发一次渲染
有两种原因导致组件的渲染：

+ 组件的初次渲染
+ 组件(或者其祖先之一)的状态发生变化

#### 初次渲染
<font style="color:rgb(35, 39, 47);">当应用启动时，会触发初次渲染。框架和沙箱有时会隐藏这部分代码，但它是通过</font>**<font style="color:rgb(35, 39, 47);">调用createRoot方法并传入目标DOM节点</font>**<font style="color:rgb(35, 39, 47);">，然后用你的组件调用 </font>`render`<font style="color:rgb(35, 39, 47);"> 函数完成的。</font>

```jsx
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

#### 状态更新时渲染
<font style="color:rgb(35, 39, 47);">一旦组件被初次渲染，你就可以</font>**<font style="color:rgb(35, 39, 47);">通过使用set函数更新其状态来触发之后的渲染</font>**<font style="color:rgb(35, 39, 47);">。更新组件的状态会自动将一次渲染送入队列。</font>

### <font style="color:rgb(35, 39, 47);">React渲染组件</font>
**<font style="color:rgb(35, 39, 47);">React在调用你的组件。</font>**

+ **<font style="color:rgb(35, 39, 47);">在进行初次渲染时,</font>**<font style="color:rgb(35, 39, 47);"> React会调用</font>**<font style="color:rgb(35, 39, 47);">根组件</font>**<font style="color:rgb(35, 39, 47);">。创建对应标签的DOM节点</font>
+ **<font style="color:rgb(35, 39, 47);">对于后续的渲染,</font>**<font style="color:rgb(35, 39, 47);"> React会调用</font>**<font style="color:rgb(35, 39, 47);">内部状态更新触发了渲染的函数组件</font>**<font style="color:rgb(35, 39, 47);">。</font>

<font style="color:rgb(35, 39, 47);">这个</font>**<font style="color:rgb(35, 39, 47);">过程是递归的</font>**<font style="color:rgb(35, 39, 47);">：如果更新后的组件会返回某个另外的组件，那么 React 接下来就会渲染 </font>_<font style="color:rgb(35, 39, 47);">那个</font>_<font style="color:rgb(35, 39, 47);"> 组件，而如果那个组件又返回了某个组件，那么 React 接下来就会渲染那个组件，以此类推。这个过程会持续下去，直到没有更多的嵌套组件并且 React 确切知道哪些东西应该显示到屏幕上为止。</font>

### <font style="color:rgb(35, 39, 47);">React将更改提交到DOM上</font>
<font style="color:rgb(35, 39, 47);">在渲染（调用）你的组件之后，React 将会修改DOM。</font>

+ **<font style="color:rgb(35, 39, 47);">对于初次渲染，</font>**<font style="color:rgb(35, 39, 47);"> React会使用 </font>[<font style="color:rgb(35, 39, 47);">appendChild()</font>](https://developer.mozilla.org/docs/Web/API/Node/appendChild)<font style="color:rgb(35, 39, 47);"> DOM API 将其创建的所有DOM节点放在屏幕上。</font>
+ **<font style="color:rgb(35, 39, 47);">对于重渲染，</font>**<font style="color:rgb(35, 39, 47);"> React将应用最少的必要操作（在渲染时计算！），以使得DOM与最新的渲染输出相互匹配。</font>

**<font style="color:rgb(35, 39, 47);">React仅在渲染之间存在差异时才会更改DOM节点。</font>**

### <font style="color:rgb(35, 39, 47);">游览器绘制</font>
<font style="color:rgb(35, 39, 47);">在渲染完成并且React更新DOM之后，浏览器就会重新绘制屏幕。</font>

## <font style="color:rgb(35, 39, 47);">脱围机制</font>
### useRef
#### 使用ref引用值
<font style="color:rgb(35, 39, 47);">希望组件“记住”某些信息，但又不想让这些信息触发新的渲染时，可以使用</font>**<font style="color:rgb(35, 39, 47);">ref</font>**<font style="color:rgb(35, 39, 47);">。与state一样，ref在重新渲染之间由React保留。但是，设置state会重新渲染组件，而更改ref不会。</font>**<font style="color:rgb(35, 39, 47);">useRef返回的一个对象</font>**<font style="color:rgb(35, 39, 47);">。</font>

<font style="color:rgb(35, 39, 47);">特点：</font>

+ <font style="color:rgb(35, 39, 47);">可以指向任何内容：字符串、对象，甚至是函数。</font>
+ <font style="color:rgb(35, 39, 47);">ref 是一个普通的 JavaScript 对象，具有</font>**<font style="color:rgb(35, 39, 47);">可以被读取和修改的 </font>**`**current**`**<font style="color:rgb(35, 39, 47);"> 属性</font>**

```jsx
import { useRef } from 'react';
//useRef返回的一个这样的对象：
//{
//	current:0
//}
const ref = useRef(0); 
ref.current :获取ref中的元素

```

#### 使用ref获取DOM
```jsx
//1.创建ref对象，绑定DOM标签
function Inputform(){
    const [value,setValue] = useState('');
    //创建ref对象
    const inputRef = useRef(null);
    return (
        <>
        <form>
            {/* 使用ref绑定DOM元素 */}
            <input type = 'text' ref={inputRef} value={value} onChange={(e)=>setValue(e.target.value)}/>
        </form>
        </>
    );
}
//2.使用ref.current获取DOM对象
ref.current.  方法/属性
```

#### ref和state的不同之处
| ref | state |
| --- | --- |
| useRef(initialValue)返回的是{current:initialValue} | useState(initialValue）返回state变量的当前值和一个state设置函数([value,setValue]) |
| <font style="color:rgb(35, 39, 47);">更改时不会触发重新渲染</font> | <font style="color:rgb(35, 39, 47);">更改时触发重新渲染</font> |
| <font style="color:rgb(35, 39, 47);">可变 —— 你可以在渲染过程之外修改和更新</font>`current`<font style="color:rgb(35, 39, 47);"> 的值。</font> | <font style="color:rgb(35, 39, 47);">不可变 —— 你必须使用state设置函数来修改 state变量，从而排队重新渲染。</font> |
| <font style="color:rgb(35, 39, 47);">你不应在渲染期间读取（或写入)</font>`current`<font style="color:rgb(35, 39, 47);">值。</font> | <font style="color:rgb(35, 39, 47);">可以随时读取state。但是，每次渲染都有自己不变的state。</font> |


#### ref的使用情况 
<font style="color:rgb(35, 39, 47);">组件需要“跳出” React并</font>**<font style="color:rgb(35, 39, 47);">与外部API通信</font>**<font style="color:rgb(35, 39, 47);">时，你会用到ref —— 通常是不会影响组件外观的浏览器API。</font>

比如：

+ 存储timeout ID(存储定时器的ID)
+ 存储和操作DOM元素
+ 存储不需要用来计算JSX的其他元素

#### React何时添加Ref
 React中，每次更新分为两个阶段：

+ <font style="color:rgb(35, 39, 47);">在</font>**<font style="color:rgb(35, 39, 47);">渲染</font>**<font style="color:rgb(35, 39, 47);">阶段，React调用你的组件来确定屏幕上应该显示什么。</font>
+ <font style="color:rgb(35, 39, 47);">在</font>**<font style="color:rgb(35, 39, 47);">提交</font>**<font style="color:rgb(35, 39, 47);">阶段，React把变更应用于DOM。</font>

<font style="color:rgb(35, 39, 47);">React在</font>**<font style="color:rgb(35, 39, 47);">提交阶段设置</font>**`ref.current`<font style="color:rgb(35, 39, 47);">。在更新DOM之前，React将受影响的</font>`ref.current`<font style="color:rgb(35, 39, 47);">值设置为</font>`null`<font style="color:rgb(35, 39, 47);">。更新DOM后，React立即将它们设置到相应的DOM节点。</font>

### useEffect
useEffect是一个React Hook函数，用于在React组件中创建**不是由事件引起而是由渲染本身引起的操作**，**可以分离渲染的逻辑**，比如发送AJAX请求，更改DOM等等。比如渲染结束后需要加载数据 ，这是需要发起axios请求的。

![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735127011363-b8af0828-4dc2-42d6-ab11-4bd4da26c574.png)

先渲染，后运行useEffect里面的代码。

#### 声明Effect
```jsx
import { useEffect } from 'react';
useEffect(()=>{},[依赖数组]);
```

#### 指定Effect的依赖项
默认情况，Effect会在**每次渲染后**运行。**<font style="color:rgb(35, 39, 47);">不能随意“选择”依赖项</font>**<font style="color:rgb(35, 39, 47);">。如果你指定的依赖项与React根据Effect 内部代码所推断出的依赖项不匹配，你将收到来自 linter 的错误提示。这有助于捕捉代码中的许多 bug。</font>![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735127118862-d2cbffea-e505-4b3b-ac17-b4d0a6b2b7ae.png)

#### 按需添加清理函数
![](https://cdn.nlark.com/yuque/0/2024/png/43189118/1735127518319-fe8add14-02eb-4223-ae3e-02028b47404e.png)

```jsx
useEffect(() => {
    const connection = createConnection();
    connection.connect();
    // 清理副作用的函数最常见的执行时机是在组件卸载时自动执行
    return () => {
      connection.disconnect();
    }
}, []);
```

### 无限循环问题
使用useEffect会产生无限循环问题

产生循环问题的情况：

1. 依赖项为`state`,每次改变就要刷新
2. 依赖项为对象，数组；这是由于Object.is是浅比较，只会比较地址而不会比较地址所指的的值
3. 依赖项为函数

举个例子：

```javascript
import { useState, useEffect} from "react";
import "./App.css";
function App() {
  const [count, setCount] = useState(0);
  //这种写法有效避免无限循环
  useEffect(() => {
    const timer = setInterval(() => {
      //这种方式更加安全
      //函数式更新 推荐 依赖count会有问题
      setCount(pre => pre + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
```

## UseMemo
作用：在每次**<font style="color:#ED740C;">重新渲染的时候能够缓存计算的结果</font>**<font style="color:#ED740C;">。消耗非常大的计算才会使用到这个钩子函数</font>

```jsx
//用法 useMemo(calculateValue, dependencies)
useMemo(()=>{
  //根据依赖项计算的得到的结果
},[依赖项])
//只有依赖项发生变化时才会更改缓存


function App(){
 const [count1,setCount1] = useState(0);
}
```

**参数：**

+ `calculateValue`<font style="color:rgb(35, 39, 47);">：要缓存计算值的函数。它应该</font>**<font style="color:#ECAA04;">是一个没有任何参数的纯函数</font>**<font style="color:rgb(35, 39, 47);">，并且可以返回任意类型。React 将会在首次渲染时调用该函数；在之后的渲染中，如果 </font>`dependencies`<font style="color:rgb(35, 39, 47);"> 没有发生变化，React 将直接返回相同值。否则，将会再次调用 </font>`calculateValue`<font style="color:rgb(35, 39, 47);"> 并返回最新结果，然后缓存该结果以便下次重复使用。</font>
+ `dependencies`<font style="color:rgb(35, 39, 47);">：所有在 </font>`calculateValue`<font style="color:rgb(35, 39, 47);"> 函数中使用的响应式变量组成的数组。响应式变量包括 props、state 和所有你直接在组件中定义的</font>**<font style="color:rgb(35, 39, 47);">变量</font>**<font style="color:rgb(35, 39, 47);">和</font>**<font style="color:rgb(35, 39, 47);">函数</font>**<font style="color:rgb(35, 39, 47);">。</font>

**返回值：**

<font style="color:rgb(35, 39, 47);">在初次渲染时，</font>`useMemo`<font style="color:rgb(35, 39, 47);"> 返回</font>**<font style="color:#ECAA04;">不带参数调用 </font>**`**<font style="color:#ECAA04;">calculateValue</font>**`**<font style="color:#ECAA04;"> 的结果</font>**<font style="color:rgb(35, 39, 47);">。</font>

<font style="color:rgb(35, 39, 47);">在接下来的渲染中，如果依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用 </font>`calculateValue`<font style="color:rgb(35, 39, 47);">，并返回最新结果。</font>

:::success
**<font style="color:rgb(35, 39, 47);">使用场景：</font>**

1. <font style="color:rgb(35, 39, 47);">跳过组件渲染，例如：父组件重新渲染子组件，可以将子组件缓存，则可以跳过组件渲染</font>
2. <font style="color:rgb(35, 39, 47);">防止频繁触发useEffect，缓存useEffect的依赖，防止频繁触发</font>
3. <font style="color:rgb(35, 39, 47);">记忆另一个Hook的依赖，</font>
4. <font style="color:rgb(35, 39, 47);">记忆一个函数</font>

:::

## React.memo
作用：允许组件**<font style="color:#ECAA04;">在Props没有改变的情况下跳过渲染，只有Props发生变化时才会重新渲染。</font>**

React组件默认的渲染机制：只要<font style="color:#ECAA04;background-color:#FFFFFF;">父组件重新渲染子组件就会重新渲染</font>。

```jsx
const MemoComponent = memo(function Son(){
  return (<div>这是子组件</div>)
})
```

### Props的比较机制
机制：在使用memo缓存组件之后，React会对每一个prop使用Object.is比较新值和老值，返回True，表示没有变化。

区别：

1. prop是简单类型，直接比较
2. prop是引用类型，React**<font style="color:#ECAA04;">只关心引用是否变化</font>**

## useCallback
作用：在组件多次重新渲染时缓存函数

```jsx
const memo = useCallback(()=>{},[])
```

## React.forwardRef
作用：使用Ref绑定父组件中的子组件的DOM元素

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736855533119-87f06c44-a64c-4d48-8cd7-b3bc1b407fcd.png)

```jsx
const Son = forwardRef((props,ref)=>{
  return (<div ref = {ref}> </div>)
})
```

## useInperativeHandle
作用：通过ref暴露子组件的方法

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736855873740-fb84205a-d997-4557-a956-e8cd76c89f86.png)

```jsx
const Son = forwardRef((props,ref)=>{
  const handle = ()=>{console.log("哈哈哈")}
  useInperativeHandle(ref,()=>{
    //暴露的子组件的方法 
    handle
  })
  return (<div ref = {ref}> </div>)
})
```

## <font style="color:rgb(35, 39, 47);">useReducer</font>
作用：和useState的作用类似，用来管理**<font style="color:#ED740C;">相对复杂的状态数据</font>**

### 基础用法
```javascript
1.定义一个reducer函数(根据不同的action返回不同的新状态)
function reducer(state,action){
  switch(action.type){
    case 'INC': return state+1
    case 'DEC': return state-1
    case 'SET': return action.payload
    default: return state
    }
}
2.在组件中调用useReducer,并传入reducer函数和状态的初始值
const [state,dispatch] = useReducer(reducer,0)

3.调用dispatch=>更改状态 使用这个状态更新UI 传递的是对象
dispatch({type:'INC',payload:100})
```

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736846877935-9255de1e-1898-4924-8861-87ffc1807cb9.png) 

## 自定义Hook(重要)
概念：自定义Hook是以**use打头的函数**，通过自定义Hook函数可以实现逻辑的封装和复用。**<font style="color:rgb(35, 39, 47);">Hook的名称必须以 </font>**`**use**`**<font style="color:rgb(35, 39, 47);">开头，然后紧跟一个大写字母</font>**<font style="color:rgb(35, 39, 47);">。</font>

<font style="color:rgb(35, 39, 47);">使用规则：</font>

+ <font style="color:rgb(35, 39, 47);">只能在组件中或者其他自定义Hook函数中调用</font>
+ <font style="color:rgb(35, 39, 47);">只能在组件的顶层调用，不能嵌套在if、for、其他函数中</font>

<font style="color:rgb(35, 39, 47);"></font>

## <font style="color:rgb(35, 39, 47);">Redux</font>
Redux是React最常用的集中状态管理工具，可以独立于框架运行。**<font style="color:rgb(28, 30, 33);">使用叫做 “action” 的事件来管理和更新应用状态的模式和工具库</font>**<font style="color:rgb(28, 30, 33);"> 。</font>

:::success
<font style="color:rgb(28, 30, 33);">为什么使用Redux?</font>

<font style="color:rgb(28, 30, 33);">Redux 帮你管理“全局”状态 - 应用程序中的很多组件都需要的状态。</font>

**<font style="color:rgb(28, 30, 33);">Redux 提供的模式和工具使你更容易理解应用程序中的状态何时、何地、为什么、state 如何被更新，以及当这些更改发生时你的应用程序逻辑将如何表现</font>**<font style="color:rgb(28, 30, 33);">. </font>

<font style="color:rgb(28, 30, 33);">什么时候应该使用 Redux？</font>

<font style="color:rgb(28, 30, 33);">在以下情况下使用 Redux：</font>

+ <font style="color:rgb(28, 30, 33);">应用中</font>**<font style="color:rgb(28, 30, 33);">有很多 state 在多个组件中需要使用</font>**
+ <font style="color:rgb(28, 30, 33);">应用 state 会随着时间的推移而</font>**<font style="color:rgb(28, 30, 33);">频繁更新</font>**
+ <font style="color:rgb(28, 30, 33);">更新 </font>**<font style="color:rgb(28, 30, 33);">state 的逻辑很复杂</font>**
+ <font style="color:rgb(28, 30, 33);">中型和大型代码量的应用，很多人协同开发</font>

:::

作用：通过集中管理的方式管理应用的状态。

### 状态管理
Redux定义了三个内容：

+ **<font style="color:rgb(28, 30, 33);">state</font>**<font style="color:rgb(28, 30, 33);">：驱动应用的真实数据源头</font>
+ **<font style="color:rgb(28, 30, 33);">view</font>**<font style="color:rgb(28, 30, 33);">：基于当前状态的视图声明性描述</font>
+ **<font style="color:rgb(28, 30, 33);">actions</font>**<font style="color:rgb(28, 30, 33);">：根据用户输入在应用程序中发生的事件，并触发状态更新</font>

过程：

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1735736383311-fd602594-a0e6-400b-b89c-f466eccfd9d8.png)

+ <font style="color:rgb(28, 30, 33);">用 state 来描述应用程序在特定时间点的状况</font>
+ <font style="color:rgb(28, 30, 33);">基于 state 来渲染出 View</font>
+ <font style="color:rgb(28, 30, 33);">当发生某些事情时（例如用户单击按钮），state 会根据发生的事情进行更新，生成新的 state</font>
+ <font style="color:rgb(28, 30, 33);">基于新的 state 重新渲染 View</font>

### 术语
#### Action
**<font style="color:rgb(28, 30, 33);">action</font>**<font style="color:rgb(28, 30, 33);"> 是一个具有 </font>`<font style="color:rgb(28, 30, 33);">type</font>`<font style="color:rgb(28, 30, 33);"> 字段的普通 JavaScript 对象。</font>**<font style="color:rgb(28, 30, 33);">你可以将 action 视为描述应用程序中发生了什么的事件</font>**<font style="color:rgb(28, 30, 33);">.</font>`<font style="color:rgb(28, 30, 33);">type</font>`<font style="color:rgb(28, 30, 33);"> 字段是一个字符串，给这个 action 一个描述性的名字，比如</font>`<font style="color:rgb(28, 30, 33);">"todos/todoAdded"</font>`<font style="color:rgb(28, 30, 33);">。action 对象可以有其他字段，其中包含有关发生的事情的附加信息。按照惯例，我们将该信息放在名为 </font>`<font style="color:rgb(28, 30, 33);">payload</font>`<font style="color:rgb(28, 30, 33);"> 的字段中。</font>

```javascript
const addTodoAction = {
  type:"todos/todoAdded",
  payload:'buy Milk'
}
```

#### Action Creator
**<font style="color:rgb(28, 30, 33);">action creator</font>**<font style="color:rgb(28, 30, 33);"> 是一个创建并返回一个 action 对象的函数。它的作用是让你不必每次都手动编写 action 对象：</font>

```javascript
const addTodo = text=>{
  return {
     type:"todos/todoAdded",
     payload:text
  }
}
```

#### Reducer
**<font style="color:rgb(28, 30, 33);">reducer</font>**<font style="color:rgb(28, 30, 33);"> 是一个函数，接收当前的 </font>`<font style="color:rgb(28, 30, 33);">state</font>`<font style="color:rgb(28, 30, 33);"> 和一个 </font>`<font style="color:rgb(28, 30, 33);">action</font>`<font style="color:rgb(28, 30, 33);"> 对象，必要时决定如何更新状态，并返回新状态。函数签名是：</font>`<font style="color:rgb(28, 30, 33);">(state, action) => newState</font>`<font style="color:rgb(28, 30, 33);">。 </font>**<font style="color:rgb(28, 30, 33);">你可以将 reducer </font>****<font style="color:#ECAA04;">视为一个事件监听器</font>****<font style="color:rgb(28, 30, 33);">，它根据接收到的 action（事件）类型处理事件。</font>**

:::success
<font style="color:rgb(28, 30, 33);">Reducer必需符合以下规则：</font>

+ <font style="color:rgb(28, 30, 33);">仅使用</font>`<font style="color:rgb(28, 30, 33);">state</font>`<font style="color:rgb(28, 30, 33);"> 和</font>`<font style="color:rgb(28, 30, 33);">action</font>`<font style="color:rgb(28, 30, 33);">参数计算新的状态值</font>
+ **<font style="color:#74B602;">禁止直接修改</font>**`**<font style="color:#74B602;">state</font>**`<font style="color:rgb(28, 30, 33);">。必须通过复制现有的</font>`<font style="color:rgb(28, 30, 33);">state</font>`<font style="color:rgb(28, 30, 33);">并对复制的值进行更改的方式来做 </font>_<font style="color:rgb(28, 30, 33);">不可变更新（immutable updates）</font>_<font style="color:rgb(28, 30, 33);">。</font>
+ **<font style="color:#ECAA04;">禁止任何异步逻辑、依赖随机值或导致其他“副作用”的代码</font>**

:::

```javascript
const inintailState = {value:0}
function counterReducer(state=inintialState,action){
  //检查reducer是否关心这个action
  if(action.type==='counter/increment'){
    //如果是，复制'state' 不可直接更改
    return {
      ...state,
      value:state.value+1     
    }
  }
  return state;
}
```

#### Store(存储State)
<font style="color:#ECAA04;">当前 Redux 应用的 state 存在于一个名为</font>**<font style="color:#ECAA04;">store</font>**<font style="color:#ECAA04;">的对象中</font><font style="color:rgb(28, 30, 33);">。store是通过传入一个reducer来创建的，并且有一个名为</font>`<font style="color:rgb(28, 30, 33);">getState</font>`<font style="color:rgb(28, 30, 33);">的方法，它返回当前状态值：</font>

```javascript
import {configureStore} from '@reduxjs/toolkit'
const store = configureStore({reducer:counterReducer})
```

#### Dispatch(更新State)
<font style="color:rgb(28, 30, 33);">Redux store有一个方法叫</font>`<font style="color:rgb(28, 30, 33);">dispatch</font>`<font style="color:rgb(28, 30, 33);">。</font>**<font style="color:rgb(28, 30, 33);">更新state的唯一方法是调用</font>**`**<font style="color:rgb(28, 30, 33);">store.dispatch()</font>**`**<font style="color:rgb(28, 30, 33);">并传入一个 </font>****<font style="color:#ECAA04;">action对象</font>**<font style="color:rgb(28, 30, 33);">。store将执行所有reducer函数并计算出更新后的state，调用</font>`<font style="color:rgb(28, 30, 33);">getState()</font>`<font style="color:rgb(28, 30, 33);"> 可以获取新 state。</font>**<font style="color:#ECAA04;">dispatch 一个action可以形象的理解为 "触发一个事件"</font>**<font style="color:#ECAA04;">。</font>

```javascript
const increment = () => {
  return {
    type: 'counter/increment'
  }
}

store.dispatch(increment())

console.log(store.getState())
// {value: 2}
```

#### Selector
**<font style="color:rgb(28, 30, 33);">Selector</font>**<font style="color:rgb(28, 30, 33);">函数可以从 store 状态树中提取指定的片段。随着应用变得越来越大，会遇到应用程序的不同部分需要读取相同的数据，selector可以避免重复这样的读取逻辑：</font>

```javascript
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
```

### 应用结构
<font style="color:rgb(28, 30, 33);">以下是构成此应用程序的关键文件：</font>

+ `<font style="color:rgb(28, 30, 33);">/src</font>`
    - `<font style="color:rgb(28, 30, 33);">index.js</font>`<font style="color:rgb(28, 30, 33);">: app入口</font>
    - `<font style="color:rgb(28, 30, 33);">App.js</font>`<font style="color:rgb(28, 30, 33);">: 顶级React组件</font>
    - `<font style="color:rgb(28, 30, 33);">/app</font>`
        * `<font style="color:rgb(28, 30, 33);">store.js</font>`<font style="color:rgb(28, 30, 33);">: 创建Redux store实例</font>
    - `<font style="color:rgb(28, 30, 33);">/features</font>`
        * `<font style="color:rgb(28, 30, 33);">/counter</font>`
            + `<font style="color:rgb(28, 30, 33);">Counter.js</font>`<font style="color:rgb(28, 30, 33);">: 展示 counter 特性的</font>**<font style="color:rgb(28, 30, 33);">React组件</font>**
            + `<font style="color:rgb(28, 30, 33);">counterSlice.js</font>`<font style="color:rgb(28, 30, 33);">: counter特性相关的</font>**<font style="color:rgb(28, 30, 33);">redux逻辑</font>**

#### 创建Redux Store
<font style="color:rgb(28, 30, 33);">Redux store是使用Redux Toolkit中的</font>`<font style="color:rgb(28, 30, 33);">configureStore</font>`<font style="color:rgb(28, 30, 33);">函数创建的。</font>`<font style="color:rgb(28, 30, 33);">configureStore</font>`<font style="color:rgb(28, 30, 33);">要求我们传入一个</font>`<font style="color:rgb(28, 30, 33);">reducer</font>`<font style="color:rgb(28, 30, 33);">参数。</font>

```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

<font style="color:rgb(28, 30, 33);">应用程序可能由许多不同的特性组成，每个特性都可能有自己的reducer函数。当我们调用</font>`<font style="color:rgb(28, 30, 33);">configureStore</font>`<font style="color:rgb(28, 30, 33);"> 时，可以传入一个对象中的所有不同的reducer。 对象中的键名key将定义最终状态树中的键名key。</font>

:::success
<font style="color:rgb(28, 30, 33);">store有以下几个职责:</font>

+ <font style="color:rgb(28, 30, 33);">在内部保存当前应用程序 state</font>
+ <font style="color:rgb(28, 30, 33);">通过</font>[<font style="color:rgb(28, 30, 33);">store.getState()</font>](https://cn.redux.js.org/api/store#getState)<font style="color:rgb(28, 30, 33);"> 访问当前 state;</font>
+ <font style="color:rgb(28, 30, 33);">通过</font>[<font style="color:rgb(28, 30, 33);">store.dispatch(action)</font>](https://cn.redux.js.org/api/store#dispatch)<font style="color:rgb(28, 30, 33);"> 更新状态;</font>
+ <font style="color:rgb(28, 30, 33);">通过</font>[<font style="color:rgb(28, 30, 33);">store.subscribe(listener)</font>](https://cn.redux.js.org/api/store#subscribe)<font style="color:rgb(28, 30, 33);"> 注册监听器回调;</font>
+ <font style="color:rgb(28, 30, 33);">通过</font>[<font style="color:rgb(28, 30, 33);">store.subscribe(listener)</font>](https://cn.redux.js.org/api/store#subscribe)<font style="color:rgb(28, 30, 33);"> 返回的 </font>`<font style="color:rgb(28, 30, 33);">unsubscribe</font>`<font style="color:rgb(28, 30, 33);"> 函数注销监听器。</font>

:::

##### <font style="color:rgb(28, 30, 33);">Redux Slice</font>
**<font style="color:rgb(28, 30, 33);">“slice"是应用中</font>****<font style="color:#ECAA04;">单个功能的Redux reducer逻辑和action的集合</font>**<font style="color:rgb(28, 30, 33);">, 通常一起定义在一个文件中。</font>

```javascript
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice' //3个slice
import postsReducer from '../features/posts/postsSlice' //3个slice
import commentsReducer from '../features/comments/commentsSlice' //3个slice

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})
```

#### 创建Slice Reducer和Action
```javascript
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    //3个action操作 对状态值的返回
    increment: state => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。
      // 并不是真正的改变 state 因为它使用了 immer 库
      // 当 immer 检测到 "draft state" 改变时，会基于这些改变去创建一个新的
      // 不可变的 state
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

<font style="color:rgb(28, 30, 33);">Redux Toolkit有一个名为</font>`<font style="color:rgb(28, 30, 33);">createSlice</font>`<font style="color:rgb(28, 30, 33);">的函数，它负责生成action类型字符串、action creator函数和 action对象的工作。你所要做的就是为这个slice定义一个名称，编写一个包含reducer函数的对象，它会自动生成相应的action代码。</font>

#### <font style="color:rgb(28, 30, 33);">用Thunk编写异步逻辑</font>
**<font style="color:rgb(28, 30, 33);">thunk</font>**<font style="color:rgb(28, 30, 33);">是一种特定类型的Redux函数，可以包含异步逻辑。Thunk是使用两个函数编写的：</font>

+ <font style="color:rgb(28, 30, 33);">一个</font>**<font style="color:rgb(28, 30, 33);">内部thunk函数</font>**<font style="color:rgb(28, 30, 33);">，它以</font>`<font style="color:rgb(28, 30, 33);">dispatch</font>`<font style="color:rgb(28, 30, 33);">和</font>`<font style="color:rgb(28, 30, 33);">getState</font>`<font style="color:rgb(28, 30, 33);">作为参数</font>
+ **<font style="color:rgb(28, 30, 33);">外部创建者函数，它创建并返回thunk函数</font>**

```javascript
// 下面这个函数就是一个 thunk ，它使我们可以执行异步逻辑
// 你可以 dispatched 异步 action `dispatch(incrementAsync(10))` 就像一个常规的 action
// 调用 thunk 时接受 `dispatch` 函数作为第一个参数
// 当异步代码执行完毕时，可以 dispatched actions
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}
// 使用
store.dispath(incrementAsync(5))
```

```javascript
// 外部的 thunk creator 函数
const fetchUserById = userId => {
  // 内部的 thunk 函数
  return async (dispatch, getState) => {
    try {
      // thunk 内发起异步数据请求
      const user = await userAPI.fetchById(userId)
      // 但数据响应完成后 dispatch 一个 action
      dispatch(userLoaded(user))
    } catch (err) {
      // 如果过程出错，在这里处理
    }
  }
}
```

### Providing the Store
<font style="color:rgb(28, 30, 33);">需要使用一个名为 </font>`<font style="color:rgb(28, 30, 33);"><Provider></font>`<font style="color:rgb(28, 30, 33);"> 的组件在幕后传递 Redux store，以便他们可以访问它。</font>

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

## Zustand
官网：[https://awesomedevin.github.io/zustand-vue/](https://awesomedevin.github.io/zustand-vue/)

### 切片模式
场景：当单个store比较大的时候，可以采用 切片模式 进行模块拆分组合，类似于模块化

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736857663431-9caff5a2-3c9b-42f6-969d-cb3c041fa8c0.png)



## ReactRouter
前端路由：一个路径path对应一个组件component，当我们在浏览器中访问一个path的时候，path对应的组件会在页面中进行渲染。

### 开发中的路由配置
![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736168902908-7d07ca96-86da-4d62-b416-60b2f26c19d3.png)

1. 创建page文件夹添加路由组件
2. 创建router文件夹配置path-component
3. 应用入口文件渲染

### 路由导航
定义：多个路由之间需要进行路由跳转，并且在跳转的同时有可能需要传递参数进行通信

#### 声明式导航
在模板中通过`<Link/>`组件描述出要跳转到哪里去，比如后台管理系统的左侧菜单通常使用这种方式进行。

```javascript
<Link to="/article">文章</Link>
```

语法说明：通过给组件的to属性指定要跳转到路由path，组件会被渲染为浏览器支持的a链接，如果需要传参直接通过字符串拼接的方式直接拼接参数即可

#### 编程式导航
通过`useNavigate`钩子得到导航方法，然后通过调用方法以命令式的形式进行路由跳转，比如想在登录请求完毕后跳转可以选择这种方式，更加的灵活

```jsx
import {useNavigate} from "react-router-dom"
const login = ()=>{
  const navigate = useNavigate()
  return (
    <div>
      我是登录页
      <button onClick={() => navigate('/article')}>跳转至文章页</>
    </div>
  )
}
```

语法说明：通过调用navigate方法传入地址path实现跳转

#### 导航传参
1. searchParams传参

```jsx
传递：
navigate('/article?id=1001&name=jack')
接受：
const [params] = useSearchParams()
let id = params.get('id')
```

2. params传参

需要**<font style="color:#FBDE28;">配置路由占位符</font>**

```jsx
传递：
navigate('/article?1001')
接受：
const params = useParams()
let id = params.id
```

### 嵌套路由
在以及路由中又内嵌了其他路由，这种关系就叫嵌套路由，嵌套至以及路由内的路由又称作二级路由![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736171370385-c5388339-607d-4672-8346-e14ce031cd61.png)

实现步骤：

+ 使用children属性配置路由嵌套关系
+ 使用`<Outlet/>`组件配置二级路由**渲染**位置(渲染的位置）

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736171903745-a3f9bc67-3307-426b-b578-6cbaf6c82ab7.png)

#### 默认二级路由
当访问的是一级路由时，**默认的二级路由组件可以得到渲染**，只要在二级路由的位置去掉path，设置index属性为true。

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736172048628-916c3698-f7ee-49f0-9fa8-575dbaafaa8b.png)

#### 404路由
场景：当浏览器输入url的路径在整个路由配置中都找不到对应的path，为了用户体验，可以使用404兜底组件实现渲染。

实现步骤：

1. 准备一个NotFound组件
2. 在路由表数组的末尾，以*号作为路由path的配置路由

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736172282839-3a1a4791-8d31-4d2c-8547-90336f29b35b.png)

### 两种路由模式![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736172422231-fb1d1025-e90e-4c6f-9c99-53b02c66e793.png)
# 配置别名路径
1. 路径解析配置(webpack)，把@/ 解析为src/.
2. 路径联想配置(VSCode)，VSCode在输入@/时，自动联想出来对应的src/下的子级目录。

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736257352086-a386d187-5ea2-42fc-ac2b-8233606b7d16.png)

# 数据Mock
在前后端分类的开发模式下，前端可以在没有实际后端接口的支持下先进行接口数据的模拟，进行正常的业务功能开发

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736258120220-74f9da70-0ebd-4241-9afb-7ca695bab7bb.png)

# antD-mobile主题定制
全局定制：整个应用返回内的组件都生效

局部定制：只在某些元素内部组件生效

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1736321393397-6b774bc0-7af2-42a3-9fcd-e06a55f59677.png)



