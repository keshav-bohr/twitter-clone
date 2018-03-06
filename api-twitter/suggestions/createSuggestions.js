const mongoose = require('mongoose');
const suggestionModel = require('./suggestionModel');
const followModel = require('../follow/followModel')



function createSuggestionsForCurrentUser(followedUsername, currentUsername){
    followModel.findOne({username : followedUsername})
    .then(followRecord => {
        if(followRecord){
            followRecord.following.forEach(eachFollowing => {
                return suggestionModel.findOne({username : currentUsername, suggestion : eachFollowing})
                .then(suggestionRecord => {
                    if(suggestionRecord){
                        return suggestionRecord.update({$inc : {counter : 1}})
                    }
                    else{
                        const newSuggestion = new suggestionModel({
                            username : currentUsername,
                            suggestion : eachFollowing,
                            counter : 1
                        })
                        return newSuggestion.save();
                    }
                })
                .then(suggestionRecord => {
                    success : true
                })
            })
        }
    })
    .catch(error => {
        next(error)
    })
}


function createSuggestionsForFollowersOfCurrentUser(followedUsername, currentUsername){
    followModel.findOne({username : currentUsername})
    .then(followRecord => {
        followRecord.followers.forEach(eachFollower => {
            return suggestionModel.findOne({username : eachFollower, suggestion : followedUsername})
            .then(suggestionRecord => {
                if(suggestionRecord){
                    return suggestionRecord.update({$inc : {counter : 1}})
                }
                else{
                    const newSuggestion = new suggestionModel({
                        username : eachFollower,
                        suggestion : followedUsername,
                        counter : 1
                    })
                    return newSuggestion.save()
                }
            })
            .then(suggestionRecord => {
                success : true
            })
        })
    })
    .catch(error => {
        next(error)
    })
}



function createSuggestions(followedUsername, currentUsername){
    createSuggestionsForCurrentUser(followedUsername, currentUsername);
    createSuggestionsForFollowersOfCurrentUser(followedUsername, currentUsername);
}


module.exports = exports = createSuggestions