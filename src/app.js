import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';

const port = 8080;
const app = express();
const httpServer = app.listen(port, "localhost", () => console.log(`Servidor Express en ejecución en http://localhost:${port}`));

// Instancio un socket del lado del servidor
const socketServer = new Server(httpServer);

// Inicializamos el motor indicando con app.engine('qué motor utilizaremos', el motor instanciado)
app.engine('handlebars', handlebars.engine());
// Indicamos en qué parte estarán las rutas
app.set('views', __dirname + '/views');
// Indicamos que 'handlebars' sea nuestro motor de vistas predeterminado
app.set('view engine', 'handlebars');

// Seteamos de manera estática nuestra carpeta public
app.use(express.static(__dirname + '/public'));

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Usar el route de productos y carrito.
app.use('/api/productos', productRoutes);
app.use('/api/carts', cartRoutes);

// La lógica de las vistas queda en el router de vistas
app.use('/', viewsRouter);

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    // Dejo al socket escuchando hasta que el cliente mande un msj o evento al ID 'message'
    socket.on('message', data => {
        console.log(data);
    });
});

// pag 50