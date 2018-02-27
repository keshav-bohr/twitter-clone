const mongoose = require('mongoose');
const tweet = require('../tweets/tweetModel')

const trendSchema = new mongoose.Schema({
    hashtag: {
        type: String,
        required: true
    }
    ,counter: {
        type: Number,
        required: true
    }
    ,tweetId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweet',
    }]
})


const trendModel = mongoose.model('trendings',trendSchema);

module.exports = exports = trendModel