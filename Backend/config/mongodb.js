import mongoose from 'mongoose'

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log('MongoDB connected')
    })
    await mongoose.connect(process.env.MongoDB_URI.replace('/?', '/ecommerce?'))
}
export default connectDB;