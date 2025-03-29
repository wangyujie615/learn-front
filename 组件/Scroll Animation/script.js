const boxes = document.querySelectorAll('.box')
window.addEventListener('scroll', checkBoxes)
checkBoxes() //刚加载时也要触发该函数
function checkBoxes() {
    //window.innerHeight:网页视口的高度 触发的位置
    const triggerBottom = window.innerHeight / 5 * 4
    boxes.forEach(box => {
        //获取一个元素相对于视口（viewport）顶部 的距离（以像素为单位）。
        const boxTop = box.getBoundingClientRect().top

        if (boxTop < triggerBottom) {
           //若距离视口顶部的距离小于 触发的位置 则显示

            box.classList.add('show')
        } else {
            //反之 则不显示
            box.classList.remove('show')
        }
    })
}