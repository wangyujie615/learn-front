var buildTree = function (preorder, inorder) {
    const n = preorder.length
    const map = new Map()
    for (let i = 0; i < n; i++) {
        map.set(inorder[i], i)
    }
    const dfs = (preL, preR, inL, inR) => {
        if (preL === preR) return null
        const node = new Node(preorder[preL])
        const leftSize = map.get(preorder[preL]) - inL // 中序遍历左边的元素的大小
        node.left = dfs(preL + 1, preL + 1 + leftSize, inL, inL + leftSize)
        node.right = dfs(preL + 1 + leftSize, preR, inL + leftSize, inR)
        return node
    }
    return dfs(0, n, 0, n)
};