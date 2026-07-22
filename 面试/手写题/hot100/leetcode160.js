
function ListNode(val) {
    this.val = val;
    this.next = null;
}


/**
 * 链表A: a->b->c->d->e->f->null
 * 链表B:       m->d->e->f->null
 * a—>d:长度为x
 * m->d:长度为y
 * d->null:长度为z
 * x+z:A的长度
 * y+z:B的长度
 * 遍历完A后跳到B最后会在p相遇 此时则是相交的节点
 * (x+z)+y=(y+z)+x
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let p = headA, q = headB
    while (p !== q) {
        p = p ? p.next : headB;
        q = q ? q.next : headA;
    }
    return p
};