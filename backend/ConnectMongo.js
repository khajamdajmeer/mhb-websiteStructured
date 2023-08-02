

const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.REACT_MONGODB_URI

const connecttoMongo = async()=>{
    const connet = await mongoose.connect(mongoURI)
    if(connet){
        console.log('Mongo connect succes');
    }
    else{
        console.log('Mongo connect failed');

    }
}

module.exports = connecttoMongo;