const mongoose = require('mongoose');
const tweetModel = require('../tweets/tweetModel');
const trendModel = require('./trendModel');
const followModel = require('../follow/followModel')
const router = require('express').Router();


function singleTrendHandler(req, res, next){
    let singleTrendTweets = []
    let usersWhoBlockedCurrent = []
    followModel.find({blocked : req.currentUser.username})
    .then(followRecords => {
        usersWhoBlockedCurrent = followRecords
        return trendModel.findOne({hashtag : req.body.hashtag})
    })
    .then(trendRecord => {
        return tweetModel.find({_id : {$in : trendRecord.tweetId}, username :{$nin : usersWhoBlockedCurrent.username}})
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

