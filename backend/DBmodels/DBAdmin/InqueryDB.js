const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const { format, utcToZonedTime } = require('date-fns-tz');

const istTimezone = 'Asia/Kolkata';



const InqueryDB = new Schema({
    name:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        requier:true
    },
    mobileNumberString:{
        type:String,default:null
    },
    Location:{
        type:String,
        default:null
    },Address:{
        type:String,
        default:null
    },
    Note:[{
        type:String,
        default:null
    }],
    Manager:[{
        id:{type:mongoose.Schema.Types.ObjectId},
            name:{
                type:String
            }
    }],
    CallDate:[{
        type:Date,
       
         }],
         LastCallDate:{
            type:Date
         }

})

module.exports = mongoose.model("Inquery_DB", InqueryDB);
