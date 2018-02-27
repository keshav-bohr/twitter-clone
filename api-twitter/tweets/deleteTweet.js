const mongoose = require('mongoose');
const tweet = require('./tweetModel');
const router = require('express').Router();

const deleteHashtags = require('../trendingTags/deleteHashtags')

function deleteTweetHandler(req, res, next){
    tweet.findOne({
        "_id": req.body.id,
        "user": req.currentUser.id
    })
    .then(tweet => {
        if(tweet.public){
            deleteHashtags(tweet.content, tweet.id)
        }
        tweet.remove()
        res.json({
            success : true
        })
    })
    .catch(error => {
        next(error)
    })
}



router.post('/delete', deleteTweetHandler);

module.exports = exports = router;