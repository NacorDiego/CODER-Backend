import express from 'express';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();
const port = 8080;

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

// Usar el router de productos
app.use('/api/productos', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(port,"localhost", () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});