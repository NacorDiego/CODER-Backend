import { Router } from 'express'
import productModel from '../models/products.model.js'

const router = Router()

export const viewsRouter = (io) => {

    router.get('/', async (req, res) => {
      const products = await productModel.find()
      res.render('home', { products })
    })

    router.get('/realtimeproducts', async (req, res) => {
      const products = await productModel.find()
      res.render('realTimeProducts', { products })
    })

    // En tu servidor WebSocket, emite un evento cuando se agrega o elimina un producto
    io.on('connection', (socket) => {
      socket.on('nueva-solicitud', async () => {
        const products = await productModel.find()
        // Emite los productos actualizados a la vista en tiempo real
        io.emit('productos-actualizados', products)
      })
    })

    io.on('productos-actualizados', (products) => {
      // Actualizo la vista con la lista actualizada
      res.render('realTimeProducts', { products })
    })

    return router
}