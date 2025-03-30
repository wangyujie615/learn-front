/**Leetcode_1255:得分最高的单词集合
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
var maxScoreWords = function (words, letters, score) {
    const n = words.length;
    let res = 0;
    
    // 统计每个字母的可用数量
    const letterCount = new Array(26).fill(0);
    for (const c of letters) {
        letterCount[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    const dfs = (index, currentScore, remainingLetters) => {
        if (index === n) {
            res = Math.max(res, currentScore);
            return;
        }
        
        // 不选当前单词
        dfs(index + 1, currentScore, [...remainingLetters]);
        
        // 尝试选当前单词
        const word = words[index];
        const tempLetters = [...remainingLetters];
        let canForm = true;
        let wordScore = 0;
        
        // 检查是否可以组成这个单词
        for (const c of word) {
            const idx = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if (tempLetters[idx] <= 0) {
                canForm = false;
                break;
            }
            tempLetters[idx]--;
            wordScore += score[idx];
        }
        
        if (canForm) {
            dfs(index + 1, currentScore + wordScore, tempLetters);
        }
    };
    
    dfs(0, 0, letterCount);
    return res;
};
const words = ["dog", "cat", "dad", "good"], letters = ["a", "a", "c", "d", "d", "d", "g", "o", "o"], score = [1, 0, 9, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
console.log(maxScoreWords(words, letters, score));