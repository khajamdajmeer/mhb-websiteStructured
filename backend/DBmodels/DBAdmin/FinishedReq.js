
const mongoose = require('mongoose')
const {Schema}= require('mongoose')


function formatDateToIST(date) {
    const utcDate = new Date(date);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30 in milliseconds
  
    const istDate = new Date(utcDate.getTime() + istOffset);
    
    const year = istDate.getFullYear();
    const month = (istDate.getMonth() + 1).toString().padStart(2, '0');
    const day = istDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  
  const date = new Date(); // Current date in local time
  const istFormattedDate = formatDateToIST(date);

const Finishedreq  = new Schema({
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
            default:istFormattedDate
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

module.exports = mongoose.model("Online_clients", Finishedreq);
