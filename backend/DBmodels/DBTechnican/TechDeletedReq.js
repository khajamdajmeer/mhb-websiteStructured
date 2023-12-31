
const mongoose = require('mongoose')
const {schema} = require('mongoose')
const { format, utcToZonedTime } = require('date-fns-tz');

const istTimezone = 'Asia/Kolkata';


const DeletedTechReq = new schema({
    name:{
        type:String,
        require:true

    },
    mobileNumber:{
        type:Number,
        require:true
    },
    mobilenumberString:{
        type:String,
        
    },
    Address:{
        type:String,
        require:true
    },
    ServieType:{
        type:String
    },
    ServiceDate:{
        type:String
    },
    DeletedDate:{
        type:Date,
        default:() => {
            const now = new Date();
            const istDate = utcToZonedTime(now, istTimezone);
            return istDate;
          }
    },
    ForwordedBy:{
        name:{
            type:String,
            require:true
        },
        id:{
            type:mongoose.Schema.Types.ObjectId,
            require:true
        }
    },
    DeleteBy:{
        name:{
            type:String,
            require:true
        },
        ID:{
            type:mongoose.Schema.Types.ObjectId,
            require:true
        }
    },
    Technician:{
        name:{
            type:String,
            require:true
        },
        ID:{
        type:mongoose.Schema.Types.ObjectId,
        require:true

        }
    },
    Reason:{
        type:String,
        require:true
    }

})


module.exports = mongoose.model("Deleted_Requests", TechAccessSchema);
