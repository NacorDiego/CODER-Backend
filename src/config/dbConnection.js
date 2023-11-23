import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config() // Cargo variables de entorno desde .env

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI

        if (!mongoURI) {
            throw new Error('La variable de entorno MONGO_URI no está configurada.')
        }

        await mongoose.connect(mongoURI)
        console.log('Base de datos conectada con éxito.');
    } catch (error) {
        console.error(`Error al conectar la base de datos: ${error.message}`)
    }
}