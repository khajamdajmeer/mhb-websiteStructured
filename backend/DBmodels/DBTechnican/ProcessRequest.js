const mongoose = require('mongoose')
const { Schema } = require('mongoose');
const { format, utcToZonedTime } = require('date-fns-tz');

        const istTimezone = 'Asia/Kolkata';


const TechAccessSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: Number,
        require: true
    },
    mobilenumberString: {
        type: String

    },
    Location: {
        type: String,
        require: false
    },
    Address: {
        type: String,
        require: true
    },
    Service: {
        type: {
            type: String,
            require: true,
            default:''
        },
        Date: {
            type: String,
            require: true,
            default:''
        },
        Time: {
            type: String,
            require: true,
            default:''
        }
    }
    ,
    Technicain: {
        name: {
            type: String,
            require: true,
            default:null
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            default:null
        }
    },
    Requestdate: {
        type: String,
        require: true,
        default:() => {
            const now = new Date();
            const istDate = utcToZonedTime(now, istTimezone);
            return istDate;
          }
    },
    forworded: {
        name: {
            type: String,
            require: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }
    },
    Accepted:{
        type:Boolean,
        require:true,
        default:false
    },
    Complain:{
        type:Boolean,
        default:false
    },
    Note:{
        type:String,
        default:null
    }

})

module.exports = mongoose.model("Tech_Process_DB", TechAccessSchema);
