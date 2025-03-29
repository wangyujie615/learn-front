function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**24.两两狡猾链表中的节点 迭代法 O(n) O(1)
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    // pre->1 ->2->3-4->5-6
    //    pre first second third
    //   pre.next =second
    // second.next = first
    // first.next = third
    const dummy = new ListNode(-1, head)
    let pre = dummy
    while (pre.next && pre.next.next) {
        const first = pre.next
        const second = pre.next.next
        const tail = second.next
        pre.next = second
        second.next = first
        first.next = tail
        pre = first
    }
    return dummy.next
};
/**
 * 递归法 O(N) O(N)
 * @param {} head 
 * @returns 
 */
var swapPairs = function (head) {
    if (!head || !head.next) return head
    const node1 = head
    const node2 = head.next
    const node3 = node2.next
    node1.next = swapPairs(node3)
    node2.next = node1
    return node2
};