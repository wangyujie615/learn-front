function ListNode(val) {
    this.val = val;
    this.next = null;
}
/** 206.反转链表 双指针写法*/
var reverseList = function(head) {
    let pre = null
    let cur = head
    while(cur){
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};

/** 206.反转链表 递归写法*/
var reverseList = function(head) {
    if(!head||!head.next){
        return head
    }
    let cur = reverseList(head.next)
    head.next.next = head
    head.next = null
    return cur
};