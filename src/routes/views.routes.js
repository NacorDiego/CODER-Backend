import { Router } from 'express'
import ProductManagerMongo from '../managers/ProductManagerMongo.js'

const router = Router()

export const viewsRouter = (io) => {
    const productManager = new ProductManagerMongo()

    router.get('/', (req, res) => {
      const products = productManager.getProducts()
      res.render('home', { products })
    })

    router.get('/realtimeproducts', (req, res) => {
      const products = productManager.getProducts()
      console.log(`Productos /realtimeproducts: ${products}`)
      res.render('realTimeProducts', { products })
    })

    // En tu servidor WebSocket, emite un evento cuando se agrega o elimina un producto
    io.on('connection', (socket) => {
      socket.on('nueva-solicitud', () => {
        const products = productManager.getProducts()
        // Emite los productos actualizados a la vista en tiempo real
        io.emit('productos-actualizados', products)
      })
    })

    io.on('productos-actualizados', (products) => {
      console.log('Productos actualizados recibidos: ', products)
      // Actualizo la vista con la lista actualizada
      res.render('realTimeProducts', { products })
    })

    return router
}