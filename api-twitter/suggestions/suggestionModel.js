const mongoose = require('mongoose');

suggestionSchema = new mongoose.Schema({
    username : {
        type: String
    }
    ,suggestion : {
        type : String
    }
    ,counter : {
        type : Number
    }
})



const suggestionModel = mongoose.model('suggestions', suggestionSchema);

module.exports = exports = suggestionModel