import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()

const productManager = new ProductManager(process.cwd() + '/src/data/productos.json')

router.get('/', (req, res) => {
    const products = productManager.getProducts()
    console.log('Productos cargados:', products)
    res.render('home', { products })
})

router.get('/realtimeproducts',(req, res) => {
    const products = productManager.getProducts()
    res.render('realTimeProducts',{ products })
})

export { router }