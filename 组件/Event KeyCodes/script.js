const insert = document.querySelector('.insert')
window.addEventListener('keydown', (e) => {
    console.log(e);
    const key = e.key
    const keyCode = e.keyCode
    const code = e.code
    insert.innerHTML = `
    <div class="key">
    ${key === ' ' ? 'Space' : key}
    <small>event.key</small>
    </div>
    <div class="key">
    ${keyCode}
    <small>event.keyCode</small>
    </div>
    <div class="key">
    ${code}
    <small>event.code</small>
    </div>
    `
})