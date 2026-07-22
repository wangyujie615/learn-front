
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
/**双指针 O(M) O(1)*/
var removeNthFromEnd = function (head, n) {
    //删除倒数的第n个节点
    //倒数第2个 5
    // 1 2 3 4 5 6
    //     3
    const dummy = new ListNode(0,head)
    let left = dummy,right = dummy
    while(n--){
        right =right.next
    }
    while(right.next){
        left = left.next
        right = right.next
    }
    left.next = left.next.next
    return dummy.next
};

/**
 * 栈的写法 O(N) O(N)
 * @param {*} head 
 * @param {*} n 
 * @returns 
 */
var removeNthFromEnd = function (head, n) {
    const dummy = new ListNode(-1,head)
    let pre = dummy
    const stack = []
    while(pre){
        stack.push(pre)
        pre = pre.next
    }
    for (let i = 0; i < n; i++) {
        stack.pop()
    }
    const prev = stack[stack.length-1]
    prev.next = prev.next.next
    return dummy.next
};