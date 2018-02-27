const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
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

    ,email: {
        type : String,
        unique : true,
        sparse : true,
        validate : {
            validator : (value) => {
                return validator.isEmail(value)
            }
            ,message : `provide a valid email`
        }
    }

    ,DOB : {
        type : Date
    }

    ,createdAt : {
        type : Date,
        default : Date.now()
    }
    
    ,tokens: [String]
})




module.exports = exports = userSchema;