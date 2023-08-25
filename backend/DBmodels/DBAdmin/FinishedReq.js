
const mongoose = require('mongoose')
const {Schema}= require('mongoose')
const { format, utcToZonedTime } = require('date-fns-tz');

const istTimezone = 'Asia/Kolkata';



  


const Finishedreq  = new Schema({
    cid:{
            type: mongoose.Schema.Types.ObjectId,
            
    },
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
            require: false
        },
        Date: {
            type: String,
            require: true
        },
        Delivery: {
            type:Date,
            require: true,
            default:() => {
                const now = new Date();
                const istDate = utcToZonedTime(now, istTimezone);
                return istDate;
              }
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
            require: true
        }
    },
    Requestdate: {
        type: String,
        require: true
    },
    forworded: {
        name: {
            type: String,
            require: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            requrie: true
        }
    },
    Discription:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model("Online_Service", Finishedreq);
