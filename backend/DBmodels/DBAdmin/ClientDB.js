
const mongoose = require('mongoose')
const {Schema}= require('mongoose')
const { format, utcToZonedTime } = require('date-fns-tz');

const istTimezone = 'Asia/Kolkata';


const Clinent  = new Schema({
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
    CreatedDate:{
        type:Date,
        default:() => {
            const now = new Date();
            const istDate = utcToZonedTime(now, istTimezone);
            return istDate;
          }
    }
})

module.exports = mongoose.model("clients", Clinent);
