// Instancio socket del lado del cliente
const socket = io();

// Envio un mensaje desde el socket del cliente al servidor, con el ID 'message'
socket.emit('message', 'Hola, estoy me estoy comunicando desde el socket del cliente!');