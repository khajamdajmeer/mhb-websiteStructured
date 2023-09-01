const mongoose = require('mongoose')
const {Schema}= require('mongoose')
const { format, utcToZonedTime,zonedTimeToUtc } = require('date-fns-tz');

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
        require:true,
        default:'none'
    },
    Address:{
        type:String
    },
    Date:{
        type:Date,
        default: Date.now()

        // () => {
        //     const now = new Date();
        //     const istDate = utcToZonedTime(now, istTimezone);
        //     const utcIstDate = zonedTimeToUtc(istDate, istTimezone);
        //     return utcIstDate;
        //   }
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