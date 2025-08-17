/*
 * MyVue构造函数，用于创建一个简单的Vue实例
 * @param {Object} options - 配置选项
 * @param {Object} options.data - 组件数据
 * @param {string} options.el - 挂载元素选择器
 * @param {Object} options.computed - 计算属性
 * @param {Object} options.methods - 方法
 */
function MyVue(options = {}) {
  // 保存配置选项
  this.$options = options
  // 初始化数据，如果未提供则默认为空对象
  const data = (this._data = options.data ?? {})

  // 对数据对象进行响应式处理
  observe(data)

  // 将data中的属性代理到实例上，实现this.key直接访问this._data.key
  Object.keys(data).forEach(key => {
    // 重新定义 this，实现 this 代理 this._data
    Object.defineProperty(this, key, {
      enumerable: true,
      get() {
        return this._data[key]
      },
      set(newValue) {
        this._data[key] = newValue
      },
    })
  })

  // 再次对数据进行观察，确保代理后的属性也能被正确监听
  observe(data)
  
  // 初始化计算属性
  initComputed.call(this)

  // 初始化方法
  initMethods.call(this)

  // 编译模板并挂载到DOM
  new Compile(options.el, this)
}

/*
 * 观察数据对象，为其添加响应式特性
 * @param {Object} dataObj - 需要观察的数据对象
 * @returns {Observe|undefined} 如果是对象则返回Observe实例，否则返回undefined
 */
function observe(dataObj) {
  // 只对对象类型数据进行观察
  if (typeof dataObj !== 'object') {
    return
  }
  return new Observe(dataObj)
}

/*
 * 数据观察类，为对象的每个属性添加getter和setter
 * @param {Object} data - 需要观察的数据对象
 */
function Observe(data) {
  // 创建依赖收集器
  const dep = new Dep()
  
  // 遍历数据对象的所有属性
  Object.keys(data).forEach(key => {
    // 保存当前属性值
    let value = data[key]
    
    // 递归观察属性值（深度观察）
    observe(value)
    
    // 重新定义属性的getter和setter，实现数据劫持
    Object.defineProperty(data, key, {
      enumerable: true,
      get() {
        // 每个属性都有一个依赖收集器

        // 依赖收集：如果当前有观察者，则将其添加到依赖列表中
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        // 如果新值与旧值相同，则不进行任何操作
        if (newValue === value) {
          return
        }
        
        // 更新值
        value = newValue
        
        // 递归观察新值（处理对象赋值的情况）
        observe(newValue)
        
        // 通知所有依赖该属性的观察者进行更新
        dep.notify()
      },
    })
  })
}

/*
 * 模板编译构造函数，负责将模板编译并与Vue实例关联
 * @param {string} el - DOM元素选择器
 * @param {MyVue} vm - Vue实例
 */
function Compile(el, vm) {
  // 获取挂载元素
  vm.$el = document.querySelector(el)
  
  // 编译模板
  const compileElement = compileTemplate(vm)
  
  // 将编译后的元素添加到挂载元素中
  vm.$el.appendChild(compileElement)
}

/*
 * 编译模板的核心函数
 * @param {MyVue} vm - Vue实例
 * @returns {DocumentFragment} 编译后的文档片段
 */
