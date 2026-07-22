function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**  142.环形链表II 
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    //1.判断是否有环 
    //2.找到出口
    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (fast === slow) {
            //有环
            //slow:b步
            //fast:2b步
            //2b-b = k*c c:环的长度 k:圈数
            //相遇的点到入口距离= c-(b-a) =c+a-kc 当k==1时,d = a 这正好时初始节点到入口的位置
            let first = slow
            let second = head
            while (slow !== second) {
                first = first.next
                second = second.next
            }
            return first
        }
    }
    return null
};