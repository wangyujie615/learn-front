
function ListNode(val) {
    this.val = val;
    this.next = null;
}


/**141.环形链表 快慢指针
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if(!head||!head.next) return false
    //快慢指针
    let slow = fast = head
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) return true
    }
    return false
};
//法2：hash表
var hasCycle = function (head) {
    const set = new Set()
    while(head){
        if(set.has(head)){
            return true
        }
        set.add(head)
        head = head.next
    }
    return false
};