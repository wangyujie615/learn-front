// OR239:数颜色
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while (line = await readline()) {
        const str = line.split('')
        const count = Array(3).fill(0)
        for (let i = 0; i < str.length; i++) {
            if (str[i] === 'R') {
                count[0]++
            } else if (str[i] === 'G') {
                count[1]++
            } else {
                count[2]++
            }
        }
        console.log(`(${count.join(',')})`)
    }
}()
