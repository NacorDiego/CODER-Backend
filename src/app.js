import { createServer } from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import viewsRoutes from './routes/views.routes.js'
import { engine } from 'express-handlebars'
import __dirname from './utils.js'

const port = 8080
const app = express()
const httpServer = createServer(app)
const socketServer = new Server(httpServer)

app.engine('handlebars', engine()) // Inicializamos el motor indicando con app.engine('qué motor utilizaremos', el motor instanciado)
app.set('views', process.cwd() + '/views') // Indicamos en qué parte estarán las rutas
app.set('view engine', 'handlebars') // Indicamos que 'handlebars' sea nuestro motor de vistas predeterminado
app.use(express.static(process.cwd() + '/public'))

// Middleware para procesar JSON en las solicitudes
app.use(express.json())

// Usar el route de productos y carrito.
app.use('/api/productos', productRoutes)
app.use('/api/carts', cartRoutes)

// La lógica de las vistas queda en el router de vistas
app.use('/', viewsRoutes)

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    // Dejo al socket escuchando hasta que el cliente mande un msj o evento al ID 'message'
    socket.on('message', data => {
        console.log(data)
    })

    // 3 formas de enviar mensajes desde el servidor
    socket.emit('evento_para_socket_individual','Este msj solo lo recibe el socket.')
    socket.broadcast.emit('evento_para_todos_menos_el_actual','Este msj lo reciben todos menos el socket actual.')
    socketServer.emit('evento_para_todos','Este msj lo reciben todos los socket.')
})

httpServer.listen(port, () => console.log(`Server is running at http://localhost:${port}`))