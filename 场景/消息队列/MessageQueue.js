/**
 * 简单消息队列实现
 * 支持基本的发布/订阅模式
 */

class MessageQueue {
  constructor() {
    this.queues = new Map(); // 存储多个队列
    this.subscribers = new Map(); // 存储订阅者
  }

  /**
   * 创建队列
   * @param {string} queueName 队列名称
   */
  createQueue(queueName) {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, []);
      this.subscribers.set(queueName, []);
      console.log(`队列 "${queueName}" 已创建`);
    } else {
      console.log(`队列 "${queueName}" 已存在`);
    }
  }

  /**
   * 向队列发送消息
   * @param {string} queueName 队列名称
   * @param {any} message 消息内容
   * @param {Object} options 选项
   * @param {boolean} options.persistent 是否持久化消息
   */
  publish(queueName, message, options = {}) {
    if (!this.queues.has(queueName)) {
      console.error(`队列 "${queueName}" 不存在`);
      return false;
    }

    const messageObj = {
      id: this._generateId(), //消息的id
      content: message,
      timestamp: new Date(),
      persistent: options.persistent || false,
      retries: 0,
      maxRetries: options.maxRetries || 3
    };

    this.queues.get(queueName).push(messageObj);
    console.log(`消息已发布到队列 "${queueName}":`, messageObj);

    // 通知订阅者
    this._notifySubscribers(queueName);
    return true;
  }

  /**
   * 从队列获取消息
   * @param {string} queueName 队列名称
   * @param {Object} options 选项
   * @param {boolean} options.ack 是否需要确认
   * @returns {Object|null} 消息对象或null
   */
  consume(queueName, options = {}) {
    if (!this.queues.has(queueName)) {
      console.error(`队列 "${queueName}" 不存在`);
      return null;
    }

    const queue = this.queues.get(queueName);
    if (queue.length === 0) {
      return null;
    }

    const message = queue.shift();
    if (options.ack) {
      message.ackRequired = true;
      message.ack = () => {
        console.log(`消息 ${message.id} 已确认`);
      };
    }

    return message;
  }

  /**
   * 订阅队列
   * @param {string} queueName 队列名称
   * @param {Function} callback 回调函数
   */
  subscribe(queueName, callback) {
    if (!this.queues.has(queueName)) {
      console.error(`队列 "${queueName}" 不存在`);
      return false;
    }

    const subscriber = { id: this._generateId(), callback };
    this.subscribers.get(queueName).push(subscriber);
    console.log(`已订阅队列 "${queueName}"`);

    return subscriber.id;
  }

  /**
   * 取消订阅
   * @param {string} queueName 队列名称
   * @param {string} subscriberId 订阅者ID
   */
  unsubscribe(queueName, subscriberId) {
    if (!this.subscribers.has(queueName)) {
      return false;
    }

    const subscribers = this.subscribers.get(queueName);
    const index = subscribers.findIndex(sub => sub.id === subscriberId);
    
    if (index !== -1) {
      subscribers.splice(index, 1);
      console.log(`已取消订阅队列 "${queueName}"`);
      return true;
    }

    return false;
  }

  /**
   * 获取队列状态
   * @param {string} queueName 队列名称
   * @returns {Object} 队列状态信息
   */
  getQueueStatus(queueName) {
    if (!this.queues.has(queueName)) {
      return null;
    }

    return {
      name: queueName,
      messageCount: this.queues.get(queueName).length,
      subscriberCount: this.subscribers.get(queueName).length
    };
  }

  /**
   * 获取所有队列状态
   * @returns {Array} 所有队列状态信息
   */
  getAllQueuesStatus() {
    const status = [];
    for (const queueName of this.queues.keys()) {
      status.push(this.getQueueStatus(queueName));
    }
    return status;
  }

  /**
   * 清空队列
   * @param {string} queueName 队列名称
   */
  clearQueue(queueName) {
    if (!this.queues.has(queueName)) {
      console.error(`队列 "${queueName}" 不存在`);
      return false;
    }

    this.queues.set(queueName, []);
    console.log(`队列 "${queueName}" 已清空`);
    return true;
  }

  /**
   * 删除队列
   * @param {string} queueName 队列名称
   */
  deleteQueue(queueName) {
    if (!this.queues.has(queueName)) {
      console.error(`队列 "${queueName}" 不存在`);
      return false;
    }

    this.queues.delete(queueName);
    this.subscribers.delete(queueName);
    console.log(`队列 "${queueName}" 已删除`);
    return true;
  }

  /**
   * 通知订阅者
   * @private
   * @param {string} queueName 队列名称
   */
  _notifySubscribers(queueName) {
    // 获取队列的订阅者
    const subscribers = this.subscribers.get(queueName);
    const queue = this.queues.get(queueName);
    
    if (subscribers.length > 0 && queue.length > 0) {
      subscribers.forEach(subscriber => {
        try {
          //执行回调
          subscriber.callback(queueName, queue.slice()); // 传递队列副本
        } catch (error) {
          console.error(`订阅者回调执行失败:`, error);
        }
      });
    }
  }

  /**
   * 生成唯一ID
   * @private
   * @returns {string} 唯一ID
   */
  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// 导出消息队列类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MessageQueue;
} else if (typeof window !== 'undefined') {
  window.MessageQueue = MessageQueue;
}