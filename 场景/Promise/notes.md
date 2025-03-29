## Promise
Promise A+ 规范的具体内容
### 术语

2. thenable,具有 then 方法的对象或函数
3. value,返回成功执行之后的值
4. exception, 通过 throw 语法
5. reason, 拒绝

### 要求
1. 状态
pending(等待)、fulfilled(成功)、rejected(失败)
pending->fulfilled
pending->rejected
pending x->fulfilled
pending x->rejected
2. 方法,then()

promise.then(onFulfilled,onRejected)
`onFulfilled`:promise完成之后执行
`onRejected`:promise失败后回调
then 会返回promise对象
