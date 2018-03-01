const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    }
    ,username: {
        type : String,
        required : true,
        trim : true,
        unique : true
    }

    ,password: {
        type : String,
        required : true,
        minlength : 6
    }

    ,createdAt : {
        type : Date,
        default : Date.now()
    }
    
    ,tokens: [String]
})




module.exports = exports = userSchema;