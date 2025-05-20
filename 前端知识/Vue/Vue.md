# 基础
## 创建一个Vue应用
每个Vue应用都是通过`createApp`函数创建一个新的应用实例：

```vue
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```

### 根组件
```vue
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```

### 挂载应用
<font style="color:#000000;">应用实例必须在调用了 </font>`<font style="color:#000000;">.mount()</font>`<font style="color:#000000;"> 方法后才会渲染出来。该方法接收一个“容器”参数，</font>**<font style="color:#000000;">可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串</font>**<font style="color:#000000;">：</font>

```vue
<div id="app"></div>
```

```vue
app.mount('#app')
```

<font style="color:#000000;">应用根组件的内容将会被渲染在容器元素里面。容器元素自己将不会被视为应用的一部分。</font>

`<font style="color:#000000;">.mount()</font>`<font style="color:#000000;"> 方法应该</font>**<font style="color:#000000;">始终在整个应用配置和资源注册完成后被调用</font>**<font style="color:#000000;">。同时请注意，不同于其他资源注册方法，它的返回值是根组件实例而非应用实例。</font>

#### <font style="color:#000000;">DOM 中的根组件模板</font>
<font style="color:#000000;">根组件的模板通常是组件本身的一部分，但也可以直接通过在挂载容器内编写模板来单独提供：</font>

```plain
<div id="app">
  <button @click="count++">{{ count }}</button>
</div>
```

```plain
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})

app.mount('#app')
```

<font style="color:#000000;">当根组件没有设置</font><font style="color:#000000;"> </font>`template`<font style="color:#000000;"> </font><font style="color:#000000;">选项时，Vue 将自动使用容器的</font><font style="color:#000000;"> </font>`innerHTML`<font style="color:#000000;"> </font><font style="color:#000000;">作为模板。</font>

