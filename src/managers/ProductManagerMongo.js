import productModel from '../models/products.model.js'

class ProductManagerMongo {
    async loadProducts() {
        try {
            this.products = await productModel.find()
        } catch (error) {
            this.products = []
        }
    }

    async addProduct(product) {
        try {
            const newProduct = new productModel(product)
            await newProduct.save()
            this.products.push(newProduct)
        } catch (error) {
            console.error(`Error al agregar producto: ${error}`)
        }
    }

    async getProducts() {
        try {
            const products = await productModel.find()
            console.log(`Products en getProducts(): ${products}`)
            return products
        } catch (error) {
            console.error(`Error al obtener productos: ${error}`)
            return []
        }
    }

    async getProductById(id) {
        try {
            return await productModel.findById(id)
        } catch (error) {
            console.error(`Error al obtener producto con ID = ${id}: ${error}`)
            return null
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            await productModel.findByIdAndUpdate(id, updatedProduct)
        } catch (error) {
            console.error(`Erorr al actualizar producto: ${error}`)
        }
    }

    async deleteProduct(id) {
        try {
            await productModel.findByIdAndDelete(id)
            this.products = this.products.filter(product => product._id.toString() !== id)
        } catch (error) {
            console.error(`Erorr al eliminar producto: ${error}`)
        }
    }
}

export default ProductManagerMongo