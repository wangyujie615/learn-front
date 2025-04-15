const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while ((line = await readline()) && (line1 = await readline()) && (line2 = await readline())) {
        const input = line.split(' ')
        const a = line1.split(' ')
        const b = line2.split(' ')
        let sum = 0
        for (let i = 0; i < input[0]; i++) {
            sum += Math.min(a[i], b[i])
        }
        console.log(Math.min(sum, input[1]))
    }
}()
