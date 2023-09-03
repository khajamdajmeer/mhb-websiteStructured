const mongoose = require('mongoose')
const {Schema}=require('mongoose')

const { format, utcToZonedTime } = require('date-fns-tz');

const istTimezone = 'Asia/Kolkata';

const Terminate = new Schema({
    name:{
        type:String
    },
    mobilenumber:{
        type:Number
    },
    email:{
        type:String
    },
    joiningdate:{
        type:String
    },
    presentAdress:{
        type:String
    },  permanentAdress:{
        type:String
    },
    TerminationDate:{
        type:Date,
        default:()=>{
            const now = new Date();
            const istDate = utcToZonedTime(now, istTimezone);
            return istDate;
        }
    }
})



module.exports=mongoose.model('terminated',Terminate)