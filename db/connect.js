const mongoose  = require('mongoose')
require('dotenv').config({ path: "../config.env" });

//database connection
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true});
        console.log('Successfully connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB ;