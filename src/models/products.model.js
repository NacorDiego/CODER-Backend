import mongoose from "mongoose";

const productsCollection = "products" // Nombre de la colección.

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required:true
    },
    code: {
        type:String,
        required:true
    },
    price: {
        type: Number,
        get: (value) => {
            // Formatear el número como decimal, puedes personalizar esto según tus necesidades
            return parseFloat(value).toFixed(2);
        },
        required:true
    },
    status: Boolean,
    stock: {
        type:Number,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    thumbnails: String
})

const productModel = mongoose.model(productsCollection,productSchema)

export default productModel