
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/** 25.K个一组翻转链表 O(n)O(1)
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    //前后指针
    const dummy = new ListNode(-1, head)
    let pre = dummy
    let cur = pre.next
    while (cur) {
        let tail = pre
        for (let i = 0; i < k; i++) {
            tail = tail.next
            if (!tail) {
                return dummy.next
            }
        }
        let next = tail.next
        const [start, end] = reverseList(cur, tail)
        pre.next = start
        end.tail = next
        pre = end
        cur = end.next
    }
    return dummy.next
};
function reverseList(start, end) {
    let pre = end.next
    let p = start
    while (pre!== end) {
        let tmp = p.next
        p.next = pre
        pre = p //修改pre 
        p = tmp
    }
    return [pre, start]
}