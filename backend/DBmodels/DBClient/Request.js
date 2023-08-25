
const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const { format, utcToZonedTime } = require('date-fns-tz');

const istTimezone = 'Asia/Kolkata';


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
        default:() => {
            const now = new Date();
            const istDate = utcToZonedTime(now, istTimezone);
            return istDate;
          }
    },
    Note:{
        type:String,
        default:null
    }
    
})

module.exports = mongoose.model('Request_DB',CustomerRequest);
