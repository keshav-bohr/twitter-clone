const mongoose = require('mongoose');
const user = require('../user/userModel')

const followSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
    ,followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
    ,following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
    ,blocked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
})


const followModel = mongoose.model('follow', followSchema);

module.exports = exports = followModel;