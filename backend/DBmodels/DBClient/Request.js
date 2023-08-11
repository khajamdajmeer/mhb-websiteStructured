
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const CustomerRequest = new Schema({
    name:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    mobilenumberString:{
        type:String
    
    },
    Location:{
        type:String,
        require:false
    },
    Address:{
        type:String,
        require:true
    },
    ServiceType:{
        type:String,
        require:false
    }
    ,
    ServiceDate:{
        type:String,
        require:true
    },
    ServiceTime:{
        type:String,
        require:true
    }
    ,
    Requestdate:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('CustomerRequest',CustomerRequest);
