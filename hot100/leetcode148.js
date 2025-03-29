function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**148.排序链表 归并排序 O(nlog(n)) O(nlog(n)) 递归写法 自顶向下计算
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    if (head === null || head.next === null) {
        return head;
    }
    const mid = middleNode(head)
    let left = sortList(head)
    let right = sortList(mid)
    return mergeOrderList(left, right)
};
function middleNode(head) {
    let pre = head, slow = head, fast = slow
    while (fast && fast.next) {
        pre = slow
        slow = slow.next
        fast = fast.next.next
    }
    pre.next = null //断开连接 会断开连接
    return slow
}
function mergeOrderList(list1, list2) {
    const dummy = new ListNode(-1)
    const pre = dummy
    while (list1 && list2) {
        if (list1.val > list2.val) {
            pre.next = list2.next
            list2 = list2.next
        } else {
            pre.next = list1.next
            list1 = list1.next
        }
        pre = pre.next
    }
    pre.next = list1 ?? list2
    return dummy.next
}