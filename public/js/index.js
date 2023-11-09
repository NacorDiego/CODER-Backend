// Instancio socket del lado del cliente
const socket = io()

window.addEventListener('DOMContentLoaded', _event => {
    socket.on('greet', data => {
        const output = document.querySelector('#output')
        output.innerHTML += `<li>${data}</li>`
    })

    socket.emit('message', 'Hola, me estoy comunicando desde un webSocket!!!')
})