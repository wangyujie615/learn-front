/**
 * 消费者示例
 * 演示如何从消息队列接收消息
 */

// 在Node.js环境中引入MessageQueue
// const MessageQueue = require('./MessageQueue.js');

// 在浏览器环境中，MessageQueue已经通过window.MessageQueue暴露

class Consumer {
  constructor(messageQueue, queueName, options = {}) {
    this.messageQueue = messageQueue;
    this.queueName = queueName;
    this.options = {
      autoAck: options.autoAck || false,
      pollingInterval: options.pollingInterval || 1000,
      maxRetries: options.maxRetries || 3,
      ...options
    };
    this.isRunning = false;
    this.pollingTimer = null;
    this.processedMessages = new Set(); // 记录已处理的消息
    
    // 确保队列存在
    this.messageQueue.createQueue(queueName);
  }

  /**
   * 启动消费者
   * @param {Function} messageHandler 消息处理函数
   */
  start(messageHandler) {
    if (this.isRunning) {
      console.log('消费者已在运行中');
      return;
    }

    this.isRunning = true;
    console.log(`消费者已启动，监听队列 "${this.queueName}"`);
    
    // 订阅队列消息
    this.subscriptionId = this.messageQueue.subscribe(
      this.queueName, 
      (queueName, messages) => {
        if (messages.length > 0) {
          this._processMessages(messages, messageHandler);
        }
      }
    );
    
    // 启动轮询
    this._startPolling(messageHandler);
  }

  /**
   * 停止消费者
   */
  stop() {
    if (!this.isRunning) {
      console.log('消费者未在运行');
      return;
    }

    this.isRunning = false;
    
    // 取消订阅
    if (this.subscriptionId) {
      this.messageQueue.unsubscribe(this.queueName, this.subscriptionId);
    }
    
    // 停止轮询
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
    
    console.log(`消费者已停止，不再监听队列 "${this.queueName}"`);
  }

  /**
   * 手动获取一条消息
   * @returns {Object|null} 消息对象或null
   */
  getMessage() {
    return this.messageQueue.consume(this.queueName, { ack: this.options.autoAck });
  }

  /**
   * 确认消息处理完成
   * @param {Object} message 消息对象
   */
  ackMessage(message) {
    if (message.ack) {
      message.ack();
      this.processedMessages.add(message.id);
    }
  }

  /**
   * 拒绝消息（重新入队）
   * @param {Object} message 消息对象
   */
  rejectMessage(message) {
    if (message.retries < message.maxRetries) {
      message.retries++;
      this.messageQueue.publish(this.queueName, message.content, {
        persistent: message.persistent,
        maxRetries: message.maxRetries
      });
      console.log(`消息 ${message.id} 已重新入队，重试次数: ${message.retries}`);
    } else {
      console.log(`消息 ${message.id} 已达到最大重试次数，将被丢弃`);
    }
  }

  /**
   * 处理消息
   * @private
   * @param {Array} messages 消息数组
   * @param {Function} messageHandler 消息处理函数
   */
  _processMessages(messages, messageHandler) {
    messages.forEach(message => {
      // 跳过已处理的消息
      if (this.processedMessages.has(message.id)) {
        return;
      }

      try {
        // 调用消息处理函数
        const result = messageHandler(message);
        
        // 如果处理函数返回Promise，等待其完成
        if (result && typeof result.then === 'function') {
          result
            .then(() => {
              if (this.options.autoAck) {
                this.ackMessage(message);
              }
            })
            .catch(error => {
              console.error('消息处理失败:', error);
              this.rejectMessage(message);
            });
        } else {
          // 同步处理成功
          if (this.options.autoAck) {
            this.ackMessage(message);
          }
        }
      } catch (error) {
        console.error('消息处理异常:', error);
        this.rejectMessage(message);
      }
    });
  }

  /**
   * 启动轮询
   * @private
   * @param {Function} messageHandler 消息处理函数
   */
  _startPolling(messageHandler) {
    this.pollingTimer = setInterval(() => {
      const message = this.getMessage();
      if (message) {
        this._processMessages([message], messageHandler);
      }
    }, this.options.pollingInterval);
  }
}

// 示例使用函数
function consumerExample() {
  // 创建消息队列实例
  const messageQueue = new MessageQueue();
  
  // 创建消费者
  const consumer = new Consumer(messageQueue, 'task-queue', {
    autoAck: true,
    pollingInterval: 500
  });
  
  // 定义消息处理函数
  const messageHandler = (message) => {
    console.log('收到消息:', message);
    
    // 模拟消息处理
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`消息处理完成: ${message.content.content || message.content}`);
        resolve();
      }, 1000);
    });
  };
  
  // 启动消费者
  consumer.start(messageHandler);
  
  // 5秒后停止消费者
  setTimeout(() => {
    consumer.stop();
  }, 5000);
  
  return { messageQueue, consumer };
}

// 导出消费者类和示例函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Consumer, consumerExample };
} else if (typeof window !== 'undefined') {
  window.Consumer = Consumer;
  window.consumerExample = consumerExample;
}