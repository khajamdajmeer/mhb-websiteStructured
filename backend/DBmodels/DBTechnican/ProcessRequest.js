const mongoose = require('mongoose')
const { Schema } = require('mongoose');


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
            require: true
        },
        Date: {
            type: String,
            require: true
        },
        Time: {
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
            require: true
        }
    },
    Accepted:{
        type:Boolean,
        require:true,
        default:false
    }

})

module.exports = mongoose.model("Tech_Process_DB", TechAccessSchema);
