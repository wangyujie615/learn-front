class Pub {
    constructor() {
        // key: name
        // value: 回调函数
        this.events = new Map()
    }
    /**
     * 注册事件
     * @param {*} eventName 
     * @param {*} callback 
     */
    subscribe(eventName, callback) {
        if (!this.events.has(eventName)) {
            //
            this.events.set(eventName, new Set())
        }
        //订阅事件
        this.events.get(eventName).add(callback)
        return () => this.delete(eventName, callback)
    }
    /**
     * 发布事件
     * @param {*} eventName 
     * @param {*} callback 
     */
    publish(eventName, ...args) {
        if (!this.events.has(this.events)) return;
        const callbacks = new Set(this.events.get(eventName))
        callbacks.forEach(callback => callback(...args))
    }
    /**
     * 清理事件
     * @param {*} eventName 
     * @param {*} callback 
     */
    delete(eventName, callback) {
        if (!this.events.has(eventName)) return
        const callbacks = this.events.get(eventName)
        callbacks.delete(callback)
        if (callbacks.size === 0) {
            this.events.delete(eventName)
        }
    }
}