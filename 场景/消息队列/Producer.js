/**
 * 生产者示例
 * 演示如何向消息队列发送消息
 */

// 在Node.js环境中引入MessageQueue
// const MessageQueue = require('./MessageQueue.js');

// 在浏览器环境中，MessageQueue已经通过window.MessageQueue暴露

class Producer {
  constructor(messageQueue, queueName) {
    this.messageQueue = messageQueue;
    this.queueName = queueName;
    
    // 确保队列存在
    this.messageQueue.createQueue(queueName);
  }

  /**
   * 发送普通消息
   * @param {any} message 消息内容
   */
  sendMessage(message) {
    return this.messageQueue.publish(this.queueName, message);
  }

  /**
   * 发送持久化消息
   * @param {any} message 消息内容
   */
  sendPersistentMessage(message) {
    return this.messageQueue.publish(this.queueName, message, { persistent: true });
  }

  /**
   * 发送带有重试机制的消息
   * @param {any} message 消息内容
   * @param {number} maxRetries 最大重试次数
   */
  sendMessageWithRetry(message, maxRetries = 3) {
    return this.messageQueue.publish(this.queueName, message, { maxRetries });
  }

  /**
   * 批量发送消息
   * @param {Array} messages 消息数组
   */
  sendBatchMessages(messages) {
    const results = [];
    messages.forEach(message => {
      const result = this.sendMessage(message);
      results.push(result);
    });
    return results;
  }

  /**
   * 发送延迟消息（模拟）
   * @param {any} message 消息内容
   * @param {number} delay 延迟时间（毫秒）
   */
  sendDelayedMessage(message, delay) {
    setTimeout(() => {
      this.sendMessage(message);
    }, delay);
    return true;
  }
}

// 示例使用函数
function producerExample() {
  // 创建消息队列实例
  const messageQueue = new MessageQueue();
  
  // 创建生产者
  const producer = new Producer(messageQueue, 'task-queue');
  
  // 发送不同类型的消息
  producer.sendMessage({ type: 'info', content: '这是一条普通消息' });
  producer.sendPersistentMessage({ type: 'important', content: '这是一条持久化消息' });
  producer.sendMessageWithRetry({ type: 'retry', content: '这是一条可重试的消息' }, 5);
  
  // 批量发送消息
  const batchMessages = [
    { type: 'batch', content: '批量消息1' },
    { type: 'batch', content: '批量消息2' },
    { type: 'batch', content: '批量消息3' }
  ];
  producer.sendBatchMessages(batchMessages);
  
  // 发送延迟消息
  producer.sendDelayedMessage({ type: 'delayed', content: '这是一条延迟消息' }, 2000);
  
  // 查看队列状态
  console.log('队列状态:', messageQueue.getQueueStatus('task-queue'));
  
  return messageQueue;
}

// 导出生产者类和示例函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Producer, producerExample };
} else if (typeof window !== 'undefined') {
  window.Producer = Producer;
  window.producerExample = producerExample;
}