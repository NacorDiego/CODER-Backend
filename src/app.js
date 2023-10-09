const express = require('express');
const app = express();
const productRoutes = require('./productRoutes.js');
const port = 8080;

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Usar el router de productos
app.use('/api/productos', productRoutes);

app.listen(port,"localhost", () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});