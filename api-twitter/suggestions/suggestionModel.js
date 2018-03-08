const mongoose = require('mongoose');

suggestionSchema = new mongoose.Schema({
    suggestionName : {
        type: String
    }
    ,username : {
        type: String
    }
    ,suggestionUsername : {
        type : String
    }
    ,counter : {
        type : Number
    }
})



const suggestionModel = mongoose.model('suggestions', suggestionSchema);

module.exports = exports = suggestionModel