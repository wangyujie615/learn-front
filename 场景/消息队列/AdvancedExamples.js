/**
 * 消息队列高级功能示例
 * 演示消息队列的高级用法
 */

// 引入消息队列相关类
// 在Node.js环境中
// const MessageQueue = require('./MessageQueue.js');
// const { Producer } = require('./Producer.js');
// const { Consumer } = require('./Consumer.js');

// 在浏览器环境中，这些类已经通过window对象暴露

// 高级示例1: 优先级队列
class PriorityMessageQueue extends MessageQueue {
  constructor() {
    super();
    this.priorityQueues = new Map(); // 存储优先级队列
  }

  createPriorityQueue(queueName, priorities = ['high', 'medium', 'low']) {
    if (!this.priorityQueues.has(queueName)) {
      this.priorityQueues.set(queueName, {
        priorities,
        queues: new Map()
      });
      
      // 为每个优先级创建子队列
      priorities.forEach(priority => {
        this.priorityQueues.get(queueName).queues.set(priority, []);
      });
      
      console.log(`优先级队列 "${queueName}" 已创建，优先级: ${priorities.join(', ')}`);
    }
  }

  publishPriority(queueName, message, priority = 'medium') {
    if (!this.priorityQueues.has(queueName)) {
      console.error(`优先级队列 "${queueName}" 不存在`);
      return false;
    }

    const queueInfo = this.priorityQueues.get(queueName);
    if (!queueInfo.queues.has(priority)) {
      console.error(`优先级 "${priority}" 不存在`);
      return false;
    }

    const messageObj = {
      id: this._generateId(),
      content: message,
      priority,
      timestamp: new Date()
    };

    queueInfo.queues.get(priority).push(messageObj);
    console.log(`消息已发布到优先级队列 "${queueName}"，优先级: ${priority}`);
    return true;
  }

  consumePriority(queueName) {
    if (!this.priorityQueues.has(queueName)) {
      console.error(`优先级队列 "${queueName}" 不存在`);
      return null;
    }

    const queueInfo = this.priorityQueues.get(queueName);
    
    // 按优先级顺序查找消息
    for (const priority of queueInfo.priorities) {
      const queue = queueInfo.queues.get(priority);
      if (queue.length > 0) {
        return queue.shift();
      }
    }

    return null;
  }
}

// 高级示例2: 延迟队列
class DelayedMessageQueue extends MessageQueue {
  constructor() {
    super();
    this.delayedMessages = new Map(); // 存储延迟消息
    this.timers = new Map(); // 存储定时器
    this.processingInterval = 1000; // 处理间隔（毫秒）
    this.processingTimer = null;
    this.startProcessing();
  }

  publishDelayed(queueName, message, delayMs) {
    if (!this.queues.has(queueName)) {
      console.error(`队列 "${queueName}" 不存在`);
      return false;
    }

    const executeTime = Date.now() + delayMs;
    const delayedMessage = {
      id: this._generateId(),
      content: message,
      executeTime,
      queueName,
      timestamp: new Date()
    };

    if (!this.delayedMessages.has(queueName)) {
      this.delayedMessages.set(queueName, []);
    }

    this.delayedMessages.get(queueName).push(delayedMessage);
    console.log(`延迟消息已添加，将在 ${delayMs}ms 后发布到队列 "${queueName}"`);
    return true;
  }

  startProcessing() {
    if (this.processingTimer) {
      return;
    }

    this.processingTimer = setInterval(() => {
      this.processDelayedMessages();
    }, this.processingInterval);
  }

  stopProcessing() {
    if (this.processingTimer) {
      clearInterval(this.processingTimer);
      this.processingTimer = null;
    }
  }

  processDelayedMessages() {
    const now = Date.now();
    
    for (const [queueName, messages] of this.delayedMessages.entries()) {
      const readyMessages = messages.filter(msg => msg.executeTime <= now);
      
      if (readyMessages.length > 0) {
        // 从延迟消息列表中移除已到期的消息
        this.delayedMessages.set(
          queueName,
          messages.filter(msg => msg.executeTime > now)
        );
        
        // 将消息发布到目标队列
        readyMessages.forEach(msg => {
          this.publish(msg.queueName, msg.content);
          console.log(`延迟消息已发布到队列 "${msg.queueName}"`);
        });
      }
    }
  }
}

