import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()

export const viewsRouter = (io) => {
    const productManager = new ProductManager(process.cwd() + '/src/data/productos.json')

    router.get('/', (req, res) => {
      const products = productManager.getProducts()
      res.render('home', { products })
    })

    router.get('/realtimeproducts', (req, res) => {
      const products = productManager.getProducts()
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

    return router
}

// const productManager = new ProductManager(process.cwd() + '/src/data/productos.json')

// router.get('/', (req, res) => {
//     const products = productManager.getProducts()
//     res.render('home', { products })
// })

// router.get('/realtimeproducts',(req, res) => {
//     const products = productManager.getProducts()
//     res.render('realTimeProducts', { products })
// })

// // En tu servidor WebSocket, emite un evento cuando se agrega o elimina un producto
// socketServer.on("connection", (socket) => {
//     socket.on("nueva-solicitud", () => {
//         const products = productManager.getProducts()
//         // Emite los productos actualizados a la vista en tiempo real
//         socketServer.emit("productos-actualizados", products)
//     })
// })

// export { router }