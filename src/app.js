const express = require('express');
const ProductManager = require('./ProductManager.js');
const app = express();
const port = 3000;

// Crear una instancia de ProductManager con la ruta al archivo de productos
const productManager = new ProductManager('./productos.json');

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Endpoint para obtener todos los productos con límite opcional
app.get('/products', (req, res) => {
    const { limit } = req.query;
    const products = productManager.getProducts();
    
    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
});

// Endpoint para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(parseInt(pid));
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