// 高级示例3: 死信队列
class DeadLetterMessageQueue extends MessageQueue {
  constructor() {
    super();
    this.deadLetterQueue = 'dead-letter';
    this.createQueue(this.deadLetterQueue);
  }

  publishWithDeadLetter(queueName, message, options = {}) {
    const messageObj = {
      id: this._generateId(),
      content: message,
      timestamp: new Date(),
      retries: 0,
      maxRetries: options.maxRetries || 3,
      deadLetterQueue: options.deadLetterQueue || this.deadLetterQueue,
      originalQueue: queueName,
      ...options
    };

    return this.publish(queueName, messageObj);
  }

  consumeWithRetry(queueName) {
    const message = this.consume(queueName);
    if (!message) {
      return null;
    }

    // 如果消息包含重试信息
    if (message.maxRetries !== undefined) {
      message.retries = (message.retries || 0) + 1;
      
      // 如果超过最大重试次数，发送到死信队列
      if (message.retries > message.maxRetries) {
        this.publish(message.deadLetterQueue, {
          ...message,
          failedReason: '超过最大重试次数',
          failedTime: new Date()
        });
        console.log(`消息 ${message.id} 已发送到死信队列`);
        return null;
      }
    }

    return message;
  }

  getDeadLetterMessages() {
    return this.queues.get(this.deadLetterQueue) || [];
  }

  requeueFromDeadLetter(messageId) {
    const deadLetterMessages = this.getDeadLetterMessages();
    const messageIndex = deadLetterMessages.findIndex(msg => msg.id === messageId);
    
    if (messageIndex !== -1) {
      const message = deadLetterMessages[messageIndex];
      deadLetterMessages.splice(messageIndex, 1);
      
      // 重置重试次数
      message.retries = 0;
      
      // 重新发送到原始队列
      this.publish(message.originalQueue, message);
      console.log(`消息 ${messageId} 已从死信队列重新入队到 "${message.originalQueue}"`);
      return true;
    }
    
    return false;
  }
}

// 高级示例4: 消息路由
class MessageRouter {
  constructor(messageQueue) {
    this.messageQueue = messageQueue;
    this.routes = new Map(); // 存储路由规则
    this.globalQueue = 'router-global';
    this.messageQueue.createQueue(this.globalQueue);
  }

  addRoute(pattern, targetQueue, options = {}) {
    const route = {
      pattern: new RegExp(pattern),
      targetQueue,
      options
    };
    
    const routeId = this._generateId();
    this.routes.set(routeId, route);
    
    // 确保目标队列存在
    this.messageQueue.createQueue(targetQueue);
    
    console.log(`路由规则已添加: ${pattern} -> ${targetQueue}`);
    return routeId;
  }

  removeRoute(routeId) {
    if (this.routes.has(routeId)) {
      this.routes.delete(routeId);
      console.log(`路由规则已删除: ${routeId}`);
      return true;
    }
    return false;
  }

  route(message) {
    let routed = false;
    
    // 尝试匹配所有路由规则
    for (const [routeId, route] of this.routes.entries()) {
      const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
      
      if (route.pattern.test(messageStr)) {
        this.messageQueue.publish(route.targetQueue, message, route.options);
        console.log(`消息已路由到 "${route.targetQueue}"`);
        routed = true;
        
        // 如果不是多路由，则停止匹配
        if (!route.options.multiRoute) {
          break;
        }
      }
    }
    
    // 如果没有匹配的路由，发送到全局队列
    if (!routed) {
      this.messageQueue.publish(this.globalQueue, message);
      console.log(`消息已发送到全局队列 "${this.globalQueue}"`);
    }
    
    return routed;
  }

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// 高级示例5: 消息过滤器
class MessageFilter {
  constructor(messageQueue) {
    this.messageQueue = messageQueue;
    this.filters = new Map(); // 存储过滤器
  }

  addFilter(queueName, filterFn, options = {}) {
    if (!this.filters.has(queueName)) {
      this.filters.set(queueName, []);
    }
    
    const filter = {
      id: this._generateId(),
      filterFn,
      options
    };
    
    this.filters.get(queueName).push(filter);
    console.log(`过滤器已添加到队列 "${queueName}"`);
    return filter.id;
  }

