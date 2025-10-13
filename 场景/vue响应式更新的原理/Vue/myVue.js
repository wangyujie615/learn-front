/*
 * 简化版Vue实现
 * 支持数据响应式、模板编译和依赖收集与更新
 */

/**
 * Vue构造函数
 * @param {Object} options - 配置选项
 */
function MyVue(options) {
  this.$options = options;
  this.$data = options.data || {};
  
  // 数据响应式处理
  observe(this.$data);
  
  // 代理data属性到实例上
  proxy(this, '$data');
  
  // 处理计算属性
  initComputed(this);
  
  // 编译模板
  new Compiler(options.el, this);
}

/**
 * 观察者类，用于将数据对象转换为响应式数据
 * @param {Object} value - 需要观察的数据对象
 */
function observe(value) {
  if (!value || typeof value !== 'object') {
    return;
  }
  
  return new Observer(value);
}

/**
 * Observer类，用于为对象的每个属性添加getter和setter
 * @param {Object} value - 需要观察的数据对象
 */
function Observer(value) {
  // 遍历对象属性
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}

/**
 * 定义响应式数据
 * @param {Object} obj - 目标对象
 * @param {string} key - 属性名
 * @param {*} val - 属性值
 */
function defineReactive(obj, key, val) {
  // 递归观察子对象
  observe(val);
  
  // 创建依赖收集器
  const dep = new Dep();
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 依赖收集
      Dep.target && dep.addSub(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 新值也需要进行响应式处理
      observe(newVal);
      // 通知更新
      dep.notify();
    }
  });
}

/**
 * 依赖收集器类，用于管理订阅者
 */
function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
};

Dep.prototype.notify = function() {
  this.subs.forEach(sub => {
    sub.update();
  });
};

// 当前正在处理的订阅者
Dep.target = null;

/**
 * 订阅者类，用于订阅数据变化并更新视图
 * @param {MyVue} vm - Vue实例
 * @param {string} exp - 表达式
 * @param {Function} cb - 回调函数
 */
function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = undefined;
  
  // 将当前订阅者指向自己
  Dep.target = this;
  
  // 如果有表达式，则解析表达式，获取值
  if (exp) {
    this.value = this.get();
  }
  
  // 重置Dep.target
  Dep.target = null;
}

Watcher.prototype.get = function() {
  // 解析表达式，获取值
  const value = parsePath(this.vm, this.exp);
  return value;
};

Watcher.prototype.update = function() {
  if (this.exp) {
    const newValue = this.get();
    const oldValue = this.value;
    if (newValue !== oldValue) {
      this.value = newValue;
      this.cb.call(this.vm, newValue, oldValue);
    }
  } else {
    // 对于计算属性，直接执行回调
    this.cb.call(this.vm);
  }
};

/**
 * 解析路径表达式，如"a.b.c"
 * @param {Object} obj - 起始对象
 * @param {string} path - 路径表达式
 * @returns {*} 解析后的值
 */
function parsePath(obj, path) {
  const segments = path.split('.');
  for (let i = 0; i < segments.length; i++) {
    if (!obj) return;
    obj = obj[segments[i]];
  }
  return obj;
}

/**
 * 初始化计算属性
 * @param {MyVue} vm - Vue实例
 */
function initComputed(vm) {
  const computed = vm.$options.computed || {};
  
  Object.keys(computed).forEach(key => {
    const computedFn = computed[key];
    
    // 创建计算属性的订阅者
    const watcher = new Watcher(vm, null, function() {
      // 当依赖的数据变化时，重新计算值
      const value = computedFn.call(vm);
      watcher.value = value;
      // 通知所有依赖此计算属性的订阅者更新
      watcher.dep.notify();
    });
    
    // 为计算属性创建依赖收集器
    watcher.dep = new Dep();
    
    // 将计算属性定义为响应式属性
    Object.defineProperty(vm, key, {
      get() {
        // 将当前订阅者添加到计算属性的依赖列表中
        if (Dep.target) {
          watcher.dep.addSub(Dep.target);
        }
        
        // 如果计算属性的值未定义，则进行计算
        if (watcher.value === undefined) {
          watcher.value = computedFn.call(vm);
        }
        
        return watcher.value;
      },
      set() {
        console.warn('计算属性不能被赋值');
      }
    });
  });
}

