//OR244:讨厌鬼的区间
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    // [1,3] [2,4] [4,6]
    // a:[1,3] b:[2,4] 最大是3+3 两个区间交集中的最大值
    while (line = await readline()) {
        const input = line.split(' ').map(item => parseInt(item))
        let res = -1
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (j !== i) {
                    const startA = input[i * 2]
                    const endA = input[i * 2 + 1]
                    const startB = input[j * 2]
                    const endB = input[j * 2 + 1]
                    //交集的判断条件
                    if ((startB <= endA && startA <= startB) || (startA <= endB && startB <= startA)) {
                        //有交集
                        const left = Math.max(startA, startB)
                        const right = Math.min(endA, endB)
                        res = Math.max(res, 2 * Math.max(left, right))
                    }
                }
            }
        }
        console.log(res)
    }
}()
