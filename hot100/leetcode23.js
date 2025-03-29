function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
 
/**23.合并K个升序链表 合并n-1次 O（nlogK） O(logk) 分治法
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    const dfs = (i, j) => {
        const m = j - i
        if (m === 0) {
            return null
        }
        if (m === 1) {
            return lists[i] //只有一个有序链表
        }
        const left = dfs(i, i + Math.floor(m / 2)) //合并前一半链表
        const right = dfs(i + Math.floor(m / 2), j) //合并后一半链表
        return mergeOrderList(left, right)
    }
    return dfs(0, lists.length)
};
function mergeOrderList(list1, list2) {
    const dummy = new ListNode()
    let cur = dummy
    while (list1 && list2) {
        if (list1.val > list2.val) {
            cur.next = list2
            list2 = list2.next
        } else {
            cur.next = list1
            list1 = list1.next
        }
        cur = cur.next
    }
    cur.next = list1 ?? list2
    return dummy.next
}