// Instancio socket del lado del cliente
const socket = io()

window.addEventListener('DOMContentLoaded', _event => {
    socket.on('greet', data => {
        const output = document.querySelector('#output')
        output.innerHTML += `<li>${data}</li>`
    })

    socket.on('productos-actualizados', data => {
        // Actualiza la vista con la nueva lista de productos
        const productList = document.querySelector('#productList')
        productList.innerHTML= '' // Limpio la lista antes de agregar los nuevos productos

        data.forEach(product => {
            productList.innerHTML += `<li>${product.title}</li>`
        })
    })

    socket.emit('message', 'Hola, me estoy comunicando desde un webSocket!!!')
})