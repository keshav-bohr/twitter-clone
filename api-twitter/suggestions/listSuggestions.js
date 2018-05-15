const mongoose = require('mongoose');
const suggestionModel = require('./suggestionModel');
const user = require('../user/userModel')
const followModel = require('../follow/followModel')
const router = require('express').Router();



function listSuggestionHandler(req, res, next){
    let suggestions = [];
    blockedAndFollowingUsers = []
    followModel.findOne({username : req.currentUser.username})
    .then(followRecord => {
        if(followRecord){
            blockedAndFollowingUsers = followRecord.following;
            blockedAndFollowingUsers = blockedAndFollowingUsers.concat(followRecord.blocked)
            return suggestionModel.find({username: req.currentUser.username, suggestionUsername : {$nin : blockedAndFollowingUsers}})
        }
    })
    .then(suggestionRecords => {
        if(suggestionRecords){
            suggestionRecords.forEach((eachSuggestion, index) => {
                suggestions.push({
                    suggestion : eachSuggestion.suggestionUsername,
                    counter : eachSuggestion.counter,
                    name : eachSuggestion.suggestionName
                })
            })
        }
        res.json({
            suggestions : suggestions
        })
    })
    .catch(error => {
        next(error)
    })
}






router.get('/suggestions', listSuggestionHandler);


module.exports = exports = router