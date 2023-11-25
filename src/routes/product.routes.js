import express from 'express'
import { socketServer } from '../app.js'
import productModel from '../models/products.model.js'

const router = express.Router()

router.get('/', async (req, res) => {
    console.log('Solicitud GET a /api/productos')
    try {
        const products = await productModel.find()
        res.json({status: "Success", data: products})
    } catch (error) {
        console.error(error.message)
        res.json({status: "Error", message: "No se pudo obtener la lista de productos"})
    }
})

// Endpoint para obtener un producto por ID
router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    console.log(`Solicitud GET a /api/productos/${pid}`)
    try {
        const product = await productModel.findById(pid)
        res.json({status: "Success", data:product})
    } catch (error) {
        console.error(error.message)
        res.json({status: "Error", message: "No se puede obtener el producto"})
    }
})

router.post('/', async (req, res) => {
    console.log('Solicitud POST a /api/productos') // Registro de depuración

    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body

        // Validar que todos los campos obligatorios estén presentes
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' })
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
            thumbnails: thumbnails || "", // Si no se proporciona "thumbnails", se establece una cadena vacía.
        }

        const productCreated = await productModel.create(newProduct)
        res.json({status: "Success", data: productCreated})

        socketServer.emit('productos-actualizados', await productModel.find())

    } catch (error) {
        console.error(error.message)
        res.json({status: "Error", message: "No se pudo crear el producto"})
    }
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params // Obtener el ID del producto de los parámetros de la URL
    console.log(`Solicitud PUT a /api/productos/${pid}`)

    try {
        const productReplace = req.body

        const productUpdated = await productModel.updateOne({ _id: pid }, productReplace)
        res.json({status: "Success", data: productUpdated})
    } catch (error) {
        console.error(error.message)
        res.json({status: "Error", message: "No se pudo actualizar el producto"})
    }
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params // Obtén el ID del producto de los parámetros de la URL
    console.log(`Solicitud DELETE a /api/productos/${pid}`)

    try {
        const productDelete = await productModel.deleteOne({ _id: pid })
        res.json({status: "Success", data: productDelete})

        socketServer.emit('productos-actualizados', await productModel.find())
    } catch (error) {
        console.error(error.message)
        res.json({status: "Error", message: "No se pudo eliminar el producto"})
    }
})

export default router