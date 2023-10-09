const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager.js');

// Crear una instancia de ProductManager con la ruta al archivo de productos
const productManager = new ProductManager('../data/productos.json');

router.get('/', (req, res) => {
    console.log('Solicitud GET a /products');
    const { limit } = req.query;

    const products = productManager.getProducts();
    console.log('Productos:', products);

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
});

// Endpoint para obtener un producto por ID
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(parseInt(pid));

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

router.post('/', (req, res) => {
    console.log('Solicitud POST a /'); // Registro de depuración

    const { title, description, code, price, stock, category, thumbnails } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
    }

    // Crear un nuevo objeto de producto con los campos proporcionados
    const newProduct = {
        title,
        description,
        code,
        price,
        status: true, // Por defecto, el status es true
        stock,
        category,
        thumbnails: thumbnails || [], // Si no se proporciona "thumbnails", usar un array vacío
    };

    // Agregar el nuevo producto al conjunto de productos
    productManager.addProduct(newProduct);

    // Guardar los productos actualizados en el archivo "productos.json"
    productManager.saveProducts();

    // Enviar una respuesta de éxito
    res.status(201).json({ message: 'Producto agregado correctamente', newProduct });
});

router.put('/:pid', (req, res) => {
    const { pid } = req.params; // Obtener el ID del producto de los parámetros de la URL
    const updatedProductData = req.body; // Obtener los datos actualizados del producto del cuerpo de la solicitud

    // Busca el producto por ID
    const productToUpdate = productManager.getProductById(parseInt(pid));

    if (!productToUpdate) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualiza los campos del producto (excepto el ID)
    Object.assign(productToUpdate, updatedProductData);

    // Guarda los productos actualizados en el archivo "productos.json"
    productManager.saveProducts();

    // Envía una respuesta con el producto actualizado
    res.json({ message: 'Producto actualizado correctamente', updatedProduct: productToUpdate });
});

router.delete('/:pid', (req, res) => {
    const { pid } = req.params; // Obtén el ID del producto de los parámetros de la URL

    // Busca el producto por ID
    const productToDelete = productManager.getProductById(parseInt(pid));

    if (!productToDelete) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Elimina el producto de la lista de productos
    productManager.deleteProduct(parseInt(pid));

    // Guarda los productos actualizados en el archivo "productos.json"
    productManager.saveProducts();

    // Envía una respuesta con un mensaje de éxito
    res.json({ message: 'Producto eliminado correctamente' });
});

module.exports = router;