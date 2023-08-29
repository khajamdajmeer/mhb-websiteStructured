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
    Note:{
        type:String,
        default:null
    },
    CallDate:{
        type:Date,
        require: true,
        default:() => {
            const now = new Date();
            const istDate = utcToZonedTime(now, istTimezone);
            return istDate;
          }

    }

})

module.exports = mongoose.model("Inquery_DB", InqueryDB);
