const router = require('express').Router();
const mongoose = require('mongoose');
const followModel = require('../follow/followModel');
const tweetModel = require('./tweetModel');




function timelineTweetsHandler(req, res, next){
    followModel.findOne({"username" : req.currentUser.username})
    .then(followRecord => {
        var tweetsOfFollowing = [];
        if(followRecord){
            tweetModel.find({username : { $in : followRecord.following}})
            .then(requiredTweets => {
                if(requiredTweets){
                    tweetsOfFollowing.push(...requiredTweets);
                    tweetsOfFollowing.sort(function(a, b){return b.createdAt - a.createdAt})
                    res.json({
                        tweets : tweetsOfFollowing
                    })
                }
                else{
                    res.json({
                        tweets : ["no tweets found"]
                    })
                }
            })
        }
        else{
            res.json({
                tweets : ["you have no followings"]
            })
        }
    })
    .catch(error => {
        console.error(error);
    })
}



router.get('/timeline', timelineTweetsHandler);

module.exports = exports = router;