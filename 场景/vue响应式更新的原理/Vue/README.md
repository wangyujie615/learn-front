# 简化版Vue.js实现

这是一个简化版的Vue.js实现，展示了Vue.js的核心功能：数据响应式、模板编译和依赖收集与更新。

## 实现原理

### 1. 数据响应式

通过`Object.defineProperty` API对数据对象的每个属性进行劫持，添加getter和setter：

- **getter**：进行依赖收集，将当前订阅者(Watcher)添加到依赖列表(Dep)中
- **setter**：当数据变化时，通知所有订阅者进行更新

### 2. 模板编译

编译器(Compiler)负责解析模板，识别以下内容：

- 插值表达式 `{{变量}}`：创建订阅者，当数据变化时更新文本
- 指令 `v-model`：实现双向数据绑定
- 事件绑定 `@click`：绑定事件处理函数

### 3. 依赖收集与更新

- **Dep类**：依赖收集器，管理订阅者列表
- **Watcher类**：订阅者，订阅数据变化并执行更新回调
- **依赖收集流程**：
  1. 创建Watcher实例时，将Dep.target指向自己
  2. 访问数据属性，触发getter
  3. getter中将当前Watcher添加到Dep的订阅列表
  4. 重置Dep.target

## 核心代码结构

```
MyVue (Vue构造函数)
├── observe (数据响应式处理)
│   └── Observer (观察者类)
│       └── defineReactive (定义响应式数据)
├── proxy (属性代理)
├── initComputed (初始化计算属性)
└── Compiler (模板编译器)
    ├── compileElement (编译元素节点)
    ├── compileText (编译文本节点)
    ├── bindModel (绑定v-model)
    └── bindEvent (绑定事件)

Dep (依赖收集器)
├── addSub (添加订阅者)
└── notify (通知更新)

Watcher (订阅者)
├── get (获取值)
└── update (更新)
```

## 使用示例

```html
<div id="app">
  <input type="text" v-model="name" placeholder="请输入姓名">
  <p>你好，{{ name }}！</p>
  <button @click="sayHello">打招呼</button>
</div>

<script src="myVue.js"></script>
<script>
  const app = new MyVue({
    el: '#app',
    data: {
      name: '张三'
    },
    methods: {
      sayHello() {
        alert(`你好，${this.name}！`);
      }
    }
  });
</script>
```

## 功能特性

- ✅ 数据响应式：data中的数据变化自动更新视图
- ✅ 模板编译：支持模板中使用{{变量}}语法
- ✅ 依赖收集与更新：通过Dep和Watcher实现依赖追踪
- ✅ 双向数据绑定：支持v-model指令
- ✅ 事件处理：支持@事件绑定
- ✅ 计算属性：支持基于其他数据计算得出的属性

## 运行示例

1. 打开`index.html`文件
2. 在输入框中输入内容，观察文本内容的实时更新
3. 点击按钮，触发事件处理函数

## 注意事项

这是一个简化版的Vue实现，主要用于学习和理解Vue的核心原理。与真正的Vue.js相比，缺少很多功能和优化，例如：

- 组件系统
- 虚拟DOM
- 更完善的指令系统
- 性能优化
- 错误处理
- 生命周期钩子

但这个实现包含了Vue.js最核心的响应式原理，有助于理解Vue.js的工作机制。