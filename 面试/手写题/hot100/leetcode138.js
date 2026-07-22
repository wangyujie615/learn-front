
function _Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
};


/**138.随机链表的复制
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
    //思路1: hashmap 利用HashMap存储节点 O(n) O(n)
    const map = new Map()
    let p = head
    while (p) {
        map.set(p, new _Node(p.val))
        p = p.next
    }
    let q = head
    while (q) {
        map.get(q).next = map.get(q.next) || null
        map.get(q).random = map.get(q.random) || null
        q = q.next
    }
    return map.get(head)
};

/**138.随机链表的复制
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
    if (head == null) return null;
    //思路2: 克隆节点 拆分
    //1.将所有节点克隆后放置后面
    let p = head
    while (p) {
        const tmp = p.next
        p.next = new _Node(p.val)
        p.next.next = tmp
        p = tmp
    }
    //2.指定克隆后节点的random指针
    p = head
    while (p) {
        if (p.random) p.next.random = p.random.next //p.next.random:克隆节点的random指针 ->指向原始节点的random节点的克隆节点
        p = p.next.next
    }
    //3.拆分链表
    p = head
    let cloneHead = p.next;
    let clone = cloneHead;
    while (clone.next) {
        p.next = p.next.next
        p = p.next
        clone.next = clone.next.next
        clone = clone.next
    }
    p.next = null
    return cloneHead
};
