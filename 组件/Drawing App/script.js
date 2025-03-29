const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')
let draw = false // 设置画板的状态
let x
let y
let size = 10;
let color = "black";
//画
canvas.addEventListener('mousedown', (e) => {
    //设置起点
    x = e.offsetX
    y = e.offsetY
    draw = true
})
canvas.addEventListener('mouseup', () => {
    draw = false
    x = undefined
    y = undefined
})
canvas.addEventListener('mousemove', (e) => {
    if (draw) {
        let x2 = e.offsetX
        let y2 = e.offsetY
        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)
        x = x2
        y = y2
    }
})
function drawCircle(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill();
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = 2 * size
    ctx.stroke()
}
const sizeText = document.getElementById('size')
const increase = document.getElementById('increase')
const decrease = document.getElementById('decrease')
const clearE1 = document.getElementById('clear')
const colorE1 = document.getElementById('color')
increase.addEventListener('click', () => {
    if (size < 50) {
        size += 5
        sizeText.innerHTML = `${size}`
    }
})
decrease.addEventListener('click', () => {
    if (size > 5) {
        size -= 5
        sizeText.innerHTML = `${size}`
    }
})
colorE1.addEventListener("change", (e) => color = e.target.value)
clearE1.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))