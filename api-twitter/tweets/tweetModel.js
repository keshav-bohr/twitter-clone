const mongoose = require('mongoose');
const user = require('../user/userModel')

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
    ,public: {
        type: Boolean,
        default: true
    }
    ,user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
    ,createdAt: {
        type: Date,
        default: Date.now
    }
})

const tweetModel = mongoose.model('tweets',tweetSchema);
module.exports = exports = tweetModel;