const mongoose = require('mongoose');
const user = require('../user/userModel')

const followSchema = new mongoose.Schema({
    username : {
        type: String
    }
    ,followers: [{
        type: String
    }]
    ,following: [{
        type: String
    }]
    ,blocked: [{
        type: String
    }]
})


const followModel = mongoose.model('follow', followSchema);

module.exports = exports = followModel;