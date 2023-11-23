import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:NJQKAf2FYdKZeOCF@cluster0.dlqeszu.mongodb.net/ecommerce?retryWrites=true&w=majority")
        console.log('Base de datos conectada con éxito.');
    } catch (error) {
        console.error(`Error al conectar la base de datos: ${error.message}`)
    }
}