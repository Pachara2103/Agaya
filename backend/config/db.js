const mongoose = require('mongoose')

const connectDB = async()=> {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log('connect to mongoDB successfully')
}

module.exports = connectDB ;