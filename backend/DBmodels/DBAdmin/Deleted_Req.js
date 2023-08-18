
const mongoose = require('mongoose')
const {Schema}= require('mongoose')

const date = new Date();
const dateslice = date.toISOString().slice(0, 10);

const DeletedReq  = new Schema({
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
    },
    Deleted:{
       Date:{
        type:String,
        default:dateslice
       },
       reason:{
        type:String,
        require:true
       }
    }

})

module.exports = mongoose.model("DeletedReq_DB", DeletedReq);
