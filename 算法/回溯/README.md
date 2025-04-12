# 回溯
## 简介
回溯本质就是一个**增量构造答案**的过程，这个过程往往使用递归实现。

思路：(回溯三问)
1. 当前操作是什么?
2. 子问题是什么?
3. 下一个子问题是什么?

例题：Leetcode_17: 电话号码的数字组合
``` javascript
var letterCombinations = function(digits) {
    if(!digits) return []
    const table = ["", "","abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
    const n = digits.length
    const res = []
    const dfs = (start, temp) => {
        if (temp.length === n) {
            res.push(temp.join(''))
            return
        }
        for (let i = start; i < n; i++) {
            const num = +digits[i]
            for (const char of table[num]) {
                temp.push(char)
                dfs(i + 1, temp)
                temp.pop()
            }
        }
    }
    dfs(0, [])
    return res
};
```
### 子集型回溯
两种模板：
1. 从输入的角度来看：
- 当前操作：当前的元素选/不选
- 子问题：从下标`>i`的位置选择子串
- 下一个子问题：从下标`>i+1`的位置选择子串
2. 从结果的角度来看：
- 当前操作：枚举第`i`个元素
- 子问题：从下标`>i`的位置选择子串
- 下一个子问题：
例子：Leetcode_78：子集
```javascript 
// 从输入的角度去看
var subsets = function (nums) {
    // 当前操作: 对于数组中的当前元素选/不选
    // 子问题: 查看后续>i中元素
    // 下一个子问题: 查看后续>i+1中元素
    const n = nums.length;
    const res = [];
    const path = [];
    const dfs = (i) => {
        if (i === n) {
            res.push(path.slice())
            return
        }
        //当前元素不选 跳过
        dfs(i + 1)
        //选择当前元素
        path.push(nums[i])
        dfs(i + 1)
        // 这里为什么要进行回退 
        // 因为 我选择了[1] 会有 [1,2] [1,3]的情况产生
        // 恢复现场
        path.pop()
    }
    dfs(0)
    return res
};
```
```javascript 
var subsets2 = function (nums) {
    //从输出的角度看
    // 当前操作: 枚举选那个元素
    // 子问题: 
    // 下一个子问题: 查看后续>i+1中元素
    const n = nums.length;
    const res = [];
    const dfs = (start, path) => {
        res.push(path.slice())
        for (let i = start; i < n; i++) {
            path.push(nums[i])
            dfs(i + 1, path)
            path.pop()
        }
    }
    dfs(0, [])
    return res
};
```
相关例题：
| 题目      | 题号 |      备注       |
| :-----------: | :-----------: |:--------:|
| Leetcode_78   | 子集        |   |
| Leetcode_784   | 字母大小全排列        |   |
| Leetcode_494   | 目标和        | 回溯、DP  |
| LCP 51   | 烹饪料理        |   |
| Leetcode_2397   | 被列覆盖的最多行数        |   |
| Leetcode_1239   | 串联字符串的最大长度        |   |
| Leetcode_2212   | 射箭比赛中的最大得分       |   |
| Leetcode_1255   | 得分最高的单词集合       |   |
### 划分型回溯
划分型回溯，可以将划分的边界当作是一个子集进行查找

相关例题：
| 题目      | 题号 |      备注       |
| :-----------: | :-----------: |:--------:|
| Leetcode_131   | 分割回文串        |   |
| Leetcode_2698 | 求一个整数的惩罚数 |   |
| Leetcode_1593 | 拆分字符串使唯一子字符串的数目最大| |
| Leetcode_1849 | 将字符串拆分为递减的连续值|  |
| Leetcode_93| 复原IP地址|  |

### 组合型回溯
组合型回溯，也是子集型回溯的一种，需要考虑个数问题

相关例题：
| 题目      | 题号 |      备注       |
| :-----------: | :-----------: |:--------:|
| Leetcode_77   | 组合        |   |
| Leetcode_216 | 组合总和 | HOT100  |
| Leetcode_22 | 括号生成| HOT100 |
| Leetcode_301 | 删除无效括号| 未作 |



### 排列型回溯


### 有重复元素的回溯