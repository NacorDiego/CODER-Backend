const port = 8080;
const express = require('express');
const app = express();
const ProductManager = require('./ProductManager.js');
const productsRouter = require('./productsRouter.js');

// Crear una instancia de ProductManager con la ruta al archivo de productos
const productManager = new ProductManager('productos.json');
console.log(productManager);

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Usar el enrutador de productos en la ruta "/api/products/"
app.use('/api/products', productsRouter(productManager));

app.listen(port,"localhost", () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
