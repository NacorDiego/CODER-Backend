const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const port = 8080;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Usar el router de productos
app.use('/api/productos', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(port,"localhost", () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});