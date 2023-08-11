const mongoose = require('mongoose')
const {Schema} = require('mongoose');

const TechAccessSchema = new Schema({
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
    },
    ServiceDate:{
        type:String,
        require:true
    },
    ServiceTime:{
        type:String,
        require:true
    },
    ServiceProvided:{
        type:String,
        require:true
    },
    Requestdate:{
        type:Date,
        require:true
    },
    ForwordedBy:{
        type:String,
        require:true
    },
    Forwordid:{
        type:mongoose.Schema.Types.ObjectId, 
        
    }
})

module.exports = mongoose.model("UnderTechProcess",TechAccessSchema);
