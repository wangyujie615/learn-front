/**LCP_51: 烹饪料理
 * @param {number[]} materials
 * @param {number[][]} cookbooks
 * @param {number[][]} attribute
 * @param {number} limit
 * @return {number}
 */
var perfectMenu = function (materials, cookbooks, attribute, limit) {
    // 从输入的角度看
    // 操作：点第i道菜 
    //分析：一共有n道菜 
    const n = attribute.length;
    let res = -1, capacity = 0;
    const dfs = (i, del) => {
        if (i === n) {
            if (capacity >= limit && materials.every(item => item >= 0)) {
                res = Math.max(res, del)
            }
            return
        }
        //不做当前这道菜
        dfs(i + 1, del)

        //做当前这道菜 
        capacity += attribute[i][1]
        del += attribute[i][0]
        for (let j = 0; j < materials.length; j++) {
            materials[j] -= cookbooks[i][j]
        }
        dfs(i + 1, del)
        del -= attribute[i][0]
        capacity -= attribute[i][1]
        for (let j = 0; j < materials.length; j++) {
            materials[j] += cookbooks[i][j]
        }
    }
    dfs(0, 0)
    return res
};

var perfectMenu2 = function (materials, cookbooks, attribute, limit) {
    //从输出的角度看
    const n = cookbooks.length
    let capacity = 0, res = -1
    const dfs = (start, del) => {
        if (capacity >= limit && materials.every(item => item >= 0)) {
            res = Math.max(res, del)
        }
        for (let i = start; i < n; i++) {
            //
            if (materials.every((item,index)=> item >= cookbooks[i][index])) {
                capacity += attribute[i][1]
                del += attribute[i][0]
                for (let j = 0; j < materials.length; j++) {
                    materials[j] -= cookbooks[i][j]
                }
                dfs(i + 1, del)
                capacity -= attribute[i][1]
                del -= attribute[i][0]
                for (let j = 0; j < materials.length; j++) {
                    materials[j] += cookbooks[i][j]
                }
            }
        }
    }
    dfs(0, 0)
    return res
};