/**
 * 代理属性，将source对象的属性代理到target对象上
 * @param {Object} target - 目标对象
 * @param {string} sourceKey - 源对象键名
 */
function proxy(target, sourceKey) {
  const source = target[sourceKey];
  Object.keys(source).forEach(key => {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get() {
        return source[key];
      },
      set(newVal) {
        source[key] = newVal;
      }
    });
  });
}

/**
 * 编译器类，用于编译模板
 * @param {string} el - 选择器
 * @param {MyVue} vm - Vue实例
 */
function Compiler(el, vm) {
  this.vm = vm;
  this.el = document.querySelector(el);
  this.fragment = this.node2Fragment(this.el);
  this.compile(this.fragment);
  this.el.appendChild(this.fragment);
}

Compiler.prototype.node2Fragment = function(node) {
  const fragment = document.createDocumentFragment();
  let child = node.firstChild;
  
  while (child) {
    fragment.appendChild(child);
    child = node.firstChild;
  }
  
  return fragment;
};

Compiler.prototype.compile = function(node) {
  const childNodes = node.childNodes;
  
  Array.from(childNodes).forEach(node => {
    const nodeType = node.nodeType;
    
    if (nodeType === 1) { // 元素节点
      this.compileElement(node);
    } else if (nodeType === 3) { // 文本节点
      this.compileText(node);
    }
    
    // 递归编译子节点
    if (node.childNodes && node.childNodes.length) {
      this.compile(node);
    }
  });
};

Compiler.prototype.compileElement = function(node) {
  const nodeAttrs = node.attributes;
  
  Array.from(nodeAttrs).forEach(attr => {
    const attrName = attr.name;
    const exp = attr.value;
    
    // 处理v-model指令
    if (attrName === 'v-model') {
      this.bindModel(node, exp);
    }
    // 处理事件指令
    else if (attrName.startsWith('@')) {
      const eventType = attrName.substring(1);
      this.bindEvent(node, eventType, exp);
    }
  });
};

Compiler.prototype.compileText = function(node) {
  const text = node.textContent;
  const reg = /\{\{(.*)\}\}/;
  
  if (reg.test(text)) {
    const exp = RegExp.$1.trim();
    node.textContent = '';
    
    // 创建文本节点并添加订阅者
    this.bindText(node, exp);
  }
};

Compiler.prototype.bindText = function(node, exp) {
  const updateFn = (value) => {
    node.textContent = value;
  };
  
  // 创建订阅者
  new Watcher(this.vm, exp, updateFn);
  
  // 初始化文本
  const value = parsePath(this.vm, exp);
  updateFn(value);
};

Compiler.prototype.bindModel = function(node, exp) {
  const updateFn = (value) => {
    node.value = value;
  };
  
  // 创建订阅者
  new Watcher(this.vm, exp, updateFn);
  
  // 初始化值
  const value = parsePath(this.vm, exp);
  updateFn(value);
  
  // 监听输入事件
  node.addEventListener('input', (e) => {
    const newValue = e.target.value;
    // 更新数据
    this.setValue(this.vm, exp, newValue);
  });
};

Compiler.prototype.bindEvent = function(node, eventType, exp) {
  const fn = this.vm.$options.methods && this.vm.$options.methods[exp];
  if (fn) {
    node.addEventListener(eventType, fn.bind(this.vm));
  }
};

Compiler.prototype.setValue = function(vm, exp, value) {
  const segments = exp.split('.');
  let obj = vm;
  
  for (let i = 0; i < segments.length - 1; i++) {
    obj = obj[segments[i]];
  }
  
  obj[segments[segments.length - 1]] = value;
};