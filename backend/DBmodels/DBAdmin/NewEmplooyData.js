const mongoose  = require("mongoose");
const {Schema}  = require("mongoose");


const Emplooy_Schema = new Schema({

    name:{
        type:String,
        require:true
    },
    age:
      {  type:Number,
        require:true}
    ,
    mobilenumber:{
        type:Number,
        require:true,
        unique:true

    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    joiningdate:{
        type:String,
        require:true
    },
    // photo:{
    //     type:Buffer,
    //     require:true
    // },
    AdharNumber:{
        type:Number,
        require:true,
        unique:true
    },
    // AdharScan:{
    //     type:Buffer,
    //     require:true
    // },
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
        default:null
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

module.exports = mongoose.model('Managers',Emplooy_Schema);