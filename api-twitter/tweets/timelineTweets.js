const router = require('express').Router();
const mongoose = require('mongoose');
const followModel = require('../follow/followModel');
const tweetModel = require('./tweetModel');




function timelineTweetsHandler(req, res, next){
    followModel.findOne({"user" : req.currentUser.id})
    .then(followRecord => {
        var tweetsOfFollowing = [];
        tweetModel.find({user : { $in : followRecord.following}})
        .then(requiredTweets => {
            if(requiredTweets){
                tweetsOfFollowing.push(...requiredTweets);
                tweetsOfFollowing.sort(function(a, b){return a.createdAt - b.createdAt})
                res.json({
                    tweets : tweetsOfFollowing
                })
            }
            else{
                res.json({
                    tweets : "no tweets found"
                })
            }
        })
    })
    .catch(error => {
        console.error(error);
    })
}



router.get('/timeline', timelineTweetsHandler);

module.exports = exports = router;