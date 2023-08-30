const mongoose = require('mongoose')
const {Schema}= require('mongoose')
const { format, utcToZonedTime } = require('date-fns-tz');

const istTimezone = 'Asia/Kolkata';


const date = new Date();
const dateslice = date.toISOString().slice(0, 10);


const Tasks = new Schema({

    name:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    mobileNumberString:{
        type:String,
        
    },
    Task:{
        type:String,
        require:true
    },
    Address:{
        type:String
    },
    Date:{
        type:Date,
        default: () => {
            const now = new Date();
            const istDate = utcToZonedTime(now, istTimezone);
            return istDate;
          }
    },
    finished:{
       note:{
        type:String,
        default:null
       },
       yes:{
        type:Boolean,
        default:false

       }
    },
    Manager:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            require:true
        },
        name:{
            type:String,
            require:true
        }
    }




})

module.exports = mongoose.model('Manager_Tasks',Tasks)