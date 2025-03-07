// const mongoose = require('mongoose');
// //const mongoURI = "mongodb+srv://makamsujith2004:Modda1234@cluster0.aq2ah3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// // const mongoURI = "mongodb+srv://SujithMakam:Sujith$21@cloudnotebook.2ke1j.mongodb.net/"
// const mongoURI = "mongodb+srv://makamsujith2004:sujithm21@cluster0.7gsyv.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"
// const connectToMongo = async () =>{
//     await mongoose.connect(mongoURI);
//     console.log("Connection established");
// }

// module.exports = connectToMongo;

require("dotenv").config()
const mongoose = require("mongoose")

const mongoURI = process.env.MONGO_URI

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connection established")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        process.exit(1)
    }
}

module.exports = connectToMongo