<font style="color:#000000;">DOM 内模板通常用于</font>[<font style="color:#000000;">无构建步骤</font>](https://cn.vuejs.org/guide/quick-start.html#using-vue-from-cdn)<font style="color:#000000;">的 Vue 应用程序。它们也可以与服务器端框架一起使用，其中根模板可能是由服务器动态生成的。</font>

### 应用配置
<font style="color:#000000;">应用实例会暴露一个 </font>`.config`<font style="color:#000000;"> 对象允许我们配置一些应用级的选项，例如定义一个应用级的错误处理器，</font>**<font style="color:#000000;">用来捕获所有子组件上的错误</font>**<font style="color:#000000;">：</font>

```plain
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
```

<font style="color:#000000;">应用实例还提供了一些方法来注册应用范围内可用的资源，例如注册一个组件：</font>

```plain
app.component('TodoDeleteButton', TodoDeleteButton)
```

<font style="color:#000000;">这使得 </font>`TodoDeleteButton`<font style="color:#000000;"> 在应用的任何地方都是可用的。我们会在指南的后续章节中讨论关于组件和其他资源的注册。你也可以在 </font>[<font style="color:#000000;">API 参考</font>](https://cn.vuejs.org/api/application.html)<font style="color:#000000;">中浏览应用实例 API 的完整列表。</font>

## <font style="color:#000000;">模板语法</font>
<font style="color:#DF2A3F;">Vue 使用一种基于 HTML 的模板语法，</font>**<font style="color:#DF2A3F;">使能够声明式地将其组件实例的数据绑定到呈现的 DOM 上</font>**<font style="color:#DF2A3F;">。所有的 Vue 模板都是语法层面合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。</font>

<font style="color:#DF2A3F;">在底层机制中，</font>**<font style="color:#DF2A3F;">Vue 会将模板编译成高度优化的 JavaScript 代码</font>**<font style="color:#DF2A3F;">。结合响应式系统，当应用状态变更时，Vue 能够智能地推导出需要重新渲染的组件的最少数量，并应用最少的 DOM 操作。</font>

## 模板编译原理

Vue中的模板template无法被浏览器解析并渲染，因为这不属于浏览器的标准，不是正确的HTML语法，**所以需要将template转化成一个JavaScript函数，这样浏览器就可以执行这一个函数并渲染出对应的HTML元素，就可以让视图跑起来了，这一个转化的过程，就成为模板编译**。模板编译又分三个阶段，**解析parse，优化optimize，生成generate**，最终生成可执行函数render。

- **解析阶段**：使用大量的正则表达式对template字符串进行**解析**，将标签、指令、属性等转化为**抽象语法树AST**。
- **优化阶段**：遍历AST，**找到其中的一些静态节点并进行标记**，方便在页面重渲染的时候进行diff比较时，直接跳过这一些静态节点，优化runtime的性能。
- **生成阶段**：将最终的**AST转化为render函数字符串**。

vue 在模版编译版本的码中会执行 compileToFunctions 将template转化为render函数：

```
// 将模板编译为render函数
const { render, staticRenderFns } = compileToFunctions(template,options//省略}, this)
```

CompileToFunctions中的主要逻辑如下∶

**（1）调用parse方法将template转化为ast（抽象语法树）**

```javascript
constast = parse(template.trim(), options)
```

- **parse的目标**：把tamplate转换为AST树，它是一种用 JavaScript对象的形式来描述整个模板。
- **解析过程**：利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的 回调函数，来达到构造AST树的目的。

AST元素节点总共三种类型：type为1表示普通元素、2为表达式、3为纯文本



**（2）对静态节点做优化**

```javascript
optimize(ast,options)
```

这个过程主要分析出哪些是静态节点，给其打一个标记，为后续更新渲染可以直接跳过静态节点做优化



深度遍历AST，查看每个子树的节点元素是否为静态节点或者静态节点根。如果为静态节点，他们生成的DOM永远不会改变，这对运行时模板更新起到了极大的优化作用。



**（3）生成代码**

```javascript
const code = generate(ast, options)
```

generate将ast抽象语法树编译成 render字符串并将静态部分放到 staticRenderFns 中，最后通过 `new Function(`` render``)` 生成render函数。

### <font style="color:#000000;">文本插值</font>
<font style="color:#DF2A3F;">最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：</font>

```vue
<span>Message: {{ msg }}</span>
```

### <font style="color:#000000;">原始HTML</font>
<font style="color:#000000;">双大括号会将数据解释为纯文本，而不是 HTML。若想插入 HTML，你需要使用 </font>[<font style="color:#000000;">v-html指令</font>](https://cn.vuejs.org/api/built-in-directives.html#v-html)<font style="color:#000000;">：</font>

```vue
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

<font style="color:#000000;">指令由 </font>`v-`<font style="color:#000000;"> 作为前缀，表明它们是一些由 Vue 提供的特殊 attribute，它们将为渲染的 DOM 应用特殊的响应式行为。</font>

### Attribute绑定
<font style="color:#000000;">双大括号不能在 HTML attributes 中使用。想要响应式地绑定一个 attribute，应该使用 </font>[<font style="color:#000000;">v-bind指令</font>](https://cn.vuejs.org/api/built-in-directives.html#v-bind)<font style="color:#000000;">：</font>

```vue
<div v-bind:id="dynamicId"></div>
```

`v-bind`<font style="color:#000000;"> 指令指示 Vue 将元素的 </font>`id`<font style="color:#000000;"> attribute 与组件的 </font>`dynamicId`<font style="color:#000000;"> 属性保持一致。如果绑定的值是 </font>`null`<font style="color:#000000;"> 或者 </font>`undefined`<font style="color:#000000;">，那么该 attribute 将会从渲染的元素上移除。</font>

**简写**

```vue
<div :id="dynamicId"></div>
```

<font style="color:#000000;">开头为 </font>`:`<font style="color:#000000;"> 的 attribute 可能和一般的 HTML attribute 看起来不太一样，但它的确是合法的 attribute 名称字符，并且所有支持 Vue 的浏览器都能正确解析它。</font>

#### 布尔型Attribute
[<font style="color:#000000;">布尔型 attribute</font>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes#%E5%B8%83%E5%B0%94%E5%80%BC%E5%B1%9E%E6%80%A7)<font style="color:#000000;"> 依据 true / false 值来决定 attribute 是否应该存在于该元素上。</font>[<font style="color:#000000;">disabled</font>](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)<font style="color:#000000;"> 就是最常见的例子之一。</font>

```vue
<button :disabled="isButtonDisabled">Button</button>
```

<font style="color:#000000;">当 </font>`isButtonDisabled`<font style="color:#000000;"> 为</font>[<font style="color:#000000;">真值</font>](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)<font style="color:#000000;">或一个空字符串 (即 </font>`<button disabled="">`<font style="color:#000000;">) 时，元素会包含这个 </font>`disabled`<font style="color:#000000;"> attribute。而当其为其他</font>[<font style="color:#000000;">假值</font>](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)<font style="color:#000000;">时 attribute 将被忽略。</font>

#### <font style="color:#000000;">动态绑定多个值</font>
```vue
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
<div v-bind="objectOfAttrs"></div>
```

### 指令Directives
<font style="color:#000000;">指令是带有 </font>`v-`<font style="color:#000000;"> 前缀的特殊 attribute。Vue 提供了许多</font>[<font style="color:#000000;">内置指令</font>](https://cn.vuejs.org/api/built-in-directives.html)<font style="color:#000000;">，包括上面我们所介绍的 </font>`v-bind`<font style="color:#000000;"> 和 </font>`v-html`<font style="color:#000000;">。</font>

<font style="color:#000000;">指令 attribute 的期望值为一个 JavaScript 表达式 (除了少数几个例外，即之后要讨论到的 </font>`v-for`<font style="color:#000000;">、</font>`v-on`<font style="color:#000000;"> 和 </font>`v-slot`<font style="color:#000000;">)。</font>**<font style="color:#000000;">一个指令的任务是在其表达式的值变化时响应式地更新 DOM</font>**<font style="color:#000000;">。以 </font>[<font style="color:#000000;">v-if</font>](https://cn.vuejs.org/api/built-in-directives.html#v-if)<font style="color:#000000;"> 为例：</font>

```vue
<p v-if="seen">Now you see me</p>
```

#### 参数Arguments
<font style="color:#000000;">某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识。例如用 </font>`v-bind`<font style="color:#000000;"> 指令来响应式地更新一个 HTML attribute：</font>

```plain
<a v-bind:href="url"> ... </a>

<!-- 简写 -->
<a :href="url"> ... </a>
```

<font style="color:#000000;">这里 </font>`href`<font style="color:#000000;"> 就是一个参数，它告诉 </font>`v-bind`<font style="color:#000000;"> 指令将表达式 </font>`url`<font style="color:#000000;"> 的值绑定到元素的 </font>`href`<font style="color:#000000;"> attribute 上。在简写中，</font>**<font style="color:#000000;">参数前的一切 (例如 </font>**`v-bind:`**<font style="color:#000000;">) 都会被缩略为一个 </font>**`:`**<font style="color:#000000;"> 字符</font>**<font style="color:#000000;">。另一个例子是 </font>`v-on<`<font style="color:#000000;"> 指令，它将监听 DOM 事件：</font>

```vue
<a v-on:click="doSomething"> ... </a>

<!-- 简写 -->
<a @click="doSomething"> ... </a>
```

<font style="color:#000000;">这里的参数是要监听的事件名称：</font>`click`<font style="color:#000000;">。</font>`v-on`**<font style="color:#000000;"> 有一个相应的缩写，即 </font>**`@`**<font style="color:#000000;"> 字符</font>**<font style="color:#000000;">。我们之后也会讨论关于事件处理的更多细节。</font>

#### <font style="color:#000000;">动态参数</font>
<font style="color:#000000;">同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内：</font>

```vue
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

**<font style="color:#000000;">这里的 </font>**`attributeName`**<font style="color:#000000;"> 会作为一个 JavaScript 表达式被动态执行，计算得到的值会被用作最终的参数。</font>**<font style="color:#000000;">举例来说，如果你的组件实例有一个数据属性 </font>`attributeName`<font style="color:#000000;">，其值为 </font>`"href"`<font style="color:#000000;">，那么这个绑定就等价于 </font>`v-bind:href`<font style="color:#000000;">。</font>

<font style="color:#000000;">相似地，你还可以将一个函数绑定到动态的事件名称上：</font>

```plain
<a v-on:[eventName]="doSomething"> ... </a>

<!-- 简写 -->
<a @[eventName]="doSomething"> ... </a>
```

<font style="color:#000000;">在此示例中，当 </font>`eventName`<font style="color:#000000;"> 的值是 </font>`"focus"`<font style="color:#000000;"> 时，</font>`v-on:[eventName]`<font style="color:#000000;"> 就等价于 </font>`v-on:focus`<font style="color:#000000;">。</font>

##### 动态参数值的限制
**<font style="color:#000000;">动态参数中表达式的值应当是一个字符串，或者是 </font>**`null`<font style="color:#000000;">。特殊值 </font>`null`<font style="color:#000000;"> 意为显式移除该绑定。其他非字符串的值会触发警告。</font>

##### <font style="color:#000000;">动态参数语法的限制</font>
<font style="color:#000000;">动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。例如下面的示例：</font>

```vue
<!-- 这会触发一个编译器警告 -->
<a :['foo' + bar]="value"> ... </a>
```

<font style="color:#000000;">如果你需要传入一个复杂的动态参数，我们推荐使用</font>[<font style="color:#000000;">计算属性</font>](https://cn.vuejs.org/guide/essentials/computed.html)<font style="color:#000000;">替换复杂的表达式，也是 Vue 最基础的概念之一，我们很快就会讲到。</font>

<font style="color:#000000;">当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写：</font>

```vue
<a :[someAttr]="value"> ... </a>
```

<font style="color:#000000;">上面的例子将会在 DOM 内嵌模板中被转换为 </font>`:[someattr]`<font style="color:#000000;">。如果你的组件拥有 “someAttr” 属性而非 “someattr”，这段代码将不会工作。单文件组件内的模板</font>**<font style="color:#000000;">不</font>**<font style="color:#000000;">受此限制。</font>

### <font style="color:#000000;">修饰符 Modifiers</font>
**<font style="color:#000000;">修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定</font>**<font style="color:#000000;">。例如 </font>`.prevent`<font style="color:#000000;"> 修饰符会告知 </font>`v-on`<font style="color:#000000;"> 指令对触发的事件调用 </font>`event.preventDefault()`<font style="color:#000000;">：</font>

```plain
<form @submit.prevent="onSubmit">...</form>
```

<font style="color:#000000;">之后在讲到 </font>[<font style="color:#000000;">v-on</font>](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers)<font style="color:#000000;"> 和 </font>[<font style="color:#000000;">v-model</font>](https://cn.vuejs.org/guide/essentials/forms.html#modifiers)<font style="color:#000000;"> 的功能时，你将会看到其他修饰符的例子。</font>

<font style="color:#000000;">最后，在这里你可以直观地看到完整的指令语法：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1747316080047-1d1abd0d-c6d7-499f-9618-067a03fddd58.png)

## 响应式基础

### data是一个函数的原因

Vue组件可能存在多个实例，如果使用**对象形式定义data，则会导致它们共用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的**；**采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染问题**。而在Vue根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况。

### 响应式的原理

当一个Vue实例创建时，Vue会遍历data中的属性，**用 Object.defineProperty（vue3.0使用proxy ）将它们转为 getter/setter，并且在内部追踪相关依赖，在属性被访问和修改时通知变化**。 **每个组件实例都有相应的 watcher 程序实例**，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。

![img](https://cdn.nlark.com/yuque/0/2021/png/1500604/1620128979608-f7465ffc-9411-43e3-a6bc-96ab44dd77df.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_23%2Ctext_5b6u5L-h5YWs5LyX5Y-377ya5YmN56uv5YWF55S15a6d%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

### ref()
<font style="color:#000000;">在</font>**<font style="color:#000000;">组合式 API</font>**<font style="color:#000000;"> 中，推荐使用 </font>[<font style="color:#000000;">ref()</font>](https://cn.vuejs.org/api/reactivity-core.html#ref)<font style="color:#000000;"> 函数来声明响应式状态：</font>

```vue
import { ref } from 'vue'

const count = ref(0)
```

`ref()`<font style="color:rgb(33, 53, 71);"> 接收参数，并将其包裹在一个带有 </font>`.value`<font style="color:rgb(33, 53, 71);"> 属性的 ref 对象中返回：</font>

```vue
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

<font style="color:rgb(33, 53, 71);">要在</font>**<font style="color:rgb(33, 53, 71);">组件模板</font>**<font style="color:rgb(33, 53, 71);">中访问 ref，请从组件的 </font>`setup()`<font style="color:rgb(33, 53, 71);"> 函数中声明并返回它们：</font>

```javascript
import { ref } from 'vue'

export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    // 将 ref 暴露给模板
    return {
      count
    }
  }
}
```

#### 为什么要使用ref?
<font style="color:rgb(33, 53, 71);">在模板中使用了一个 ref，然后</font>**<font style="color:rgb(33, 53, 71);">改变了这个 ref 的值时，Vue 会自动检测到这个变化，并且相应地更新DOM。</font>**<font style="color:rgb(33, 53, 71);">这是通过一个</font>**<font style="color:rgb(33, 53, 71);">基于依赖追踪的响应式系统实现</font>**<font style="color:rgb(33, 53, 71);">的。当一个组件首次渲染时，Vue 会</font>**<font style="color:rgb(33, 53, 71);">追踪</font>**<font style="color:rgb(33, 53, 71);">在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会</font>**<font style="color:rgb(33, 53, 71);">触发</font>**<font style="color:rgb(33, 53, 71);">追踪它的组件的一次重新渲染。</font>

<font style="color:rgb(33, 53, 71);">在标准的 JavaScript 中，检测普通变量的访问或修改是行不通的。然而，我们</font>**<font style="color:rgb(33, 53, 71);">可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。</font>**

<font style="color:rgb(33, 53, 71);">该 </font>`.value`<font style="color:rgb(33, 53, 71);"> 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改。</font>**<font style="color:rgb(33, 53, 71);">在其内部，Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。</font>**

```javascript
// 伪代码，不是真正的实现
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    //监听到发生变化，触发更新
    trigger()
  }
}
```

#### 深层响应性

<font style="color:rgb(33, 53, 71);">Ref可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构。</font>

<font style="color:rgb(33, 53, 71);">Ref会使它的值具有深层响应性。这意味着**即使改变嵌套对象或数组时，变化也会被检测到**：</font>

```javascript
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // 以下都会按照期望工作
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

<font style="color:rgb(33, 53, 71);">也可以通过 </font>[<font style="color:rgb(66, 184, 131);">shallow ref</font>](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)<font style="color:rgb(33, 53, 71);"> 来放弃深层响应性。对于浅层 ref，只有 </font>`.value`<font style="color:rgb(33, 53, 71);"> 的访问会被追踪。</font>**<font style="color:rgb(33, 53, 71);">浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。</font>**

#### <font style="color:rgb(33, 53, 71);">DOM的更新机制</font>(重要)
<font style="color:rgb(33, 53, 71);">当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，</font>**<font style="color:rgb(33, 53, 71);">DOM 更新不是同步的</font>**<font style="color:rgb(33, 53, 71);">。Vue 会</font>**<font style="color:rgb(33, 53, 71);">在“nextTick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。</font>**Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。



<font style="color:rgb(33, 53, 71);">要等待 DOM 更新完成后再执行额外的代码，可以使用 </font>[<font style="color:rgb(66, 184, 131);">nextTick()</font>](https://cn.vuejs.org/api/general.html#nexttick)<font style="color:rgb(33, 53, 71);"> 全局 API：</font>

```javascript
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}
```

#### nextTick原理及作用

nextTick 的核心是利用了如 Promise 、MutationObserver、setImmediate、setTimeout的原生 JavaScript 方法来模拟对应的微/宏任务的实现，**本质是为了利用 JavaScript 的这些异步回调任务队列来实现 Vue 框架中自己的异步回调队列**。



nextTick 是典型的将底层 JavaScript 执行原理应用到具体案例中的示例，引入异步更新队列机制的原因∶

- **如果是同步更新，则多次对一个或多个属性赋值，会频繁触发 UI/DOM 的渲染，可以减少一些无用渲染**
- 同时由于 VirtualDOM 的引入，每一次状态发生变化后，状态变化的信号会发送给组件，组件内部使用 VirtualDOM 进行计算得出需要更新的具体的 DOM 节点，然后对 DOM 进行更新操作，每次**更新状态后的渲染过程需要更多的计算**，而这种无用功也将浪费更多的性能，所以异步渲染变得更加至关重要。

所以，在以下情况下，会用到nextTick：

- 在**数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的DOM结构的时候**，这个操作就需要方法在`nextTick()`的回调函数中。
- 在vue生命周期中，**如果在created()钩子进行DOM操作，也一定要放在`nextTick()`的回调函数中。**

因为在created()钩子函数中，页面的DOM还未渲染，这时候也没办法操作DOM，所以，此时如果想要操作DOM，必须将操作的代码放在`nextTick()`的回调函数中。

### reactive()

<font style="color:rgb(33, 53, 71);">还有另一种声明响应式状态的方式，即使用 </font>`reactive()`<font style="color:rgb(33, 53, 71);"> API。与将内部值包装在特殊对象中的 ref 不同，</font>`reactive()`<font style="color:rgb(33, 53, 71);"> 将</font>**<font style="color:rgb(33, 53, 71);">使对象本身具有响应性</font>**<font style="color:rgb(33, 53, 71);">：</font>

```javascript
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

<font style="color:rgb(33, 53, 71);">响应式对象是 </font>[<font style="color:rgb(66, 184, 131);">JavaScript 代理</font>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)<font style="color:rgb(33, 53, 71);">，其行为就和普通对象一样。不同的是，Vue 能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新。</font>

`reactive()`<font style="color:rgb(33, 53, 71);"> 将深层地转换对象：当访问嵌套对象时，它们也会被 </font>`reactive()`<font style="color:rgb(33, 53, 71);"> 包装。当 ref 的值是一个对象时，</font>`ref()`<font style="color:rgb(33, 53, 71);"> 也会在内部调用它。与浅层 ref 类似，这里也有一个 </font>[<font style="color:rgb(66, 184, 131);">shallowReactive()</font>](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive)<font style="color:rgb(33, 53, 71);"> API 可以选择退出深层响应性。</font>

#### <font style="color:rgb(33, 53, 71);">Proxy vs Original</font>
```javascript
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

**<font style="color:rgb(33, 53, 71);">只有代理对象是响应式的，更改原始对象不会触发更新</font>**<font style="color:rgb(33, 53, 71);">。因此，使用 Vue 的响应式系统的最佳实践是</font>**<font style="color:rgb(33, 53, 71);">仅使用你声明对象的代理版本</font>**<font style="color:rgb(33, 53, 71);">。</font>

<font style="color:rgb(33, 53, 71);">为保证访问代理的一致性，对同一个原始对象调用 </font>`reactive()`<font style="color:rgb(33, 53, 71);"> 会总是返回同样的代理对象，而对一个已存在的代理对象调用 </font>`reactive()`<font style="color:rgb(33, 53, 71);"> 会返回其本身：</font>

```javascript
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true
```

#### `reactive()`<font style="color:rgb(33, 53, 71);"> 的局限性</font>
`reactive()`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">API 有一些局限性：</font>

1. **<font style="color:rgb(33, 53, 71);">有限的值类型</font>**<font style="color:rgb(33, 53, 71);">：它</font>**<font style="color:rgb(33, 53, 71);">只能用于对象类型 (对象、数组和如 </font>**`Map`**<font style="color:rgb(33, 53, 71);">、</font>**`Set`**<font style="color:rgb(33, 53, 71);"> 这样的</font>**[**<font style="color:rgb(66, 184, 131);">集合类型</font>**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections)**<font style="color:rgb(33, 53, 71);">)。</font>**<font style="color:rgb(33, 53, 71);">它不能持有如 </font>`string`<font style="color:rgb(33, 53, 71);">、</font>`number`<font style="color:rgb(33, 53, 71);"> 或 </font>`boolean`<font style="color:rgb(33, 53, 71);"> 这样的</font>[<font style="color:rgb(66, 184, 131);">原始类型</font>](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)<font style="color:rgb(33, 53, 71);">。</font>
2. **<font style="color:rgb(33, 53, 71);">不能替换整个对象</font>**<font style="color:rgb(33, 53, 71);">：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的**响应性连接将丢失**：</font>

```plain
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })
```

3. **<font style="color:rgb(33, 53, 71);">对解构操作不友好</font>**<font style="color:rgb(33, 53, 71);">：当</font>**<font style="color:rgb(33, 53, 71);">将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，将丢失响应性连接</font>**<font style="color:rgb(33, 53, 71);">：</font>

```plain
const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)
```

<font style="color:rgb(33, 53, 71);">由于这些限制，我们建议使用 </font>`ref()`<font style="color:rgb(33, 53, 71);"> 作为声明响应式状态的主要 API。</font>

### Object.defineProperty()数据劫持的缺陷

在对一些属性进行操作时，使用这种方法无法拦截，比如通过下标方式修改数组数据或者给对象新增属性，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。**对于数组而言，大部分操作都是拦截不到的**。

为了让Vue能监听到数组数据的其中的变化。

![img](https://cdn.nlark.com/yuque/0/2020/png/1500604/1604019269329-d88e91cf-b33d-4b2d-b014-e5739e9b7dbc.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_21%2Ctext_5b6u5L-h5YWs5LyX5Y-377ya5YmN56uv5YWF55S15a6d%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

那Vue是如何实现让这些数组方法实现元素的实时更新的呢，下面是Vue中对这些方法的封装：

```javascript
// 缓存数组原型
const arrayProto = Array.prototype;
// 实现 arrayMethods.__proto__ === Array.prototype
export const arrayMethods = Object.create(arrayProto);
// 需要进行功能拓展的方法
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function(method) {
  // 缓存原生数组方法
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    // 执行并缓存原生数组功能
    const result = original.apply(this, args);
    // 响应式处理
    const ob = this.__ob__;
    let inserted;
    switch (method) {
    // push、unshift会新增索引，所以要手动observer
      case "push":
      case "unshift":
        inserted = args;
        break;
      // splice方法，如果传入了第三个参数，也会有索引加入，也要手动observer。
      case "splice":
        inserted = args.slice(2);
        break;
    }
    // 
    if (inserted) ob.observeArray(inserted);// 获取插入的值，并设置响应式监听
    // notify change
    ob.dep.notify();// 通知依赖更新
    // 返回原生数组方法的执行结果
    return result;
  });
});
```

简单来说就是，**重写了数组中的那些原生方法，首先获取到这个数组的Observer对象，如果有新的值，就调用observeArray继续对新的值观察变化（也就是通过`target__proto__ == arrayMethods`来改变了数组实例的型），然后手动调用notify，通知渲染watcher，执行update。**

## <font style="color:rgb(33, 53, 71);">

## 计算属性</font>

```javascript
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

`computed()`<font style="color:rgb(33, 53, 71);"> 方法期望接收一个 </font>[<font style="color:rgb(66, 184, 131);">getter 函数</font>](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get#description)<font style="color:rgb(33, 53, 71);">，返回值为一个</font>**<font style="color:rgb(33, 53, 71);">计算属性 ref</font>**<font style="color:rgb(33, 53, 71);">。和其他一般的 ref 类似，你可以通过 </font>`publishedBooksMessage.value`<font style="color:rgb(33, 53, 71);"> 访问计算结果。</font>**<font style="color:rgb(33, 53, 71);">计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 </font>**`.value`**<font style="color:rgb(33, 53, 71);">。</font>**

### 计算属性缓存 vs 方法
<font style="color:rgb(33, 53, 71);">将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，不同之处在于</font>**<font style="color:rgb(33, 53, 71);">计算属性值会基于其响应式依赖被缓存</font>**<font style="color:rgb(33, 53, 71);">。</font>**<font style="color:rgb(33, 53, 71);">一个计算属性仅会在其响应式依赖更新时才重新计算</font>**<font style="color:rgb(33, 53, 71);">。这意味着只要 </font>`author.books`<font style="color:rgb(33, 53, 71);"> 不改变，无论多少次访问 </font>`publishedBooksMessage`<font style="color:rgb(33, 53, 71);"> 都会立即返回先前的计算结果，而不用重复执行 getter 函数。</font>

**<font style="color:rgb(33, 53, 71);">而函数是调用一次计算一次。</font>**

#### <font style="color:rgb(33, 53, 71);">可写计算属性</font>
**<font style="color:rgb(33, 53, 71);">计算属性默认是只读的。</font>**<font style="color:rgb(33, 53, 71);">当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：</font>

```plain
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

<font style="color:rgb(33, 53, 71);">现在当你再运行 </font>`fullName.value = 'John Doe'`<font style="color:rgb(33, 53, 71);"> 时，setter 会被调用而 </font>`firstName`<font style="color:rgb(33, 53, 71);"> 和 </font>`lastName`<font style="color:rgb(33, 53, 71);"> 会随之更新。</font>

#### <font style="color:rgb(33, 53, 71);">获取上一个值</font>
<font style="color:rgb(33, 53, 71);">如果需要，可以</font>**<font style="color:rgb(33, 53, 71);">通过访问计算属性的 getter 的第一个参数来获取计算属性返回的上一个值</font>**<font style="color:rgb(33, 53, 71);">：</font>

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

// 这个计算属性在 count 的值小于或等于 3 时，将返回 count 的值。
// 当 count 的值大于等于 4 时，将会返回满足我们条件的最后一个值
// 直到 count 的值再次小于或等于 3 为止。
const alwaysSmall = computed((previous) => {
  if (count.value <= 3) {
    return count.value
  }

  return previous
})
</script>
```

<font style="color:rgb(33, 53, 71);">如果你正在使用可写的计算属性的话：</font>

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

const alwaysSmall = computed({
  get(previous) {
    if (count.value <= 3) {
      return count.value
    }

    return previous
  },
  set(newValue) {
    count.value = newValue * 2
  }
})
</script>
```

### Computed与watch的区别

**对于Computed：**

- 它**支持缓存**，只有依赖的数据发生了变化，才会重新计算
- **不支持异步**，当Computed中有异步操作时，无法监听数据的变化
- computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed
- 如果computed属性的属性值是函数，那么默认使用get方法，函数的返回值就是属性的属性值；在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。

**对于Watch：**

- 它**不支持缓存**，数据变化时，它就会触发相应的操作
- **支持异步监听**
- 监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
- 当一个属性发生变化时，就需要执行相应的操作
- **监听数据必须是data中声明的或者父组件传递过来的props中的数据，当发生变化时，会触发其他操作，函数有两个的参数**：

- - immediate：组件加载立即触发回调函数
  - deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。**需要注意的是，deep无法监听到数组和对象内部的变化。**

当想要执行**异步或者昂贵的操作以响应不断的变化时，就需要使用watch**。

**总结：**

- computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。 
- watch 侦听器 : 更多的是**观察**的作用，**无缓存性**，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。 

## 类与样式的绑定

### 绑定HTML Class
#### 绑定对象
```javascript
<div :class="{ active: isActive }"></div>
```

```javascript
const classObject = reactive({
  active: true,
  'text-danger': false
})
<div :class="classObject"></div>
```

```javascript
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
<div :class="classObject"></div>
```

#### 绑定数组
```javascript
const activeClass = ref('active')
const errorClass = ref('text-danger')
<div :class="[activeClass, errorClass]"></div>
渲染结果
<div class="active text-danger"></div>
//三元表达式
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

### 绑定内联样式
#### <font style="color:rgb(33, 53, 71);">绑定对象</font>
`:style`<font style="color:rgb(33, 53, 71);"> 支持绑定 JavaScript 对象值，对应的是 </font>[<font style="color:rgb(66, 184, 131);">HTML 元素的style属性</font>](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)<font style="color:rgb(33, 53, 71);">：</font>

```plain
const activeColor = ref('red')
const fontSize = ref(30)
```

```plain
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

<font style="color:rgb(33, 53, 71);">尽管推荐使用小驼峰，但 </font>`:style`<font style="color:rgb(33, 53, 71);"> 也支持 kebab-cased 形式的 CSS 属性 key (对应其 CSS 中的实际名称)，例如：</font>

```plain
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

<font style="color:rgb(33, 53, 71);">直接绑定一个样式对象通常是一个好主意，这样可以使模板更加简洁：</font>

```plain
const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})
```

```plain
<div :style="styleObject"></div>
```

<font style="color:rgb(33, 53, 71);">同样的，如果样式对象需要更复杂的逻辑，也可以使用返回样式对象的计算属性。</font>

#### <font style="color:rgb(33, 53, 71);">绑定数组</font>
<font style="color:rgb(33, 53, 71);">我们还可以给 </font>`:style`<font style="color:rgb(33, 53, 71);"> 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上：</font>

```plain
<div :style="[baseStyles, overridingStyles]"></div>
```

#### <font style="color:rgb(33, 53, 71);">自动前缀</font>
<font style="color:rgb(33, 53, 71);">当你在</font><font style="color:rgb(33, 53, 71);"> </font>`:style`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">中使用了需要</font>[<font style="color:rgb(66, 184, 131);">浏览器特殊前缀</font>](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)<font style="color:rgb(33, 53, 71);">的 CSS 属性时，Vue 会自动为他们加上相应的前缀。Vue 是在运行时检查该属性是否支持在当前浏览器中使用。如果浏览器不支持某个属性，那么将尝试加上各个浏览器特殊前缀，以找到哪一个是被支持的。</font>

#### <font style="color:rgb(33, 53, 71);">样式多值</font>
<font style="color:rgb(33, 53, 71);">你可以对一个样式属性提供多个 (不同前缀的) 值，举例来说：</font>

```plain
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

<font style="color:rgb(33, 53, 71);">数组仅会渲染浏览器支持的最后一个值。在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 </font>`display: flex`<font style="color:rgb(33, 53, 71);">。</font>

## <font style="color:rgb(33, 53, 71);">条件渲染</font>
### `v-if`
`v-if`<font style="color:rgb(33, 53, 71);"> 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。</font>

```plain
<h1 v-if="awesome">Vue is awesome!</h1>
```

### `v-else`
<font style="color:rgb(33, 53, 71);">也可以使用 </font>`v-else`<font style="color:rgb(33, 53, 71);"> 为 </font>`v-if`<font style="color:rgb(33, 53, 71);"> 添加一个“else 区块”。</font>

```plain
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

<font style="color:rgb(33, 53, 71);">一个 </font>`v-else`<font style="color:rgb(33, 53, 71);"> 元素必须跟在一个 </font>`v-if`<font style="color:rgb(33, 53, 71);"> 或者 </font>`v-else-if`<font style="color:rgb(33, 53, 71);"> 元素后面，否则它将不会被识别。</font>

### `v-else-if`
`v-else-if`<font style="color:rgb(33, 53, 71);"> 提供的是相应于 </font>`v-if`<font style="color:rgb(33, 53, 71);"> 的“else if 区块”。它可以连续多次重复使用：</font>

```plain
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

<font style="color:rgb(33, 53, 71);">和 </font>`v-else`<font style="color:rgb(33, 53, 71);"> 类似，一个使用 </font>`v-else-if`<font style="color:rgb(33, 53, 71);"> 的元素必须紧跟在一个 </font>`v-if`<font style="color:rgb(33, 53, 71);"> 或一个 </font>`v-else-if`<font style="color:rgb(33, 53, 71);"> 元素后面。</font>

### `v-show`
<font style="color:rgb(33, 53, 71);">另一个可以用来按条件显示一个元素的指令是 </font>`v-show`<font style="color:rgb(33, 53, 71);">。其用法基本一样：</font>

```plain
<h1 v-show="ok">Hello!</h1>
```

<font style="color:rgb(33, 53, 71);">不同之处在于</font><font style="color:rgb(33, 53, 71);"> </font>`v-show`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">会在 DOM 渲染中保留该元素；</font>`v-show`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">仅切换了该元素上名为</font><font style="color:rgb(33, 53, 71);"> </font>`display`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">的 CSS 属性。</font>

`v-show`<font style="color:rgb(33, 53, 71);"> 不支持在 </font>`<template>`<font style="color:rgb(33, 53, 71);"> 元素上使用，也不能和 </font>`v-else`<font style="color:rgb(33, 53, 71);"> 搭配使用。</font>

### `v-if`和`v-show`（区别）
`v-if`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。</font>

`v-if`<font style="color:rgb(33, 53, 71);"> 也是</font>**<font style="color:rgb(33, 53, 71);">惰性</font>**<font style="color:rgb(33, 53, 71);">的：</font>**<font style="color:rgb(33, 53, 71);">如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染</font>**<font style="color:rgb(33, 53, 71);">。</font>

<font style="color:rgb(33, 53, 71);">相比之下，</font>`v-show`**<font style="color:rgb(33, 53, 71);"> 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS </font>**`display`**<font style="color:rgb(33, 53, 71);"> 属性会被切换。</font>**

<font style="color:rgb(33, 53, 71);">总的来说，</font>`v-if`**<font style="color:rgb(33, 53, 71);"> 有更高的切换开销，而 </font>**`v-show`**<font style="color:rgb(33, 53, 71);"> 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 </font>**`v-show`**<font style="color:rgb(33, 53, 71);"> 较好；如果在运行时绑定条件很少改变，则 </font>**`v-if`**<font style="color:rgb(33, 53, 71);"> 会更合适</font>**<font style="color:rgb(33, 53, 71);">。</font>

##### `v-if`、`v-show`、`v-html`的原理

- v-if**会调用addIfCondition方法，生成vnode的时候会忽略对应节点，render的时候就不会渲染**；(条件为false,不会render)
-  **v-show会生成vnode，render的时候也会渲染成真实节点，只是在render过程中会在节点的属性中修改show属性值，也就是常说的display**； (利用display)
- v-html会先移除节点下的所有节点，调用html方法，**通过addProp添加innerHTML属性，归根结底还是设置innerHTML为v-html的值**。(通过addProp设置innerHTML)

### `v-if`和`v-for`
<font style="color:rgb(33, 53, 71);">当 </font>`v-if`<font style="color:rgb(33, 53, 71);"> 和 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 同时存在于一个元素上的时候，</font>`v-if`<font style="color:rgb(33, 53, 71);"> 会首先被执行。</font>

- vue3是`v-if`优先于`v-for`
- vue3是`v-if`低于`v-for`



## <font style="color:rgb(33, 53, 71);">列表渲染</font>
### `v-for`
<font style="color:rgb(33, 53, 71);">可以使用 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 指令基于一个数组来渲染一个列表。</font>`v-for`<font style="color:rgb(33, 53, 71);"> 指令的值需要使用 </font>`item in items`<font style="color:rgb(33, 53, 71);"> 形式的特殊语法，其中 </font>`items`<font style="color:rgb(33, 53, 71);"> 是源数据的数组，而 </font>`item`<font style="color:rgb(33, 53, 71);"> 是迭代项的</font>**<font style="color:rgb(33, 53, 71);">别名</font>**<font style="color:rgb(33, 53, 71);">：</font>

```plain
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```plain
<li v-for="item in items">
  {{ item.message }}
</li>
```

<font style="color:rgb(33, 53, 71);">在 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 块中可以完整地访问父作用域内的属性和变量。</font>`v-for`<font style="color:rgb(33, 53, 71);"> 也支持使用可选的第二个参数表示当前项的位置索引。</font>

```plain
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```plain
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

<font style="color:rgb(33, 53, 71);">对于多层嵌套的 </font>`v-for`<font style="color:rgb(33, 53, 71);">，作用域的工作方式和函数的作用域很类似。每个 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 作用域都可以访问到父级作用域：</font>

```plain
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

<font style="color:rgb(33, 53, 71);">你也可以使用 </font>`of`<font style="color:rgb(33, 53, 71);"> 作为分隔符来替代 </font>`in`<font style="color:rgb(33, 53, 71);">，这更接近 JavaScript 的迭代器语法：</font>

```plain
<div v-for="item of items"></div>
```

### `v-for`与对象
<font style="color:rgb(33, 53, 71);">可以使用 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 来遍历一个对象的所有属性。遍历的顺序会基于对该对象调用 </font>`Object.values()`<font style="color:rgb(33, 53, 71);"> 的返回值来决定。</font>

```vue
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```vue
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

<font style="color:rgb(33, 53, 71);">可以通过提供第二个参数表示属性名 (例如 key)：</font>

```vue
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

<font style="color:rgb(33, 53, 71);">第三个参数表示位置索引：</font>

```vue
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

### 在`v-for`里面使用范围值
`v-for`<font style="color:rgb(33, 53, 71);"> 可以直接接受一个整数值。在这种用例中，会将该模板基于 </font>`1...n`<font style="color:rgb(33, 53, 71);"> 的取值范围重复多次。</font>

```plain
<span v-for="n in 10">{{ n }}</span>
```

<font style="color:rgb(33, 53, 71);">注意</font>**<font style="color:rgb(33, 53, 71);">此处 </font>**`n`**<font style="color:rgb(33, 53, 71);"> 的初值是从 </font>**`1`**<font style="color:rgb(33, 53, 71);"> 开始而非 </font>**`0`**<font style="color:rgb(33, 53, 71);">。</font>**

### `v-if`和`v-for`
<font style="color:rgb(33, 53, 71);">当它们</font>**<font style="color:rgb(33, 53, 71);">同时存在于一个节点上时，</font>**`v-if`**<font style="color:rgb(33, 53, 71);"> 比 </font>**`v-for`**<font style="color:rgb(33, 53, 71);"> 的优先级更高</font>**<font style="color:rgb(33, 53, 71);">。这意味着 </font>`v-if`<font style="color:rgb(33, 53, 71);"> 的条件将无法访问到 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 作用域内定义的变量别名：</font>

```plain
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

<font style="color:rgb(33, 53, 71);">在外先包装一层 </font>`<template>`<font style="color:rgb(33, 53, 71);"> 再在其上使用 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 可以解决这个问题 (这也更加明显易读)：</font>

```plain
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

### 通过Key管理状态
<font style="color:rgb(33, 53, 71);">Vue 默认按照“就地更新”的策略来更新通过</font><font style="color:rgb(33, 53, 71);"> </font>`v-for`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。</font>

<font style="color:rgb(33, 53, 71);">默认模式是高效的，但</font>**<font style="color:rgb(33, 53, 71);">只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况</font>**<font style="color:rgb(33, 53, 71);">。</font>

**<font style="color:rgb(33, 53, 71);">为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 </font>**`key`**<font style="color:rgb(33, 53, 71);"> attribute</font>**<font style="color:rgb(33, 53, 71);">：</font>

```plain
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

<font style="color:rgb(33, 53, 71);">当你使用 </font>`<template v-for>`<font style="color:rgb(33, 53, 71);"> 时，</font>`key`<font style="color:rgb(33, 53, 71);"> 应该被放置在这个 </font>`<template>`<font style="color:rgb(33, 53, 71);"> 容器上：</font>

```plain
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

**<font style="color:rgb(33, 53, 71);background-color:rgb(249, 249, 249);">注意</font>**

`key`**<font style="color:rgba(0, 0, 0, 0.55);background-color:rgb(249, 249, 249);"> </font>**<font style="color:rgba(0, 0, 0, 0.55);background-color:rgb(249, 249, 249);">在这里是一个通过</font>**<font style="color:rgba(0, 0, 0, 0.55);background-color:rgb(249, 249, 249);"> </font>**`v-bind`<font style="color:rgba(0, 0, 0, 0.55);background-color:rgb(249, 249, 249);">绑定的特殊 attribute。请不要和</font>**[**<font style="color:rgb(66, 184, 131);background-color:rgb(249, 249, 249);">在v-for中使用对象</font>**](https://cn.vuejs.org/guide/essentials/list.html#v-for-with-an-object)**<font style="color:rgba(0, 0, 0, 0.55);background-color:rgb(249, 249, 249);">里所提到的对象属性名相混淆。</font>**

**<font style="color:rgb(33, 53, 71);">推荐在任何可行的时候为 </font>**`v-for`**<font style="color:rgb(33, 53, 71);"> 提供一个 </font>**`key`**<font style="color:rgb(33, 53, 71);"> attribute，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者你想有意采用默认行为来提高性能。</font>**

`key`<font style="color:rgb(33, 53, 71);"> 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。</font>**<font style="color:rgb(33, 53, 71);">不要用对象作为 </font>**`v-for`**<font style="color:rgb(33, 53, 71);"> 的 key。</font>**

## <font style="color:rgb(33, 53, 71);">事件处理</font>
### 监听事件
<font style="color:rgb(33, 53, 71);">可以使用</font><font style="color:rgb(33, 53, 71);"> </font>`v-on`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">指令 (简写为</font><font style="color:rgb(33, 53, 71);"> </font>`@`<font style="color:rgb(33, 53, 71);">) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：</font>`v-on:click="handler"`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">或</font><font style="color:rgb(33, 53, 71);"> </font>`@click="handler"`<font style="color:rgb(33, 53, 71);">。</font>

<font style="color:rgb(33, 53, 71);">事件处理器 (handler) 的值可以是：</font>

1. **<font style="color:rgb(33, 53, 71);">内联事件处理器</font>**<font style="color:rgb(33, 53, 71);">：事件被触发时执行的内联 JavaScript 语句 (与</font><font style="color:rgb(33, 53, 71);"> </font>`onclick`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">类似)。</font>
2. **<font style="color:rgb(33, 53, 71);">方法事件处理器</font>**<font style="color:rgb(33, 53, 71);">：一个指向组件上定义的方法的属性名或是路径。</font>

### <font style="color:rgb(33, 53, 71);">内联事件处理器</font>
<font style="color:#DF2A3F;">内联事件处理器通常用于简单场景，例如：</font>

```vue
const count = ref(0)
```

```vue
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

### 方法事件处理器
<font style="color:rgb(33, 53, 71);">随着事件处理器的逻辑变得愈发复杂，内联代码方式变得不够灵活。因此</font><font style="color:rgb(33, 53, 71);"> </font>`v-on`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">也可以接受一个方法名或对某个方法的调用。</font>

<font style="color:rgb(33, 53, 71);">举例来说：</font>

```vue
const name = ref('Vue.js')
function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
  alert(event.target.tagName)
  }
}
```

```vue
<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>
```

<font style="color:rgb(33, 53, 71);">方法事件处理器会自动接收原生 DOM 事件并触发执行。在上面的例子中，能够通过被触发事件的 </font>`event.target`<font style="color:rgb(33, 53, 71);"> 访问到该 DOM 元素。</font>

#### 方法与内联事件判断
<font style="color:rgb(33, 53, 71);">模板编译器会通过检查 </font>`v-on`<font style="color:rgb(33, 53, 71);"> 的值是否是合法的 JavaScript 标识符或属性访问路径来断定是何种形式的事件处理器。举例来说，</font>`foo`<font style="color:rgb(33, 53, 71);">、</font>`foo.bar`<font style="color:rgb(33, 53, 71);"> 和 </font>`foo['bar']`<font style="color:rgb(33, 53, 71);"> 会被视为方法事件处理器，而 </font>`foo()`<font style="color:rgb(33, 53, 71);"> 和 </font>`count++`<font style="color:rgb(33, 53, 71);"> 会被视为内联事件处理器。</font>

### <font style="color:rgb(33, 53, 71);">在内联处理器中调用方法</font>
<font style="color:rgb(33, 53, 71);">除了直接绑定方法名，你还可以在内联事件处理器中调用方法。这允许我们向方法传入自定义参数以代替原生事件：</font>

```plain
function say(message) {
  alert(message)
}
```

```plain
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

### <font style="color:rgb(33, 53, 71);">在内联事件处理器中访问事件参数</font>
<font style="color:rgb(33, 53, 71);">有时我们需要在内联事件处理器中访问原生 DOM 事件。你可以向该处理器方法传入一个特殊的 </font>`$event`<font style="color:rgb(33, 53, 71);"> 变量，或者使用内联箭头函数：</font>

```Vue
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

```Vue
function warn(message, event) {
  // 这里可以访问原生事件
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

### 事件修饰符
<font style="color:rgb(33, 53, 71);">在处理事件时调用</font><font style="color:rgb(33, 53, 71);"> </font>`event.preventDefault()`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">或</font><font style="color:rgb(33, 53, 71);"> </font>`event.stopPropagation()`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">是很常见的。尽管我们可以直接在方法内调用，但如果方法能更专注于数据逻辑而不用去处理 DOM 事件的细节会更好。</font>

<font style="color:rgb(33, 53, 71);">为解决这一问题，Vue 为</font><font style="color:rgb(33, 53, 71);"> </font>`v-on`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">提供了</font>**<font style="color:rgb(33, 53, 71);">事件修饰符</font>**<font style="color:rgb(33, 53, 71);">。修饰符是用</font><font style="color:rgb(33, 53, 71);"> </font>`.`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">表示的指令后缀，包含以下这些：</font>

+ `.stop`<font style="color:rgb(71, 101, 130);">：阻止事件冒泡，等同于 JavaScript 中的 `event.stopPropagation()`</font>
+ `.prevent`<font style="color:rgb(71, 101, 130);">：阻止事件的默认行为，等同于 JavaScript 中的 `event.preventDefault()`</font>
+ `.self`：只会触发自己范围内的事件，不包含子元素；
+ `.capture`：与事件冒泡的方向相反，事件捕获由外到内；
+ `.once`<font style="color:rgb(71, 101, 130);">：事件最多被执行一次</font>
+ `.passive`

```vue
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
```

### 按键修饰符
<font style="color:rgb(33, 53, 71);">在监听键盘事件时，我们经常需要检查特定的按键。Vue 允许在 </font>`v-on`<font style="color:rgb(33, 53, 71);"> 或 </font>`@`<font style="color:rgb(33, 53, 71);"> 监听按键事件时添加按键修饰符。</font>

```Vue
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```

<font style="color:rgb(33, 53, 71);">你可以直接使用 </font>[<font style="color:rgb(66, 184, 131);">KeyboardEvent.key</font>](https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values)<font style="color:rgb(33, 53, 71);"> 暴露的按键名称作为修饰符，但需要转为 kebab-case 形式。</font>

```Vue
<input @keyup.page-down="onPageDown" />
```

<font style="color:rgb(33, 53, 71);">在上面的例子中，仅会在 </font>`$event.key`<font style="color:rgb(33, 53, 71);"> 为 </font>`'PageDown'`<font style="color:rgb(33, 53, 71);"> 时调用事件处理。</font>

#### <font style="color:rgb(33, 53, 71);">按键别名</font>
<font style="color:rgb(33, 53, 71);">Vue 为一些常用的按键提供了别名：</font>

+ `.enter`
+ `.tab`
+ `.delete`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">(捕获“Delete”和“Backspace”两个按键)</font>
+ `.esc`
+ `.space`
+ `.up`
+ `.down`
+ `.left`
+ `.right`

#### 系统按键修饰符
<font style="color:rgb(33, 53, 71);">可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。</font>

+ `.ctrl`
+ `.alt`
+ `.shift`
+ `.meta`

<font style="color:rgb(33, 53, 71);">举例来说：</font>

```Vue
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```

#### 鼠标按键修饰符
+ `.left`
+ `.right`
+ `.middle`

<font style="color:rgb(33, 53, 71);">这些修饰符将处理程序限定为由特定鼠标按键触发的事件。</font>

<font style="color:rgb(33, 53, 71);">但请注意，</font>`.left`<font style="color:rgb(33, 53, 71);">，</font>`.right`<font style="color:rgb(33, 53, 71);"> 和 </font>`.middle`<font style="color:rgb(33, 53, 71);"> 这些修饰符名称是基于常见的右手用鼠标布局设定的，但实际上它们分别指代设备事件触发器的“主”、”次“，“辅助”，而非实际的物理按键。因此，对于左手用鼠标布局而言，“主”按键在物理上可能是右边的按键，但却会触发 </font>`.left`<font style="color:rgb(33, 53, 71);"> 修饰符对应的处理程序。又或者，触控板可能通过单指点击触发 </font>`.left`<font style="color:rgb(33, 53, 71);"> 处理程序，通过双指点击触发 </font>`.right`<font style="color:rgb(33, 53, 71);"> 处理程序，通过三指点击触发 </font>`.middle`<font style="color:rgb(33, 53, 71);"> 处理程序。同样，产生“鼠标”事件的其他设备和事件源，也可能具有与“左”，“右”完全无关的触发模式。</font>

## 表单输入绑定
<font style="color:rgb(33, 53, 71);">在前端处理表单时，我们常常需要将表单输入框的内容同步给 JavaScript 中相应的变量。手动连接值绑定和更改事件监听器可能会很麻烦：</font>

```Vue
<input
  :value="text"
  @input="event => text = event.target.value">
```

`v-model`<font style="color:rgb(33, 53, 71);"> 指令帮我们简化了这一步骤：</font>

```plain
<input v-model="text">
```

<font style="color:rgb(33, 53, 71);">另外，</font>`v-model`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">还可以用于各种不同类型的输入，</font>`<textarea>`<font style="color:rgb(33, 53, 71);">、</font>`<select>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">元素。它会根据所使用的元素自动使用对应的 DOM 属性和事件组合：</font>

+ <font style="color:rgb(33, 53, 71);">文本类型的</font><font style="color:rgb(33, 53, 71);"> </font>`<input>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">和</font><font style="color:rgb(33, 53, 71);"> </font>`<textarea>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">元素会绑定</font><font style="color:rgb(33, 53, 71);"> </font>`value`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">property 并侦听</font><font style="color:rgb(33, 53, 71);"> </font>`input`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">事件；</font>
+ `<input type="checkbox">`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">和</font><font style="color:rgb(33, 53, 71);"> </font>`<input type="radio">`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">会绑定</font><font style="color:rgb(33, 53, 71);"> </font>`checked`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">property 并侦听</font><font style="color:rgb(33, 53, 71);"> </font>`change`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">事件；</font>
+ `<select>`<font style="color:rgb(33, 53, 71);"> 会绑定 </font>`value`<font style="color:rgb(33, 53, 71);"> property 并侦听 </font>`change`<font style="color:rgb(33, 53, 71);"> 事件。</font>

### `v-model`双向数据绑定的原理(重要)

Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，**通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调**。主要分为以下几个步骤：

1. 需要observer的**数据对象进行递归遍历**，包括子属性对象的属性，**都加上setter和getter这样的话**，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化。(**进行数据劫持**)
2. **compile解析模板指令，将模板中的变量替换成数据**，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，**添加监听数据的订阅者**，一旦数据有变动，收到通知，更新视图。(为模板添加数据，绑定订阅者)
3. Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是: 
   - 在自身实例化时往属性**订阅器(dep)**里面添加自己 
   - 自身必须**有一个update()方法**
   - **待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。**
4. MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

![img](https://cdn.nlark.com/yuque/0/2021/png/1500604/1618656573096-ebdc520c-5d60-4d12-ad04-5df4ebbb5fe7.png?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_22%2Ctext_5b6u5L-h5YWs5LyX5Y-377ya5YmN56uv5YWF55S15a6d%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

### <font style="color:rgb(33, 53, 71);">基本用法</font>
#### 文本
```vue
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

#### 多行文本
```vue
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

#### 复选框
<font style="color:rgb(33, 53, 71);">单一的复选框，绑定布尔类型值：</font>

```vue
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

#### 单选按钮
```vue
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

#### 选择器
```vue
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

多选

```vue
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

#### 值绑定
<font style="color:rgb(33, 53, 71);">对于单选按钮，复选框和选择器选项，</font>`v-model`<font style="color:rgb(33, 53, 71);"> 绑定的值通常是静态的字符串 (或者对复选框是布尔值)：</font>

```vue
<!-- `picked` 在被选择时是字符串 "a" -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` 只会为 true 或 false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` 在第一项被选中时为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

<font style="color:rgb(33, 53, 71);">但有时可能希望将该值绑定到当前组件实例上的动态数据。这可以通过使用 </font>`v-bind`<font style="color:rgb(33, 53, 71);"> 来实现。此外，使用 </font>`v-bind`<font style="color:rgb(33, 53, 71);"> 还使我们可以将选项值绑定为非字符串的数据类型。</font>

#### <font style="color:rgb(33, 53, 71);">复选框</font>
```vue
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value`**<font style="color:rgb(33, 53, 71);"> 和 </font>**`false-value`**<font style="color:rgb(33, 53, 71);"> 是 Vue 特有的 attributes，仅支持和 </font>**`v-model`**<font style="color:rgb(33, 53, 71);"> 配套使用。这里 </font>**`toggle`**<font style="color:rgb(33, 53, 71);"> 属性的值会在选中时被设为 </font>**`'yes'`**<font style="color:rgb(33, 53, 71);">，取消选择时设为 </font>**`'no'`**<font style="color:rgb(33, 53, 71);">。</font>**<font style="color:rgb(33, 53, 71);">你同样可以通过 </font>`v-bind`<font style="color:rgb(33, 53, 71);"> 将其绑定为其他动态值：</font>

```vue
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

#### 单选按钮
```vue
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

`pick`<font style="color:rgb(33, 53, 71);"> 会在第一个按钮选中时被设为 </font>`first`<font style="color:rgb(33, 53, 71);">，在第二个按钮选中时被设为 </font>`second`<font style="color:rgb(33, 53, 71);">。</font>

#### <font style="color:rgb(33, 53, 71);">选择器选项</font>
```vue
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model`<font style="color:rgb(33, 53, 71);"> 同样也支持非字符串类型的值绑定！在上面这个例子中，当某个选项被选中，</font>`selected`<font style="color:rgb(33, 53, 71);"> 会被设为该对象字面量值 </font>`{ number: 123 }`<font style="color:rgb(33, 53, 71);">。</font>

### <font style="color:rgb(33, 53, 71);"> 修饰符</font>
#### `.lazy`
<font style="color:rgb(33, 53, 71);">默认情况下，</font>`v-model`<font style="color:rgb(33, 53, 71);"> 会在每次 </font>`input`<font style="color:rgb(33, 53, 71);"> 事件后更新数据。可以</font>**<font style="color:rgb(33, 53, 71);">添加 </font>**`lazy`**<font style="color:rgb(33, 53, 71);"> 修饰符来改为在每次 </font>**`change`**<font style="color:rgb(33, 53, 71);"> 事件后更新数据</font>**<font style="color:rgb(33, 53, 71);">：</font>

```vue
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

#### `.number`
<font style="color:rgb(33, 53, 71);">想</font>**<font style="color:rgb(33, 53, 71);">让用户输入自动转换为数字</font>**<font style="color:rgb(33, 53, 71);">，你可以在 </font>`v-model`<font style="color:rgb(33, 53, 71);"> 后添加 </font>`.number`<font style="color:rgb(33, 53, 71);"> 修饰符来管理输入：</font>

```vue
<input v-model.number="age" />
```

**<font style="color:rgb(33, 53, 71);">如果该值无法被 </font>**`parseFloat()`**<font style="color:rgb(33, 53, 71);"> 处理，那么将返回原始值。特别是当输入为空时 (例如用户清空输入字段之后)，会返回一个空字符串</font>**<font style="color:rgb(33, 53, 71);">。这种行为与 </font>[<font style="color:rgb(66, 184, 131);">DOM 属性 valueAsNumber</font>](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement#valueasnumber)<font style="color:rgb(33, 53, 71);"> 有所不同。</font>

`number`<font style="color:rgb(33, 53, 71);"> 修饰符会在输入框有 </font>`type="number"`<font style="color:rgb(33, 53, 71);"> 时自动启用。</font>

#### `.trim`
<font style="color:rgb(33, 53, 71);">想要默认自动去除用户输入内容中两端的空格，你可以在 </font>`v-model`<font style="color:rgb(33, 53, 71);"> 后添加 </font>`.trim`<font style="color:rgb(33, 53, 71);"> 修饰符：</font>

```vue
<input v-model.trim="msg" />
```

## 侦听器
<font style="color:rgb(33, 53, 71);">在组合式 API 中，可以</font>**<font style="color:rgb(33, 53, 71);">使用 </font>**[**<font style="color:rgb(66, 184, 131);">watch函数</font>**](https://cn.vuejs.org/api/reactivity-core.html#watch)**<font style="color:rgb(33, 53, 71);">在每次响应式状态发生变化时触发回调函数</font>**<font style="color:rgb(33, 53, 71);">：</font>

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

### 侦听数据源类型
`watch`<font style="color:rgb(33, 53, 71);"> 的第一个参数可以是不同形式的“数据源”：它</font>**<font style="color:rgb(33, 53, 71);">可以是一个 ref (包括计算属性)、一个响应式对象、一个 </font>**[**<font style="color:rgb(66, 184, 131);">getter 函数</font>**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get#description)**<font style="color:rgb(33, 53, 71);">、或多个数据源组成的数组</font>**<font style="color:rgb(33, 53, 71);">：</font>

```vue
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

**<font style="color:rgb(33, 53, 71);">注：不能直接侦听响应式对象的属性值</font>**

```Vue
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`)
})
```

```vue
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)
```

### 深层侦听器
<font style="color:rgb(33, 53, 71);">直接给 </font>`watch()`<font style="color:rgb(33, 53, 71);"> </font>**<font style="color:rgb(33, 53, 71);">传入一个响应式对象，会隐式地创建一个深层侦听器</font>**<font style="color:rgb(33, 53, 71);">——该回调函数在所有嵌套的变更时都会被触发：</font>

```vue
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```

<font style="color:rgb(33, 53, 71);">相比之下，一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调：</font>

```vue
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)
```

<font style="color:rgb(33, 53, 71);">可以给上面这个例子显式地加上 </font>`deep`<font style="color:rgb(33, 53, 71);"> 选项，强制转成深层侦听器：</font>

```vue
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```

`deep`**<font style="color:rgb(33, 53, 71);"> 选项还可以是一个数字，表示最大遍历深度——即 Vue 应该遍历对象嵌套属性的级数。</font>**

### <font style="color:rgb(33, 53, 71);">即时回调的侦听器</font>
`watch`<font style="color:rgb(33, 53, 71);"> 默认是懒执行的：</font>**<font style="color:rgb(33, 53, 71);">仅当数据源变化时，才会执行回调</font>**<font style="color:rgb(33, 53, 71);">。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。</font>

<font style="color:rgb(33, 53, 71);">可以</font>**<font style="color:rgb(33, 53, 71);">通过传入 </font>**`immediate: true`**<font style="color:rgb(33, 53, 71);"> 选项来强制侦听器的回调立即执行</font>**<font style="color:rgb(33, 53, 71);">：</font>

```vue
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
```

### 一次性侦听器
<font style="color:rgb(33, 53, 71);">每当被侦听源发生变化时，侦听器的回调就会执行。</font>**<font style="color:rgb(33, 53, 71);">如果希望回调只在源变化时触发一次，请使用 </font>**`once: true`**<font style="color:rgb(33, 53, 71);"> 选项。</font>**

```vue
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```

### `watchEffect()`
`watchEffect()`<font style="color:rgb(33, 53, 71);"> 允许我们自动跟踪回调的响应式依赖。</font>

```vue
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

```vue
const todoId = ref(1)
const data = ref(null)

watch(
  todoId,
  async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
  },
  { immediate: true }
)
```

<font style="color:rgb(33, 53, 71);">在执行期间，它会自动追踪 </font>`todoId.value`<font style="color:rgb(33, 53, 71);"> 作为依赖（和计算属性类似）。每当 </font>`todoId.value`<font style="color:rgb(33, 53, 71);"> 变化时，回调会再次执行。有了 </font>`watchEffect()`<font style="color:rgb(33, 53, 71);">，我们不再需要明确传递 </font>`todoId`<font style="color:rgb(33, 53, 71);"> 作为源值。</font>

### `watch` vs `watchEffect`
`watch`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">和</font><font style="color:rgb(33, 53, 71);"> </font>`watchEffect`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：</font>

+ `watch`**<font style="color:rgb(33, 53, 71);"> 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。</font>**<font style="color:rgb(33, 53, 71);">另外，仅在数据源确实改变时才会触发回调。</font>`watch`<font style="color:rgb(33, 53, 71);"> 会避免在发生副作用时追踪依赖，因此，能更加精确地控制回调函数的触发时机。</font>
+ `watchEffect`**<font style="color:rgb(33, 53, 71);">，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性</font>**<font style="color:rgb(33, 53, 71);">。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。</font>

### <font style="color:rgb(33, 53, 71);">副作用清理</font>
**<font style="color:rgb(33, 53, 71);">可以使用 </font>**[**<font style="color:rgb(66, 184, 131);">onWatcherCleanup()</font>**](https://cn.vuejs.org/api/reactivity-core.html#onwatchercleanup)**<font style="color:rgb(33, 53, 71);">  API 来注册一个清理函数，当侦听器失效并准备重新运行时会被调用</font>**

```vue
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})
```

<font style="color:rgb(33, 53, 71);">请注意，</font>`onWatcherCleanup`<font style="color:rgb(33, 53, 71);"> 仅在 Vue 3.5+ 中支持，并且必须在 </font>`watchEffect`<font style="color:rgb(33, 53, 71);"> 效果函数或 </font>`watch`<font style="color:rgb(33, 53, 71);"> 回调函数的同步执行期间调用：你不能在异步函数的 </font>`await`<font style="color:rgb(33, 53, 71);"> 语句之后调用它。</font>

**<font style="color:rgb(33, 53, 71);">作为替代，</font>**`onCleanup`**<font style="color:rgb(33, 53, 71);"> 函数还作为第三个参数传递给侦听器回调，以及 </font>**`watchEffect`**<font style="color:rgb(33, 53, 71);"> 作用函数的第一个参数</font>**<font style="color:rgb(33, 53, 71);">：</font>

```vue
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```

### 回调的触发时机
<font style="color:rgb(33, 53, 71);">更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。</font>

<font style="color:rgb(33, 53, 71);">类似于组件更新，用户创建的侦听器回调函数也会被批量处理以避免重复调用。例如，如果我们同步将一千个项目推入被侦听的数组中，我们可能不希望侦听器触发一千次。</font>

<font style="color:rgb(33, 53, 71);">默认情况下，</font>**<font style="color:rgb(33, 53, 71);">侦听器回调会在父组件更新 (如有) 之后、所属组件的 DOM 更新之前被调用</font>**<font style="color:rgb(33, 53, 71);">。这意味着如果你尝试在侦听器回调中访问所属组件的 DOM，那么 DOM 将处于更新前的状态。</font>

#### <font style="color:rgb(33, 53, 71);">Post Watchers</font>
<font style="color:rgb(33, 53, 71);">如果想在侦听器回调中能访问被 Vue 更新</font>**<font style="color:rgb(33, 53, 71);">之后</font>**<font style="color:rgb(33, 53, 71);">的所属组件的 DOM，你需要指明 </font>`flush: 'post'`<font style="color:rgb(33, 53, 71);"> 选项：</font>

```vue
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

<font style="color:rgb(33, 53, 71);">后置刷新的 </font>`watchEffect()`<font style="color:rgb(33, 53, 71);"> 有个更方便的别名 </font>`watchPostEffect()`<font style="color:rgb(33, 53, 71);">：</font>

```vue
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

#### 同步侦听器
<font style="color:rgb(33, 53, 71);">还可以创建一个同步触发的侦听器，它会在 Vue 进行任何更新之前触发：</font>

```vue
watch(source, callback, {
  flush: 'sync'
})

watchEffect(callback, {
  flush: 'sync'
})
```

<font style="color:rgb(33, 53, 71);">同步触发的 </font>`watchEffect()`<font style="color:rgb(33, 53, 71);"> 有个更方便的别名 </font>`watchSyncEffect()`<font style="color:rgb(33, 53, 71);">：</font>

```vue
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
})
```

### 停止侦听器
<font style="color:rgb(33, 53, 71);">在</font><font style="color:rgb(33, 53, 71);"> </font>`setup()`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">或</font><font style="color:rgb(33, 53, 71);"> </font>`<script setup>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。</font>

<font style="color:rgb(33, 53, 71);">一个关键点是，侦听器必须用</font>**<font style="color:rgb(33, 53, 71);">同步</font>**<font style="color:rgb(33, 53, 71);">语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。如下方这个例子：</font>

```vue
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

<font style="color:rgb(33, 53, 71);">要手动停止一个侦听器，请调用 </font>`watch`<font style="color:rgb(33, 53, 71);"> 或 </font>`watchEffect`<font style="color:rgb(33, 53, 71);"> 返回的函数：</font>

```vue
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

<font style="color:rgb(33, 53, 71);">注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：</font>

```vue
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```

## 模板引用
<font style="color:rgb(33, 53, 71);">虽然 Vue 的声明性渲染模型为你抽象了大部分对 DOM 的直接操作，但在某些情况下，我们仍然需要</font>**<font style="color:rgb(33, 53, 71);">直接访问底层 DOM 元素</font>**<font style="color:rgb(33, 53, 71);">。要实现这一点，我们可以</font>**<font style="color:rgb(33, 53, 71);">使用特殊的 </font>**`ref`**<font style="color:rgb(33, 53, 71);"> attribute</font>**<font style="color:rgb(33, 53, 71);">：</font>

```vue
<input ref="input">
```

`ref`<font style="color:rgb(33, 53, 71);"> 是一个特殊的 attribute，和 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 章节中提到的 </font>`key`<font style="color:rgb(33, 53, 71);"> 类似。它</font>**<font style="color:rgb(33, 53, 71);">允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。</font>**

### <font style="color:rgb(33, 53, 71);">访问模板引用</font>
<font style="color:rgb(33, 53, 71);">要在组合式 API 中获取引用，我们可以使用辅助函数 </font>[<font style="color:rgb(66, 184, 131);">useTemplateRef()</font>](https://cn.vuejs.org/api/composition-api-helpers.html#usetemplateref)<font style="color:rgb(33, 53, 71);"> ：</font>

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

<font style="color:rgb(33, 53, 71);">注意，只可以</font>**<font style="color:rgb(33, 53, 71);">在组件挂载后</font>**<font style="color:rgb(33, 53, 71);">才能访问模板引用。如果你想在模板中的表达式上访问 </font>`input`<font style="color:rgb(33, 53, 71);">，在初次渲染时会是 </font>`null`<font style="color:rgb(33, 53, 71);">。这是因为在初次渲染前这个元素还不存在呢！</font>

<font style="color:rgb(33, 53, 71);">如果你需要侦听一个模板引用 ref 的变化，确保考虑到其值为 </font>`<font style="color:rgb(71, 101, 130);background-color:rgb(241, 241, 241);">null</font>`<font style="color:rgb(33, 53, 71);"> 的情况：</font>

```plain
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})
```

### `v-for`中的模板引用
**<font style="color:rgb(33, 53, 71);">当在 </font>**`v-for`**<font style="color:rgb(33, 53, 71);"> 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：</font>**

```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = useTemplateRef('items')

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

<font style="color:rgb(33, 53, 71);">应该注意的是，ref 数组</font>**<font style="color:rgb(33, 53, 71);">并不</font>**<font style="color:rgb(33, 53, 71);">保证与源数组相同的顺序。</font>

### <font style="color:rgb(33, 53, 71);">函数模板引用</font>
`ref`<font style="color:rgb(33, 53, 71);"> attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。该函数会收到元素引用作为其第一个参数：</font>

```vue
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```

**<font style="color:rgb(33, 53, 71);">注意这里需要使用动态的 </font>**`:ref`**<font style="color:rgb(33, 53, 71);"> 绑定才能够传入一个函数。当绑定的元素被卸载时，函数也会被调用一次，此时的 </font>**`el`**<font style="color:rgb(33, 53, 71);"> 参数会是 </font>**`null`**<font style="color:rgb(33, 53, 71);">。</font>**<font style="color:rgb(33, 53, 71);">你当然也可以绑定一个组件方法而不是内联函数。</font>

### <font style="color:rgb(33, 53, 71);">组件上的ref</font>
<font style="color:rgb(33, 53, 71);">模板引用也可以被用在一个子组件上。这种情况下引用中获得的值是组件实例：</font>

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = useTemplateRef('child')

onMounted(() => {
  // childRef.value 将持有 <Child /> 的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

<font style="color:rgb(33, 53, 71);">如果一个子组件使用的是选项式 API 或没有使用 </font>`<script setup>`<font style="color:rgb(33, 53, 71);">，被引用的组件实例和该子组件的 </font>`this`<font style="color:rgb(33, 53, 71);"> 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易，当然也因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互。</font>

<font style="color:rgb(33, 53, 71);">有一个例外的情况，使用了 </font>`<script setup>`<font style="color:rgb(33, 53, 71);"> 的组件是</font>**<font style="color:rgb(33, 53, 71);">默认私有</font>**<font style="color:rgb(33, 53, 71);">的：一个父组件无法访问到一个使用了 </font>`<script setup>`<font style="color:rgb(33, 53, 71);"> 的子组件中的任何东西，除非子组件在其中通过 </font>`defineExpose`<font style="color:rgb(33, 53, 71);"> 宏显式暴露：</font>

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>
```

<font style="color:rgb(33, 53, 71);">当父组件通过模板引用获取到了该组件的实例时，得到的实例类型为</font><font style="color:rgb(33, 53, 71);"> </font>`{ a: number, b: number }`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">(ref 都会自动解包，和一般的实例一样)。</font>

<font style="color:rgb(33, 53, 71);">请注意，defineExpose 必须在任何 await 操作之前调用。否则，在 await 操作后暴露的属性和方法将无法访问。</font>

## <font style="color:rgb(33, 53, 71);">组件基础</font>
<font style="color:rgb(33, 53, 71);">组件允许我们将 UI 划分为独立的、可重用的部分，并且可以对每个部分进行单独的思考。在实际应用中，组件常常被组织成一个层层嵌套的树状结构：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/43189118/1747409906179-d0f0d8df-f6e5-4eef-afec-2fd2efeaf835.png)

<font style="color:rgb(33, 53, 71);">这和我们嵌套 HTML 元素的方式类似，Vue 实现了自己的组件模型，使我们可以在每个组件内封装自定义内容与逻辑。</font>

### <font style="color:rgb(33, 53, 71);">定义一个组件</font>
<font style="color:rgb(33, 53, 71);">当使用构建步骤时，一般会将 Vue 组件定义在一个单独的 </font>`.vue`<font style="color:rgb(33, 53, 71);"> 文件中，这被叫做</font>[<font style="color:rgb(66, 184, 131);">单文件组件</font>](https://cn.vuejs.org/guide/scaling-up/sfc.html)<font style="color:rgb(33, 53, 71);"> (简称 SFC)：</font>

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

<font style="color:rgb(33, 53, 71);">当不使用构建步骤时，一个 Vue 组件以一个包含 Vue 特定选项的 JavaScript 对象来定义：</font>

```vue
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
  // 也可以针对一个 DOM 内联模板：
  // template: '#my-template-element'
}
```

<font style="color:rgb(33, 53, 71);">这里的模板是一个内联的 JavaScript 字符串，Vue 将会在运行时编译它。你也可以使用 ID 选择器来指向一个元素 (通常是原生的</font><font style="color:rgb(33, 53, 71);"> </font>`<template>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">元素)，Vue 将会使用其内容作为模板来源。</font>

<font style="color:rgb(33, 53, 71);">上面的例子中定义了一个组件，并在一个 </font>`.js`<font style="color:rgb(33, 53, 71);"> 文件里默认导出了它自己，但你也可以通过具名导出在一个文件中导出多个组件。</font>

### <font style="color:rgb(33, 53, 71);">使用组件</font>
<font style="color:rgb(33, 53, 71);">要使用一个子组件，我们需要在父组件中导入它。假设我们把计数器组件放在了一个叫做 </font>`ButtonCounter.vue`<font style="color:rgb(33, 53, 71);"> 的文件中，这个组件将会以默认导出的形式被暴露给外部。</font>

```vue
<script setup>
import ButtonCounter from './ButtonCounter.vue'
</script>

<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```

<font style="color:rgb(33, 53, 71);">通过</font><font style="color:rgb(33, 53, 71);"> </font>`<script setup>`<font style="color:rgb(33, 53, 71);">，导入的组件都在模板中直接可用。</font>

<font style="color:rgb(33, 53, 71);">当然，可以全局地注册一个组件，使得它在当前应用中的任何组件上都可以使用，而不需要额外再导入。</font>

<font style="color:rgb(33, 53, 71);">组件可以被重用任意多次：</font>

```vue
<h1>Here is a child component!</h1>
<ButtonCounter />
<ButtonCounter />
<ButtonCounter />
```

<font style="color:rgb(33, 53, 71);">每当点击这些按钮时，每一个组件都维护着自己的状态，是不同的 </font>`count`<font style="color:rgb(33, 53, 71);">。这是因为每当你使用一个组件，就创建了一个新的</font>**<font style="color:rgb(33, 53, 71);">实例</font>**<font style="color:rgb(33, 53, 71);">。</font>

<font style="color:rgb(33, 53, 71);">在单文件组件中，推荐为子组件使用</font><font style="color:rgb(33, 53, 71);"> </font>`PascalCase`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">的标签名，以此来和原生的 HTML 元素作区分。虽然原生 HTML 标签名是不区分大小写的，但 Vue 单文件组件是可以在编译中区分大小写的。我们也可以使用</font><font style="color:rgb(33, 53, 71);"> </font>`/>`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">来关闭一个标签。</font>

<font style="color:rgb(33, 53, 71);">如果你是直接在 DOM 中书写模板 (例如原生 </font>`<template>`<font style="color:rgb(33, 53, 71);"> 元素的内容)，模板的编译需要遵从浏览器中 HTML 的解析行为。在这种情况下，你应该需要使用 </font>`kebab-case`<font style="color:rgb(33, 53, 71);"> 形式并显式地关闭这些组件的标签。</font>

```vue
<!-- 如果是在 DOM 中书写该模板 -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>
```

### 传递props
<font style="color:rgb(33, 53, 71);">Props 是一种特别的 attributes，你可以在组件上声明注册。要传递给博客文章组件一个标题，我们必须在组件的 props 列表上声明它。这里要用到 </font>[<font style="color:rgb(66, 184, 131);">defineProps</font>](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)<font style="color:rgb(33, 53, 71);"> 宏：</font>

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

`defineProps`<font style="color:rgb(33, 53, 71);"> 是一个仅 </font>`<script setup>`<font style="color:rgb(33, 53, 71);"> 中可用的编译宏命令，并不需要显式地导入。声明的 props 会自动暴露给模板。</font>`defineProps`<font style="color:rgb(33, 53, 71);"> 会返回一个对象，其中包含了可以传递给组件的所有 props：</font>

```vue
const props = defineProps(['title'])
console.log(props.title)
```

<font style="color:rgb(33, 53, 71);">一个组件可以有任意多的 props，默认情况下，所有 prop 都接受任意类型的值。</font>

<font style="color:rgb(33, 53, 71);">当一个 prop 被注册后，可以像这样以自定义 attribute 的形式传递数据给它：</font>

```vue
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

<font style="color:rgb(33, 53, 71);">在实际应用中，我们可能在父组件中会有如下的一个博客文章数组：</font>

```vue
const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])
```

<font style="color:rgb(33, 53, 71);">这种情况下，我们可以使用 </font>`v-for`<font style="color:rgb(33, 53, 71);"> 来渲染它们：</font>

```vue
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
  />
```

#### 监听事件
<font style="color:rgb(33, 53, 71);">在父组件中，我们可以添加一个 </font>`postFontSize`<font style="color:rgb(33, 53, 71);"> ref 来实现这个效果：</font>

```vue
const posts = ref([
  /* ... */
])

const postFontSize = ref(1)
```

<font style="color:rgb(33, 53, 71);">在模板中用它来控制所有博客文章的字体大小：</font>

```vue
<div :style="{ fontSize: postFontSize + 'em' }">
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
    />
</div>
```

<font style="color:rgb(33, 53, 71);">然后，给 </font>`<BlogPost>`<font style="color:rgb(33, 53, 71);"> 组件添加一个按钮：</font>

```vue
<!-- BlogPost.vue, 省略了 <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button>Enlarge text</button>
  </div>
</template>
```

<font style="color:rgb(33, 53, 71);">这个按钮目前还没有做任何事情，我们想要点击这个按钮来告诉父组件它应该放大所有博客文章的文字。要解决这个问题，组件实例提供了一个自定义事件系统。父组件可以通过 </font>`v-on`<font style="color:rgb(33, 53, 71);"> 或 </font>`@`<font style="color:rgb(33, 53, 71);"> 来选择性地监听子组件上抛的事件，就像监听原生 DOM 事件那样：</font>

```vue
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
  />
```

**<font style="color:rgb(33, 53, 71);">子组件可以通过调用内置的 </font>**[**<font style="color:rgb(66, 184, 131);">$emit方法</font>**](https://cn.vuejs.org/api/component-instance.html#emit)**<font style="color:rgb(33, 53, 71);">，通过传入事件名称来抛出一个事件：</font>**

```vue
<!-- BlogPost.vue, 省略了 <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```

<font style="color:rgb(33, 53, 71);">因为有了 </font>`@enlarge-text="postFontSize += 0.1"`<font style="color:rgb(33, 53, 71);"> 的监听，父组件会接收这一事件，从而更新 </font>`postFontSize`<font style="color:rgb(33, 53, 71);"> 的值。</font>

<font style="color:rgb(33, 53, 71);">可以通过 </font>[<font style="color:rgb(66, 184, 131);">defineEmits</font>](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)<font style="color:rgb(33, 53, 71);"> 宏来声明需要抛出的事件：</font>

```vue
<!-- BlogPost.vue -->
<script setup>
defineProps(['title'])
defineEmits(['enlarge-text'])
</script>
```

<font style="color:rgb(33, 53, 71);">这声明了一个组件可能触发的所有事件，还可以对事件的参数进行</font>[<font style="color:rgb(66, 184, 131);">验证</font>](https://cn.vuejs.org/guide/components/events.html#validate-emitted-events)<font style="color:rgb(33, 53, 71);">。同时，这还可以让 Vue 避免将它们作为原生事件监听器隐式地应用于子组件的根元素。</font>

<font style="color:rgb(33, 53, 71);">和 </font>`defineProps`<font style="color:rgb(33, 53, 71);"> 类似，</font>`defineEmits`<font style="color:rgb(33, 53, 71);"> 仅可用于 </font>`<script setup>`<font style="color:rgb(33, 53, 71);"> 之中，并且不需要导入，它返回一个等同于 </font>`$emit`<font style="color:rgb(33, 53, 71);"> 方法的 </font>`emit`<font style="color:rgb(33, 53, 71);"> 函数。它可以被用于在组件的 </font>`<script setup>`<font style="color:rgb(33, 53, 71);"> 中抛出事件，因为此处无法直接访问 </font>`$emit`<font style="color:rgb(33, 53, 71);">：</font>

```vue
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>
```

### 通过插槽来分配内容
<font style="color:rgb(33, 53, 71);">一些情况下我们会希望能和 HTML 元素一样向组件中传递内容：</font>

```vue
<AlertBox>
  Something bad happened.
</AlertBox>
```

<font style="color:rgb(33, 53, 71);">这可以通过 Vue 的自定义 </font>`<slot>`<font style="color:rgb(33, 53, 71);"> 元素来实现：</font>

```vue
<!-- AlertBox.vue -->
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>

<style scoped>
.alert-box {
  /* ... */
}
</style>
```

<font style="color:rgb(33, 53, 71);">使用 </font>`<slot>`<font style="color:rgb(33, 53, 71);"> 作为一个占位符，父组件传递进来的内容就会渲染在这里。</font>

### <font style="color:rgb(33, 53, 71);">动态组件</font>
<font style="color:rgb(33, 53, 71);">上面的例子是通过 Vue 的 </font>`<component>`<font style="color:rgb(33, 53, 71);"> 元素和特殊的 </font>`is`<font style="color:rgb(33, 53, 71);"> attribute 实现的：</font>

```vue
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

<font style="color:rgb(33, 53, 71);">在上面的例子中，被传给</font><font style="color:rgb(33, 53, 71);"> </font>`:is`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">的值可以是以下几种：</font>

+ <font style="color:rgb(33, 53, 71);">被注册的组件名</font>
+ <font style="color:rgb(33, 53, 71);">导入的组件对象</font>

<font style="color:rgb(33, 53, 71);">你也可以使用</font><font style="color:rgb(33, 53, 71);"> </font>`is`<font style="color:rgb(33, 53, 71);"> </font><font style="color:rgb(33, 53, 71);">attribute 来创建一般的 HTML 元素。</font>

<font style="color:rgb(33, 53, 71);">当使用 </font>`<component :is="...">`<font style="color:rgb(33, 53, 71);"> 来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 </font>[<font style="color:rgb(66, 184, 131);"><KeepAlive>组件</font>](https://cn.vuejs.org/guide/built-ins/keep-alive.html)<font style="color:rgb(33, 53, 71);">强制被切换掉的组件仍然保持“存活”的状态。</font>

## 生命周期

### 注册周期钩子

`onMounted` 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码：

```Vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

当调用 `onMounted` 时，Vue 会自动将回调函数注册到当前正被初始化的组件实例上。

### 生命周期图示

下面是实例生命周期的图表。你现在并不需要完全理解图中的所有内容，但以后它将是一个有用的参考。

![组件生命周期图示](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)

Vue 实例有⼀个完整的⽣命周期，也就是从**开始创建、初始化数据、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期**。 

1. **beforeCreate（创建前）**：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说**不能访问到data、computed、watch、methods上的方法和数据**。
2. **created（创建后）** ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以**不能访问到 `$el` 属性**。
3. **beforeMount（挂载前）**：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：**编译模板，把data里面的数据和模板生成html**。此时还没有挂载html到页面上。
4. **mounted（挂载后）**：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：**用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中**。此过程中进行ajax交互。
5. **beforeUpdate（更新前）**：**响应式数据更新时调用，此时虽然响应式数据更新了**，但是对应的真实 DOM **还没有被渲染**。
6. **updated（更新后）** ：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。**调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作**。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
7. **beforeDestroy（销毁前）**：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。
8. **destroyed（销毁后）**：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。

# 深入组件

## 组件注册

一个 Vue 组件在使用前需要先被“注册”，这样 Vue 才能在渲染模板时找到其对应的实现。**组件注册有两种方式：全局注册和局部注册。**

### 全局注册

可以使用 [Vue 应用实例](https://cn.vuejs.org/guide/essentials/application.html)的 `.component()` 方法，让组件在当前 Vue 应用中全局可用。

```vue
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // 注册的名字
  'MyComponent',
  // 组件的实现
  {
    /* ... */
  }
)
```

### 局部注册

全局注册虽然很方便，但有以下几个问题：

1. **全局注册，但并没有被使用的组件无法在生产打包时被自动移除 (也叫“tree-shaking”)。**如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中。
2. **全局注册在大型项目中使项目的依赖关系变得不那么明确。**在父组件中使用子组件时，不太容易定位子组件的实现。和使用过多的全局变量一样，这可能会影响应用长期的可维护性。

相比之下，局部注册的组件需要在使用它的父组件中显式导入，并且只能在该父组件中使用。它的优点是使组件之间的依赖关系更加明确，并且对 tree-shaking 更加友好。

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

如果没有使用 `<script setup>`，则需要使用 `components` 选项来显式注册：

```vue
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

## Props

### Props声明

一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute。

在使用 `<script setup>` 的单文件组件中，props 可以使用 `defineProps()` 宏来声明：

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

在没有使用 `<script setup>` 的组件中，props 可以使用 [`props`](https://cn.vuejs.org/api/options-state.html#props) 选项来声明：

```vue
export default {
  props: ['foo'],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo)
  }
}
```

注意传递给 `defineProps()` 的参数和提供给 `props` 选项的值是相同的，两种声明方式背后其实使用的都是 props 选项。

### 响应式Props解构

Vue 的响应系统基于属性访问跟踪状态的使用情况。例如，在计算属性或侦听器中访问 `props.foo` 时，`foo` 属性将被跟踪为依赖项。

```vue
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
  console.log(foo)
})
```

```vue
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` 由编译器转换为 `props.foo`
  console.log(props.foo)
})
```

### 传递Prop的细节

#### Prop名字格式

如果一个 prop 的名字很长，应使用 camelCase 形式，因为它们是合法的 JavaScript 标识符，可以直接在模板的表达式中使用，也可以避免在作为属性 key 名时必须加上引号。

```vue
defineProps({
  greetingMessage: String
})
```

```
<span>{{ greetingMessage }}</span>
```

可以在向子组件传递 props 时使用 camelCase 形式 (使用 [DOM 内模板](https://cn.vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)时例外)，但实际上为了和 HTML attribute 对齐，通常会将其写为 kebab-case 形式：

```
<MyComponent greeting-message="hello" />
```

#### 静态 vs 动态Props

静态值形式的 props：

```vue
<BlogPost title="My journey with Vue" />
```

还有使用 `v-bind` 或缩写 `:` 来进行动态绑定的 props：

```vue
<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title" />

<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

#### 传递不同的值类型

- Number
- Boolean
- Array
- Object

#### 使用一个对象绑定多个Prop

想要将一个对象的所有属性都当作 props 传入，你可以使用[没有参数的 `v-bind`](https://cn.vuejs.org/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes)，即只使用 `v-bind` 而非 `:prop-name`。例如，这里有一个 `post` 对象：

```
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
<BlogPost v-bind="post" />
```

### 单向数据流

所有的 props 都遵循着**单向绑定**原则，props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。

todo



# Vue性能优化

**1）编码阶段**

- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
- **v-if和v-for不能连用**
- 如果需要使用v-for给每项元素绑定事件时使用事件代理
- **SPA 页面采用keep-alive缓存组件**
- 在更多的情况下，使用v-if替代v-show
- key保证唯一
- **使用路由懒加载、异步组件**
- **防抖、节流**
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载
- **图片懒加载**

**（2）SEO优化**

- 预渲染
- 服务端渲染SSR

**（3）打包优化**

- **压缩代码**
- **Tree Shaking/Scope Hoisting**
- **使用cdn加载第三方模块**
- **多线程打包happypack**
- splitChunks抽离公共文件
- sourceMap优化

**（4）用户体验**

- 骨架屏
- PWA
- 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。

## keep-alive

如果需要在组件切换的时候，**保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件**。

**(1）keep-alive**

keep-alive有以下三个属性：

- include 字符串或正则表达式，只有**名称匹配的组件会被缓存**；
- exclude 字符串或正则表达式，**任何名称匹配的组件都不会被缓存**；
- max 数字，**最多可以缓存多少组件实例**。



注意：keep-alive 包裹动态组件时，会缓存不活动的组件实例。

**主要流程**

1. **判断组件 name ，不在 include 或者在 exclude 中**，直接返回 vnode，说明该组件不被缓存。
2. **获取组件实例 key ，如果有获取实例的 key，否则重新生成**。
3. key生成规则，cid +"∶∶"+ tag ，仅靠cid是不够的，因为相同的构造函数可以注册为不同的本地组件。
4. **如果缓存对象内存在，则直接从缓存对象中获取组件实例给 vnode ，不存在则添加到缓存对象中**。 
5. 最大缓存数量，**当缓存组件数量超过 max 值时，清除 keys 数组内第一个组件**。

keep-alive 具体是**通过 cache 数组缓存所有组件的 vnode 实例**。当 cache 内原有组件被使用时会将该组件 key 从 keys 数组中删除，然后 push 到 keys数组最后，以便清除最不常用组件

## keep-alive的生命周期

如果为一个组件包裹了 keep-alive，那么它**会多出两个生命周期：deactivated、activated。同时，beforeDestroy 和 destroyed 就不会再被触发了，因为组件不会被真正销毁。**

**当组件被换掉时，会被缓存到内存中、触发 deactivated 生命周期；当组件被切回来时，再去缓存里找这个组件、触发 activated钩子函数。**

# SPA应用

**概念：**

- SPA单页面应用（SinglePage Web Application），指**只有一个主页面的应用，一开始只需要加载一次js、css等相关资源。所有内容都包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换相关组件，仅仅刷新局部资源**。
- MPA多页面应用 （MultiPage Application），指有**多个独立页面的应用，每个页面必须重复加载js、css等相关资源。多页应用跳转，需要整页资源刷新**。



**区别：**

![img](https://cdn.nlark.com/yuque/0/2021/jpeg/1500604/1609521413572-54d0bd0f-8ed6-4438-997a-c890e4cd9c5e.jpeg?x-oss-process=image%2Fwatermark%2Ctype_d3F5LW1pY3JvaGVp%2Csize_29%2Ctext_5b6u5L-h5YWs5LyX5Y-377ya5YmN56uv5YWF55S15a6d%2Ccolor_FFFFFF%2Cshadow_50%2Ct_80%2Cg_se%2Cx_10%2Cy_10)

**SPA的优点：**

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，SPA 相对对服务器压力小；
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；



**SPA的缺点：**

- **初次加载耗时多**：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- **SEO 难度较大**：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

## SPA加速

常见的几种SPA首屏优化方式

- **减小入口文件体积**：路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加
- **静态资源本地缓存**：采用`HTTP`缓存，采用`Service Worker`离线缓存，前端合理利用`localStorage`
- **UI框架按需加载**：按需加载UI框架
- **图片资源的压缩**
- 组件重复打包
- **开启GZip压缩**
- **使用SSR**

# Vue2和Vue3的区别

## 1、双向数据绑定原理不同

**vue2**：vue2的双向数据绑定是利用**ES5的一个APIObject.defineProperty()** 对数据进行劫持，结合发布订阅模式的方式来实现的。

**vue3**：vue3中使用了**ES6的Proxy API**对数据代理。相比vue2.x，使用proxy的优势如下：

- defineProperty只能监听某个属性，不能对全对象监听
- 可以省去for in，闭包等内容来提升效率(直接绑定整个对象即可)
- 可以监听数组，不用再去单独的对数组做特异性操作vue3.x可以检测到数组内部数据的变化。

## 2、是否支持碎片

**vue2**：vue2**不支持**碎片。

**vue3**：vue3**支持碎片（Fragments）** ，就是说可以拥有多个根节点。

## 3、API类型不同

**vue2**：vue2使用**选项类型api**，选项型api在代码里分割了不同的属性：data,computed,methods等。

**vue3**：vue3使用**合成型api**，新的合成型api能让我们使用方法来分割，相比于旧的api使用属性来分组，这样代码会更加简便和整洁。

## 4、定义数据变量和方法不同

**vue2**：vue2是把数据放入data中，在vue2中定义数据变量是**data(){}** ，创建的方法要在**methods:{}** 中。

**vue3**：vue3就需要使用一个**新的setup()方法**，此方法在组件初始化构造的时候触发。使用以下三个步骤来建立反应性数据：

- 从vue引入**reactive**；
- 使用**reactive()** 方法来声明数据为响应性数据；
- 使用setup()方法来返回我们的响应性数据，从而**template**可以获取这些响应性数据。

## 5、生命周期钩子函数不同

**vue2**：**vue2中的生命周期**：

- beforeCreate 组件创建之前
- created 组件创建之后
- beforeMount 组价挂载到页面之前执行
- mounted 组件挂载到页面之后执行
- beforeUpdate 组件更新之前
- updated 组件更新之后

**vue3**：**vue3中的生命周期**：

- **setup 开始创建组件**
- onBeforeMount 组价挂载到页面之前执行
- onMounted 组件挂载到页面之后执行
- onBeforeUpdate 组件更新之前
- onUpdated 组件更新之后

而且vue3.x 生命周期在调用前需要先进行引入。除了这些钩子函数外，vue3.x还增加了onRenderTracked 和onRenderTriggered函数。

## 6、父子传参不同

**vue2**：父传子，用props,子传父用事件 Emitting Events。在vue2中，会**调用this$emit**然后传入事件名和对象。

**vue3**：父传子，用props,子传父用事件 Emitting Events。在vue3中的setup()中的第二个参数content对象中就有emit，那么我们只要在setup()接收**第二个参数中使用分解对象法取出emit**就可以在setup方法中随意使用了。

## 7、指令与插槽不同

**vue2**：vue2中使用slot可以**直接使用slot**；v-for与v-if在vue2中优先级高的是**v-for指令**，而且不建议一起使用。

**vue3**：vue3中必须使用**v-slot的形式**；vue3中v-for与v-if,只会把当前v-if当做v-for中的一个判断语句，**不会相互冲突**；vue3中移除keyCode作为v-on的修饰符，当然也不支持config.keyCodes；vue3中**移除v-on.native修饰符**；vue3中**移除过滤器filter**。

## 8、main.js文件不同

**vue2**：vue2中我们可以使用**pototype(原型)** 的形式去进行操作，引入的是**构造函数**。

**vue3**：vue3中需要使用**结构**的形式进行操作，引入的是**工厂函数**；vue3中app组件中可以**没有根标签**。

