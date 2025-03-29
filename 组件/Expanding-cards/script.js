const panels = document.querySelectorAll('.panel')
panels.forEach((panel)=>{
    panel.addEventListener('click',()=>{
        //先移除所有的active
        removeActiveClass()
        panel.classList.add('active')
    })
})
function removeActiveClass(){
    panels.forEach(panel=>{
        panel.classList.remove('active')
    })
}