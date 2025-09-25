/**
 * 自定义repeat方法，模拟String.prototype.repeat的功能
 * 将字符串重复指定的次数
 * 
 * @param {string} str - 要重复的字符串
 * @param {number} count - 重复的次数，必须是非负整数
 * @returns {string} 重复后的字符串
 * @throws {RangeError} 如果count为负数或无穷大，抛出RangeError
 * @throws {TypeError} 如果count不是有效数字，抛出TypeError
 */
function repeat(str, count) {
  // 参数验证
  if (str == null) {
    throw new TypeError('String is null or undefined');
  }
  
  // 将输入转换为字符串
  str = String(str);
  
  // 验证count参数
  count = Number(count);
  
  // 检查count是否为有效数字
  if (Number.isNaN(count)) {
    throw new TypeError('repeat count must be a valid number');
  }
  
  // 检查count是否为负数或无穷大
  if (count < 0 || count === Infinity) {
    throw new RangeError('repeat count must be a non-negative finite number');
  }
  
  // 将count转换为整数
  count = Math.floor(count);
  
  // 处理边界情况
  if (str.length === 0 || count === 0) {
    return '';
  }
  
  // 优化：对于大量重复，使用更高效的方法
  if (count > 1000) {
    // 防止可能的内存问题
    let result = '';
    for (let i = 0; i < count; i++) {
      result += str;
    }
    return result;
  }
  
  // 标准实现：使用数组join方法
  return new Array(count + 1).join(str);
}

// 扩展String原型（可选）
if (!String.prototype.customRepeat) {
  String.prototype.customRepeat = function(count) {
    return repeat(this, count);
  };
}