const mongoose  = require("mongoose");
const {Schema}  = require("mongoose");


const Emplooy_Schema = new Schema({

    name:{
        type:String,
        require:true
    },
    age:
      {  type:Number,
        require:true
    }
    ,
    mobilenumber:{
        type:Number,
        require:true,
        // unique:true

    },
    mobilenumberString:{
        type:String
    },
    email:{
        type:String,
        require:true,
        // unique:true

    },
    joiningdate:{
        type:String,
        require:true
    },
  
    AdharNumber:{
        type:Number,
        require:true,
        // unique:true
    },
  
    presentAdress:{
        type:String,
        require:true
    }
    ,
    permanentAdress:{
        type:String,
        require:true
    },
    designation:{
        type:String,
        require:true
    },
    username:{
        type:String,require:true,
    },
    password:{
        type:String,
        require:true,
        default:null
    },
    verification:{
        type:Boolean,
        default:false
    },
     OTP:{
        type:Number,
        default:null
    }




});

module.exports = mongoose.model('Emplooys_DB',Emplooy_Schema);