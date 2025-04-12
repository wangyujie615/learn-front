// OR 150:树的不同形态
// 思路：
// 注意前序中序遍历思路的区别
// 根据层序遍历和中序遍历构建树,层序遍历具有跨层的特点
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

function TreeNode(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
}
void async function () {
    // Write your code here
    const createTree = (layer, mid) => {
        if (layer.length === 0 || mid.length === 0) return null
        const value = layer[0]
        const split = mid.indexOf(value)
        const root = new TreeNode(value)
        const leftMid = mid.slice(0, split)
        const rightMid = mid.slice(split + 1)
        const left = new Set(leftMid)
        const right = new Set(rightMid)
        const leftLevel = [], rightLevel = []
        for (let i = 1; i < layer.length; i++) {
            if (left.has(layer[i])) {
                leftLevel.push(layer[i])
            } else if (right.has(layer[i])) {
                rightLevel.push(layer[i])
            }

        }
        root.left = createTree(leftLevel, leftMid)
        root.right = createTree(rightLevel, rightMid)
        return root 
    }
    while ((line1 = await readline()) && (line2 = await readline())) {
        const layerInput = line1.split(' ')
        const midInput = line2.split(' ')
        const root = createTree(layerInput, midInput)
        const tail = [], pre = [], end = []
        const preorder = (node) => {
            if (!node) return null
            if (!node.left && !node.right) tail.push(node.value)
            pre.push(node.value)
            preorder(node.left)
            preorder(node.right)
        }
        const endorder = (node) => {
            if (!node) return null
            endorder(node.left)
            endorder(node.right)
            end.push(node.value)
        }
        preorder(root)
        endorder(root)
        console.log(tail.join(''))
        console.log(pre.join(''))
        console.log(end.join(''))
    }
}()
