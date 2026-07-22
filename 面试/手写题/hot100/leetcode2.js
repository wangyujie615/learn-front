
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**2.两数之和 
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    //返回的是一个链表 时间:O(n) 空间:O(1)
    let res = new ListNode(-1)
    let p = res
    //当节点为空时0
    let pre = 0 //记录上一个节点产生的进位
    while (l1 && l2) {
        const sum = l1.val + l2.val + pre
        pre = Math.floor(sum / 10)
        res.next = new ListNode(sum % 10)
        res = res.next
        l1 = l1.next
        l2 = l2.next
    }
    //遍历结束
    while (l1) {
        const sum = l1.val + pre
        pre = Math.floor(sum / 10)
        res.next = new ListNode(sum % 10)
        l1 = l1.next
        res = res.next
    }
    while (l2) {
        const sum = l2.val + pre
        pre = Math.floor(sum / 10)
        res.next = new ListNode(sum % 10)
        l2 = l2.next
        res = res.next
    }
    if (pre > 0) {
        res.next = new ListNode(pre)
    }
    return p.next
};
/**上述方法优化 */
var addTwoNumbers = function (l1, l2) {
    //返回的是一个链表
    let res = new ListNode(-1)
    let p = res
    //当节点为空时0
    let pre = 0 //记录上一个节点产生的进位
    while (l1 || l2 || pre) {
        if (l1) {
            pre += l1.val
            l1 = l1.next
        }
        if (l2) {
            pre += l2.val
            l2 = l2.next
        }
        res.next = new ListNode(pre % 10)
        res = res.next
        pre = Math.floor(pre / 10)
    }
    return p.next
};

/*递归法 O(n) O(n)*/
var addTwoNumbers = function (l1, l2, carry = 0) {
    if (!l1 && !l2) {
        return carry ? new ListNode(carry) : null
    }
    if (!l1) {
        //交换保证l1非空
        [l1, l2] = [l2, l1]
    }
    const sum = carry + l1.val + (l2 ? l2.val : 0)
    l1.val = sum % 10
    carry = Math.floor(sum / 10)
    l1.next = addTwoNumbers(l1.next, (l2 ? l2.next : null), carry)
    return l1
}