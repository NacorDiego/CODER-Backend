// Instancio socket del lado del cliente
const socket = io()

// Envio un mensaje desde el socket del cliente al servidor, con el ID 'message'
socket.emit('message', 'Hola, estoy me estoy comunicando desde el socket del cliente!')

socket.on('evento_para_socket_individual', data => {
    console.log(data)
})

socket.on('evento_para_todos_menos_el_actual', data => {
    console.log(data)
})

socket.on('evento_para_todos', data => {
    console.log(data)
})