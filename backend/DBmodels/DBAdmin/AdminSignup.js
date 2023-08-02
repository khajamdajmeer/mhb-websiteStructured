const mongoose  = require("mongoose")
const {Schema}  = require("mongoose");

const AdminSignup = new Schema({
    name:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true
    },
    OTP:{
        type:String,
        require:true,

    },
    verification:{
        type:Boolean,
        default:false
    },
    CreatedDate:{
        type:Date,
        default:Date.now
    }
    
});
module.exports = mongoose.model("admincredentials",AdminSignup);