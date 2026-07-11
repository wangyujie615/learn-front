// React合成事件系统实现

/**
 * SyntheticEvent类 - React的合成事件
 * 封装原生DOM事件，提供统一的API接口
 */
class SyntheticEvent {
    constructor(e) {
        // 保存原生DOM事件引用
        this.nativeEvent = e
    }
    
    /**
     * 阻止事件冒泡
     * 设置内部标志并调用原生事件的stopPropagation方法
     */
    stopPropagation() {
        // 设置内部标志，用于React事件系统判断是否阻止冒泡
        this._stopPropagation = true
        // 如果原生事件有stopPropagation方法，则调用它
        if (this.nativeEvent.stopPropagation) {
            this.nativeEvent.stopPropagation()
        }
    }
}

/**
 * 触发事件流
 * 按照指定路径执行事件回调函数
 * @param {Array} paths - 事件路径数组
 * @param {string} type - 事件类型
 * @param {SyntheticEvent} se - 合成事件对象
 */
const triggerEventFlow = (paths, type, se) => {
    // 从路径末尾开始遍历（从父元素到子元素）
    for (let i = paths.length - 1; i >= 0; i--) {
        const pathNode = paths[i]
        const cb = pathNode[type]
        // 如果存在回调函数，则执行
        if (cb) {
            cb.call(null, se)
        }
        // 如果事件被阻止冒泡，则停止遍历
        if (se._stopPropagation) {
            break
        }
    }
}

/**
 * 分发事件
 * 处理原生DOM事件，创建合成事件，收集事件路径并触发事件流
 * @param {Event} e - 原生DOM事件
 * @param {string} type - 事件类型
 */
const dispatchEvent = (e, type) => {
    // 创建合成事件对象
    const se = new SyntheticEvent(e)
    // 获取事件目标元素
    const ele = e.target
    let fiber
    // 从DOM元素中查找Fiber节点
    for (let prop in ele) {
        if (prop.toLowerCase().includes("fiber")) {
            fiber = ele[prop]
        }
    }
    // 收集事件路径的所有回调函数
    const paths = collectFiberPath(type, fiber)
    // 触发捕获阶段事件流
    triggerEventFlow(paths, type + "CAPTURE", se)
    // 如果事件没有被阻止冒泡，则触发冒泡阶段事件流
    if (!se._stopPropagation) {
        triggerEventFlow(paths.reverse(), type, se)
    }
}

/**
 * 收集Fiber路径
 * 从当前Fiber节点向上遍历，收集所有绑定了事件处理函数的节点
 * @param {string} type - 事件类型
 * @param {Object} begin - 起始Fiber节点
 * @returns {Array} 事件路径数组
 */
const collectFiberPath = (type, begin) => {
    const paths = []
    // 向上遍历Fiber树，直到根节点（tag为3）
    while (begin.tag !== 3) {
        const { memorizedProps, tag } = begin
        // 只处理DOM节点（tag为5）
        if (tag === 5) {
            // 构造事件处理函数名，如onClick
            const eventName = ("on" + type).toUpperCase()
            // 如果节点上绑定了对应的事件处理函数
            if (memorizedProps && Object.keys(memorizedProps).includes(eventName)) {
                const pathNode = []
                // 将事件处理函数存储在路径节点中
                pathNode[type.toUpperCase()] = memorizedProps[eventName]
                paths.push(pathNode)
            }
            // 移动到父节点
            begin = begin.return
        }
    }
    return paths
}

/**
 * 添加事件监听器
 * 在容器元素上添加事件监听，统一处理所有子元素的事件
 * @param {Element} container - 容器元素
 * @param {string} type - 事件类型
 */
export const addEvent = (container, type) => {
    container.addEventListener(type, (e) => {   
        // 分发事件，将事件类型转为大写
        dispatchEvent(e, type.toUpperCase(), container)
    })
}