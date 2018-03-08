const mongoose = require('mongoose');
const tweet = require('./tweetModel');
const router = require('express').Router();

const deleteHashtags = require('../trendingTags/deleteHashtags')

function deleteTweetHandler(req, res, next){
    tweet.find({
        "user": req.currentUser.id
    })
    .then(tweets => {
        let tweet = tweets[req.body.index]
        if(tweet){
            if(tweet.public){
                deleteHashtags(tweet.content, tweet.id)
            }
            tweet.remove()
            res.json({
                success : true
            })
        }
        else{
            res.json({
                message: "tweet not found"
            })
        }
    })
    .catch(error => {
        next(error)
    })
}



router.post('/delete', deleteTweetHandler);

module.exports = exports = router;