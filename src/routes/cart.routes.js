import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();

// Crear una instancia de CartManager con la ruta al archivo de carritos
const cartManager = new CartManager('./data/carts.json');

router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = cartManager.getCartById(parseInt(cid));

    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

router.post('/', (req, res) => {
    const newCart = cartManager.addCart();
    res.status(201).json({ message: 'Carrito creado correctamente', newCart });
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;

    const updatedCart = cartManager.addProductToCart(parseInt(cid), parseInt(pid));

    if (updatedCart) {
        res.json({ message: 'Producto agregado correctamente', updatedCart });
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
});

export default router;
