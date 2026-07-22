# 简单消息队列实现

这是一个基于JavaScript的简单消息队列实现，支持基本的发布/订阅模式，可以在浏览器和Node.js环境中运行。

## 文件结构

- `MessageQueue.js` - 消息队列的核心实现
- `Producer.js` - 生产者示例
- `Consumer.js` - 消费者示例
- `index.html` - 可视化演示页面
- `README.md` - 说明文档（本文件）

## 功能特性

### 基本功能
- 创建和管理多个队列
- 发布消息到队列
- 从队列消费消息
- 订阅队列并接收通知
- 获取队列状态信息

### 高级功能
- 消息持久化选项
- 消息重试机制
- 消息确认机制（ACK）
- 批量发送消息
- 延迟消息发送
- 自动轮询和手动消费模式

## 快速开始

### 在浏览器中使用

1. 打开 `index.html` 文件在浏览器中查看可视化演示
2. 使用界面上的按钮体验消息队列的各种功能

### 在Node.js中使用

```javascript
// 引入消息队列
const MessageQueue = require('./MessageQueue.js');
const { Producer } = require('./Producer.js');
const { Consumer } = require('./Consumer.js');

// 创建消息队列实例
const messageQueue = new MessageQueue();

// 创建生产者
const producer = new Producer(messageQueue, 'task-queue');

// 创建消费者
const consumer = new Consumer(messageQueue, 'task-queue', {
  autoAck: true,
  pollingInterval: 1000
});

// 发送消息
producer.sendMessage('Hello, World!');

// 启动消费者
consumer.start((message) => {
  console.log('收到消息:', message);
});
```

## API 文档

### MessageQueue 类

#### 构造函数
```javascript
const messageQueue = new MessageQueue();
```

#### 方法

##### createQueue(queueName)
创建一个新队列
- `queueName` (string): 队列名称

##### publish(queueName, message, options)
向队列发送消息
- `queueName` (string): 队列名称
- `message` (any): 消息内容
- `options` (Object): 可选参数
  - `persistent` (boolean): 是否持久化消息，默认false
  - `maxRetries` (number): 最大重试次数，默认3

##### consume(queueName, options)
从队列获取消息
- `queueName` (string): 队列名称
- `options` (Object): 可选参数
  - `ack` (boolean): 是否需要确认，默认false

##### subscribe(queueName, callback)
订阅队列
- `queueName` (string): 队列名称
- `callback` (Function): 回调函数
- 返回: 订阅者ID

##### unsubscribe(queueName, subscriberId)
取消订阅
- `queueName` (string): 队列名称
- `subscriberId` (string): 订阅者ID

##### getQueueStatus(queueName)
获取队列状态
- `queueName` (string): 队列名称
- 返回: 队列状态对象

##### getAllQueuesStatus()
获取所有队列状态
- 返回: 所有队列状态数组

##### clearQueue(queueName)
清空队列
- `queueName` (string): 队列名称

##### deleteQueue(queueName)
删除队列
- `queueName` (string): 队列名称

### Producer 类

#### 构造函数
```javascript
const producer = new Producer(messageQueue, queueName);
```
- `messageQueue` (MessageQueue): 消息队列实例
- `queueName` (string): 队列名称

#### 方法

##### sendMessage(message)
发送普通消息
- `message` (any): 消息内容

##### sendPersistentMessage(message)
发送持久化消息
- `message` (any): 消息内容

##### sendMessageWithRetry(message, maxRetries)
发送带有重试机制的消息
- `message` (any): 消息内容
- `maxRetries` (number): 最大重试次数，默认3

##### sendBatchMessages(messages)
批量发送消息
- `messages` (Array): 消息数组

##### sendDelayedMessage(message, delay)
发送延迟消息
- `message` (any): 消息内容
- `delay` (number): 延迟时间（毫秒）

### Consumer 类

#### 构造函数
```javascript
const consumer = new Consumer(messageQueue, queueName, options);
```
- `messageQueue` (MessageQueue): 消息队列实例
- `queueName` (string): 队列名称
- `options` (Object): 可选参数
  - `autoAck` (boolean): 是否自动确认消息，默认false
  - `pollingInterval` (number): 轮询间隔（毫秒），默认1000
  - `maxRetries` (number): 最大重试次数，默认3

#### 方法

##### start(messageHandler)
启动消费者
- `messageHandler` (Function): 消息处理函数

##### stop()
停止消费者

##### getMessage()
手动获取一条消息
- 返回: 消息对象或null

##### ackMessage(message)
确认消息处理完成
- `message` (Object): 消息对象

##### rejectMessage(message)
拒绝消息（重新入队）
- `message` (Object): 消息对象

## 使用示例

### 基本发布/订阅模式

```javascript
// 创建消息队列
const messageQueue = new MessageQueue();

// 创建队列
messageQueue.createQueue('notifications');

// 订阅队列
const subscriberId = messageQueue.subscribe('notifications', (queueName, messages) => {
  console.log(`队列 ${queueName} 有新消息:`, messages);
});

// 发布消息
messageQueue.publish('notifications', '您有一条新通知');

// 取消订阅
messageQueue.unsubscribe('notifications', subscriberId);
```

### 生产者-消费者模式

```javascript
// 创建生产者
const producer = new Producer(messageQueue, 'tasks');

// 发送任务
producer.sendMessage({ id: 1, name: '任务1', data: '...' });
producer.sendPersistentMessage({ id: 2, name: '重要任务', data: '...' });

// 创建消费者
const consumer = new Consumer(messageQueue, 'tasks', { autoAck: true });

// 启动消费者
consumer.start((message) => {
  console.log('处理任务:', message);
  
  // 处理任务...
  
  // 如果autoAck为false，需要手动确认
  // consumer.ackMessage(message);
});
```

### 错误处理和重试

```javascript
const consumer = new Consumer(messageQueue, 'tasks', { 
  autoAck: false,
  maxRetries: 5 
});

consumer.start((message) => {
  try {
    // 处理消息
    processMessage(message);
    
    // 确认消息
    consumer.ackMessage(message);
  } catch (error) {
    console.error('处理消息失败:', error);
    
    // 拒绝消息，重新入队
    consumer.rejectMessage(message);
  }
});
```

## 注意事项

1. 这个实现是基于内存的，重启后消息会丢失（除非标记为持久化）
2. 在生产环境中，建议使用专业的消息队列服务，如RabbitMQ、Kafka等
3. 浏览器环境中，消息会在页面刷新后丢失
4. 大量消息可能会影响性能，建议根据实际需求进行优化

## 扩展建议

1. 添加消息优先级支持
2. 实现消息过期机制
3. 添加消息路由功能
4. 实现分布式消息队列
5. 添加消息持久化到本地存储或数据库
6. 实现消息的序列化和反序列化
7. 添加更详细的监控和统计功能