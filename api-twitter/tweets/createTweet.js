const mongoose = require('mongoose');
const tweet = require('./tweetModel');
const router = require('express').Router();

const addHashtags = require('../trendingTags/createHashtags')


function createTweetHandler(req, res, next){
    var newTweet = new tweet({
        content: req.body.content,
        public: req.body.public,
        user: req.currentUser.id,
        username : req.currentUser.username
    })

    newTweet.save()
    .then(tweet => {
        if(tweet.public){
            addHashtags(tweet.content, tweet.id)
        }
        res.json({
            success: true,
            result: tweet
        })
    })
    .catch(error => {
        next(error)
    })
}





router.post('/create', createTweetHandler);

module.exports = exports = router