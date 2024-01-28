const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://makamsujith2004:Modda1234@cluster0.dsjergb.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async () =>{
    await mongoose.connect(mongoURI);
    console.log("Connection established");
}

module.exports = connectToMongo;

