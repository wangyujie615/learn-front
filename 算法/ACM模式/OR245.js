//OR250:1=N
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while (line = await readline()) {
        let n = parseInt(line);
        //进行因式分解 分解的最细
        let res = 0;
        let i = 2
        while (i * i <= n) {
            while (n % i === 0) {
                res += i
                n = Math.floor(n / i)
            }
            i++;
        }
        if (n > 1) res += n
        console.log(res)
    }
}()