function compileTemplate(vm) {
  // 创建文档片段以提高DOM操作性能
  const fragment = document.createDocumentFragment()
  
  // 将挂载元素的所有子节点移动到文档片段中
  while ((child = vm.$el.firstElementChild)) {
    fragment.appendChild(child)
  }
  
  // 绑定数据到模板
  bindValueToTemplate(fragment, vm)

  /*
   * 将数据绑定到模板
   * @param {DocumentFragment} fragment - 文档片段
   * @param {MyVue} vm - Vue实例
   */
  function bindValueToTemplate(fragment, vm) {
    // 检查Vue实例是否存在
    if (!vm) {
      throw new Error('bindValueToTemplate 缺少 vm')
    }
    
    // 遍历所有子节点
    Array.from(fragment.childNodes).forEach(node => {
      // 获取节点文本内容
      const text = node.textContent
      
      // 定义插值表达式匹配规则
      const reg = /\{\{(.*)\}\}/g
      
      // 处理元素节点
      if (node.nodeType === 1) {
        // 获取节点所有属性
        const nodeAttrs = Array.from(node.attributes)
        
        // 处理事件绑定
        nodeAttrs.forEach(attr => {
          const { name, value: prop } = attr
          
          // 处理以@开头的事件绑定
          if (name.indexOf('@') === 0) {
            // 获取事件名称
            const eventName = name.substring(1)
            
            // 解析事件处理函数名和参数
            let handleName = prop.substring(0, prop.indexOf('('))
            let params = prop.substring(prop.indexOf('(') + 1, prop.indexOf(')')).split(',')
            
            // 如果没有参数
            if (!prop.includes('(')) {
              handleName = prop
              params = []
            }
            
            // 处理箭头函数绑定
            if (prop.includes('=>')) {
              if (prop.includes('{')) {
                const body = prop.substring(prop.indexOf('{') + 1, prop.indexOf('}'))
                node.addEventListener(eventName, event => {
                  const handler = new Function('event', body)
                  handler(event)
                })
                return
              } else {
                const body = prop.split('=>')[1]
                node.addEventListener(eventName, event => {
                  const handler = new Function('event', body)
                  handler(event)
                })
                return
              }
            }
            
            // 绑定事件监听器
            node.addEventListener(eventName, event => {
              // 解析参数值
              const _params = params.map(item => {
                const { data, computed } = vm.$options
                const value = isDataKey(data, item)
                  ? vm[item]
                  : isComputed(computed, item)
                  ? typeof computed[item] === 'function'
                    ? computed[item].call(vm)
                    : computed[item].get.call(vm)
                  : !Number.isNaN(+item)
                  ? +item
                  : item
                return value
              })
              
              // 调用事件处理函数
              if (_params.length) {
                vm[handleName](..._params)
              } else {
                vm[handleName](event)
              }
            })
          }
        })
        
        // 处理插值表达式 {{}}
        if (reg.test(text)) {
          let val = vm
          
          // 解析属性路径（支持 a.b 形式）
          const propAttrs = RegExp.$1.split('.')
          propAttrs.forEach(key => {
            val = val[key]
          })
          
          // 定义更新文本的函数
          const updateText = val => {
            node.textContent = text.replace(reg, val)
          }
          
          // 初始更新文本
          updateText(val)
          
          // 创建观察者以响应数据变化
          new Watcher(vm, propAttrs, updateText)
        } 
        // 处理 v-model 指令
        else if (!text) {
          // 获取节点所有属性
          const nodeAttrs = Array.from(node.attributes)
          
          nodeAttrs.forEach(attr => {
            const { name, value: prop } = attr
            
            // 处理以v-开头的指令
            if (name.indexOf('v-') === 0) {
              // 解析属性路径（支持 v-model="a.b" 形式）
              let val = vm
              const propAttrs = prop.split('.')
              propAttrs.forEach(key => {
                val = val[key]
              })
              
              // 设置输入框初始值
              node.value = val
              
              // 创建观察者以响应数据变化
              new Watcher(vm, propAttrs, updatedValue => {
                // 当数据更新时，同步更新输入框的值
                node.value = updatedValue
              })

              // 监听输入事件以更新数据
              node.addEventListener('input', function (event) {
                const value = event.target.value
                
                // 更新数据模型
                let currentValue = vm
                let lastProp = propAttrs[0]
                propAttrs.forEach((key, index) => {
                  if (index <= propAttrs.length - 1) {
                    lastProp = key
                    if (index <= propAttrs.length - 2) {
                      currentValue = currentValue[key]
                    }
                  }
                })
                currentValue[lastProp] = value
              })
            }
          })
        }
      }
      
      // 递归处理子节点
      if (node.childNodes) {
        bindValueToTemplate(node, vm)
      }
    })
  }
  
  // 返回编译后的文档片段
  return fragment
}

/*
 * 初始化计算属性
 */
function initComputed() {
  const vm = this
  const { computed } = vm.$options ?? {}
  
  // 遍历所有计算属性
  Object.keys(computed).forEach(key => {
    // 将计算属性定义到Vue实例上
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set: computed[key] === 'function' ? computed[key] : computed[key].set,
    })
  })
}

/*
 * 初始化方法
 */
function initMethods() {
  const vm = this
  const { methods = {} } = vm.$options
  
  // 将方法绑定到Vue实例上
  Object.keys(methods).forEach(key => {
    vm[key] = methods[key]
  })
}

/*
 * 依赖收集类，用于管理观察者, 管理观察者
 */
function Dep() {
  // 存储观察者列表
  this.subs = []
}

// 添加观察者
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}

// 通知所有观察者更新
Dep.prototype.notify = function () {
  this.subs.forEach(sub => {
    sub.update()
  })
}

/*
 * 观察者类，用于观察数据变化并执行相应操作
 * @param {MyVue} vm - Vue实例
 * @param {Array} propAttrs - 属性路径数组
 * @param {Function} fn - 更新函数
 */
function Watcher(vm, propAttrs, fn) {
  // 保存更新函数
  this.fn = fn
  // 保存Vue实例
  this.vm = vm
  // 保存属性路径
  this.propAttrs = propAttrs
  
  // 设置当前观察者
  Dep.target = this
  
  // 获取初始值以触发依赖收集
  let val = vm
  propAttrs.forEach(key => {
    val = val[key]
  })
  
  // 清空当前观察者
  Dep.target = null
}

// 获取更新后的值
Watcher.prototype.getUpdatedValue = function () {
  let value = this.vm
  this.propAttrs.forEach(key => {
    value = value[key]
  })
  return value
}

// 执行更新
Watcher.prototype.update = function () {
  this.fn(this.getUpdatedValue())
}

/*
 * 检查是否为数据属性
 * @param {Object} data - 数据对象
 * @param {string} key - 属性名
 * @returns {boolean} 是否为数据属性
 */
function isDataKey(data, key) {
  if (!key) return false
  return Object.keys(data).includes(key)
}

/*
 * 检查是否为计算属性
 * @param {Object} computed - 计算属性对象
 * @param {string} key - 属性名
 * @returns {boolean} 是否为计算属性
 */
function isComputed(computed, key) {
  if (!key) return false
  return Object.keys(computed).includes(key)
}
