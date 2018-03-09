const mongoose = require('mongoose');
const tweetModel = require('../tweets/tweetModel');
const trendModel = require('./trendModel');
const followModel = require('../follow/followModel')
const router = require('express').Router();


function singleTrendHandler(req, res, next){
    let singleTrendTweets = []
    let blockedTweets = []
    // let usersBlockedByCurrent = []
    followModel.find({blocked : req.currentUser.username})
    .then(followRecords => {
        followRecords.forEach(eachRecord => {
            blockedTweets = eachRecord.username
        })
        return followModel.findOne({username : req.currentUser.username})
    })
    .then(followRecord => {
        blockedTweets = blockedTweets.concat(followRecord.blocked)
        return trendModel.findOne({hashtag : req.body.hashtag})
    })
    .then(trendRecord => {
        return tweetModel.find({_id : {$in : trendRecord.tweetId}, username :{$nin : blockedTweets}})
        .then(tweets => {
            tweets.forEach(singleTweet => {
                singleTrendTweets.push({
                    content : singleTweet.content,
                    username : singleTweet.username
                })
            })
            return new Promise((resolve, reject) => {
                if(singleTrendTweets.length === tweets.length){
                    resolve()
                }
            })
        })
        .then(() => {
            res.json({
                singleTrendTweets : singleTrendTweets
            })
        })
    })
    .catch(error => {
        next(error)
    })
}



router.post('/singleTrend', singleTrendHandler)


module.exports = exports = router;

