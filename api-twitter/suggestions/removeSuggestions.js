const mongoose = require('mongoose');
const followModel = require('../follow/followModel');
const suggestionModel = require('./suggestionModel');



function removeSuggestionsForCurrentUser(unfollowedUsername, currentUsername){
    followModel.findOne({username : unfollowedUsername})
    .then(followRecord => {
        if(followRecord){
            followRecord.following.forEach(eachFollowing => {
                return suggestionModel.findOne({username : currentUsername, suggestionUsername : eachFollowing})
                .then(suggestionRecord => {
                    if(suggestionRecord && suggestionRecord.counter>1){
                        return suggestionRecord.update({$inc : {counter : -1}})
                    }
                    else{
                        if(suggestionRecord && suggestionRecord.counter ===1){
                            return suggestionRecord.remove();
                        }
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



function removeSuggestionsForFollowersOfCurrentUser(unfollowedUsername, currentUsername){
    followModel.findOne({username : currentUsername})
    .then(followRecord => {
        followRecord.followers.forEach(eachFollower => {
            return suggestionModel.findOne({username : eachFollower, suggestionUsername : unfollowedUsername})
            .then(suggestionRecord => {
                if(suggestionRecord && suggestionRecord.counter > 1){
                    return suggestionRecord.update({$inc : {counter : -1}})
                }
                else{
                    if(suggestionRecord && suggestionRecord.counter === 1){
                        return suggestionRecord.remove()
                    }
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



function removeSuggestions(unfollowedUsername, currentUsername){
    removeSuggestionsForCurrentUser(unfollowedUsername, currentUsername);
    removeSuggestionsForFollowersOfCurrentUser(unfollowedUsername, currentUsername);
}




module.exports = exports = removeSuggestions;