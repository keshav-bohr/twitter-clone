const mongoose = require('mongoose');
const user = require('./userModel');
const tweetModel = require('../tweets/tweetModel');
const followModel = require('../follow/followModel');
const router = require('express').Router();


function userProfileHandler(req, res, next){
    var profileData = {
        userDetails : {},
        tweets : [],
        followDetails : {
            following : [],
            follower : [],
            blocked : []
        },
        same : false,
        isFollowing : false,
        isBlocked : false
    }

    user.findOne({username : req.body.username})
    .then(user => {
        profileData.userDetails.name = user.name;
        profileData.userDetails.username = user.username;
        return followModel.findOne({username : req.currentUser.username, blocked: user.username})
    })
    .then(followRecord => {
        if(followRecord){
            profileData.isBlocked = true
        }
        return followModel.findOne({username : req.currentUser.username, following: req.body.username})
    })
    .then(followRecord => {
        if(followRecord || req.body.username === req.currentUser.username){
            profileData.isFollowing = true
            return tweetModel.find({username: req.body.username})
        }
        else{
            return tweetModel.find({username : req.body.username, public : true})
        }
    })
    .then(tweets => {
        if(!profileData.isBlocked){
            profileData.tweets = tweets;
            profileData.tweets.sort(function(a, b){return b.createdAt - a.createdAt})
        }
        return followModel.findOne({username: req.body.username})
    })
    .then(followRecord => {
        if(followRecord){
            profileData.followDetails.following = followRecord.following;
            profileData.followDetails.follower = followRecord.followers;
            profileData.followDetails.blocked = followRecord.blocked
        }
        if(req.body.username === req.currentUser.username){
            profileData.same = true
        }
        res.json({
            profileData
        })
    })
    .catch(error => {
        next(error)
    })
    
}





router.post('/profile', userProfileHandler);


module.exports = exports = router