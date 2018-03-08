const mongoose = require('mongoose');
const suggestionModel = require('./suggestionModel');
const user = require('../user/userModel')
const followModel = require('../follow/followModel')
const router = require('express').Router();



function listSuggestionHandler(req, res, next){
    let suggestions = [];
    // let singleSuggestion = {}
    followModel.findOne({username : req.currentUser.username})
    .then(followRecord => {
        return suggestionModel.find({username: req.currentUser.username, suggestionUsername : {$nin : followRecord.following, $nin : followRecord.blocked}})
    })
    .then(suggestionRecords => {
        suggestionRecords.forEach((eachSuggestion, index) => {
            // singleSuggestion.suggestion = eachSuggestion.suggestion;
            // singleSuggestion.counter = eachSuggestion.counter;
            // singleSuggestion.name = eachSuggestion.name;
            suggestions.push({
                suggestion : eachSuggestion.suggestionUsername,
                counter : eachSuggestion.counter,
                name : eachSuggestion.suggestionName
            })
        })
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