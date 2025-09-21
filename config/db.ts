import mongoose from "mongoose"

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("MongoDb connected cuccsessfully")
        })
        connection.on("error", (error) => {
            console.log("MongoDB connection error: ", error)
        })
    } catch (error) {
        console.log(error)
        console.log("MongoDB connection failed!")
    }
}
