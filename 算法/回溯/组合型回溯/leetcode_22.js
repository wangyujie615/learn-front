/**Leetcode_22:括号生成
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
   const res = [], path = []
   //组合问题 子集 过程中记录个数 保证查找的过程中 left>=right 满足答案
   const dfs = (i, left, right) => {
      if (i === n * 2) {
         if (left === right) res.push(path.slice().join(''))
         return
      }

      //记录左右括号的个数
      if (left <= right) {
         //这个位置可以选择填左括号
         path.push('(')
         dfs(i + 1, left + 1, right)
         path.pop()
      } else {
         //right<left 当前位置可以是左括号也可以时右括号
         //右括号的数量小于左括号的数量
         path.push('(')
         dfs(i + 1, left + 1, right)
         path.pop()

         path.push(')')
         dfs(i + 1, left, right + 1)
         path.pop()
      }
   }
   dfs(0, 0, 0)
   return res
};

var generateParenthesis2 = function (n) {
   const res = [], path = []
   //组合问题 子集 过程中记录个数 保证查找的过程中 left>=right 满足答案
   const dfs = (i, left, right) => {
      if (i === n * 2) {
         if (left === right) res.push(path.slice().join(''))
         return
      }
      path.push('(')
      dfs(i + 1, left + 1, right)
      path.pop()
      if (left > right) {
         path.push(')')
         dfs(i + 1, left, right + 1)
         path.pop()
      }
   }
   dfs(0, 0, 0)
   return res
};

var generateParenthesis3 = function (n) {
   const res = [], path = []
   //组合问题 子集 过程中记录个数 保证查找的过程中 left>=right 满足答案
   const dfs = (start, left, right) => {
      if (start === 2 * n) {
         //满足条件
         if (left === right && left === n) res.push(path.slice().join(''))
      }
      for (let i = start; i < 2 * n; i++) {
         path.push('(')
         dfs(i + 1, left + 1, right)
         path.pop()
         if (left > right) {
            path.push(')')
            dfs(i + 1, left, right + 1)
            path.pop()
         }
      }
   }
   dfs(0, 0, 0)
   return res
};