  removeFilter(queueName, filterId) {
    if (!this.filters.has(queueName)) {
      return false;
    }
    
    const filters = this.filters.get(queueName);
    const index = filters.findIndex(f => f.id === filterId);
    
    if (index !== -1) {
      filters.splice(index, 1);
      console.log(`过滤器已从队列 "${queueName}" 删除`);
      return true;
    }
    
    return false;
  }

  filter(queueName, message) {
    if (!this.filters.has(queueName)) {
      return true; // 没有过滤器，通过所有消息
    }
    
    const filters = this.filters.get(queueName);
    
    // 应用所有过滤器
    for (const filter of filters) {
      try {
        if (!filter.filterFn(message)) {
          console.log(`消息被过滤器拒绝`);
          return false;
        }
      } catch (error) {
        console.error(`过滤器执行失败:`, error);
        
        // 根据选项决定是否拒绝消息
        if (filter.options.rejectOnError) {
          return false;
        }
      }
    }
    
    return true; // 所有过滤器都通过
  }

  publishFiltered(queueName, message, options = {}) {
    if (this.filter(queueName, message)) {
      return this.messageQueue.publish(queueName, message, options);
    }
    
    console.log(`消息被过滤器拒绝，未发布到队列 "${queueName}"`);
    return false;
  }

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// 使用示例函数
function advancedExamples() {
  console.log('=== 优先级队列示例 ===');
  const priorityQueue = new PriorityMessageQueue();
  priorityQueue.createPriorityQueue('priority-tasks');
  
  priorityQueue.publishPriority('priority-tasks', '低优先级任务', 'low');
  priorityQueue.publishPriority('priority-tasks', '高优先级任务', 'high');
  priorityQueue.publishPriority('priority-tasks', '中优先级任务', 'medium');
  
  let message;
  while ((message = priorityQueue.consumePriority('priority-tasks'))) {
    console.log(`消费到优先级消息: ${message.content}, 优先级: ${message.priority}`);
  }
  
  console.log('\n=== 延迟队列示例 ===');
  const delayedQueue = new DelayedMessageQueue();
  delayedQueue.createQueue('delayed-tasks');
  
  delayedQueue.publishDelayed('delayed-tasks', '延迟1秒的任务', 1000);
  delayedQueue.publishDelayed('delayed-tasks', '延迟2秒的任务', 2000);
  
  console.log('\n=== 死信队列示例 ===');
  const deadLetterQueue = new DeadLetterMessageQueue();
  deadLetterQueue.createQueue('retry-tasks');
  
  deadLetterQueue.publishWithDeadLetter('retry-tasks', '可能失败的任务', { maxRetries: 2 });
  
  console.log('\n=== 消息路由示例 ===');
  const router = new MessageRouter(new MessageQueue());
  
  router.addRoute('error', 'error-queue');
  router.addRoute('warning', 'warning-queue');
  router.addRoute('info', 'info-queue');
  
  router.route('error: 系统发生错误');
  router.route('warning: 系统内存不足');
  router.route('info: 系统正常运行');
  router.route('debug: 调试信息');
  
  console.log('\n=== 消息过滤器示例 ===');
  const filter = new MessageFilter(new MessageQueue());
  filter.messageQueue.createQueue('filtered-tasks');
  
  // 添加只接受数字消息的过滤器
  filter.addFilter('filtered-tasks', (message) => {
    return typeof message === 'number';
  });
  
  // 添加只接受正数的过滤器
  filter.addFilter('filtered-tasks', (message) => {
    return message > 0;
  });
  
  filter.publishFiltered('filtered-tasks', 123);  // 通过
  filter.publishFiltered('filtered-tasks', -456); // 被第二个过滤器拒绝
  filter.publishFiltered('filtered-tasks', 'abc'); // 被第一个过滤器拒绝
}

// 导出高级功能类和示例函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PriorityMessageQueue,
    DelayedMessageQueue,
    DeadLetterMessageQueue,
    MessageRouter,
    MessageFilter,
    advancedExamples
  };
} else if (typeof window !== 'undefined') {
  window.PriorityMessageQueue = PriorityMessageQueue;
  window.DelayedMessageQueue = DelayedMessageQueue;
  window.DeadLetterMessageQueue = DeadLetterMessageQueue;
  window.MessageRouter = MessageRouter;
  window.MessageFilter = MessageFilter;
  window.advancedExamples = advancedExamples;
}