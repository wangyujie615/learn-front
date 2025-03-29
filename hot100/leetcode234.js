function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
/** 234.回文链表
 * 找到中间的节点
 * 反转后比较
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    //思路一反转链表比较 O(n) O(1)
    const reverse = (head) => {
        let pre = null, cur = head
        while (cur) {
            const t = cur.next
            cur.next = pre
            pre = cur
            cur = t
        }
        return pre
    }
    const findMidNode = (head) => {
        let slow = head, fast = head
        while (fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
        }
        return slow
    }
    const mid = findMidNode(head)
    let halfReverse = reverse(mid)
    while (halfReverse) {
        if (head.val !== halfReverse.val) return false
        head = head.next
        halfReverse = halfReverse.next
    }
    return true
};