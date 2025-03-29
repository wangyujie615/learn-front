
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**21.合并两个有序链表
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    //链表有序 O(M+N) O(1)
    let res = new ListNode(-1)
    let p = res
    let first = list1, second = list2
    while (first && second) {
        if (first.val > second.val) {
            res.next = second
            second = second.next
        } else {
            res.next = first
            first = first.next
        }
        res = res.next
    }
    res.next = first ?? second
    return p.next
};
//递归写法
var mergeTwoLists = function (list1, list2) {
    //O(m+n) O(m+n)
    if (!list1) return list2
    if (!list2) return list1
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    }
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
}