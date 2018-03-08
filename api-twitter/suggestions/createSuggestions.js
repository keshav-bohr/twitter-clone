const mongoose = require('mongoose');
const suggestionModel = require('./suggestionModel');
const followModel = require('../follow/followModel');
const user = require('../user/userModel');



function createSuggestionsForCurrentUser(followedUsername, currentUsername){
    followModel.findOne({username : followedUsername})
    .then(followRecord => {
        if(followRecord){
            followRecord.following.forEach(eachFollowing => {
                return suggestionModel.findOne({username : currentUsername, suggestionUsername : eachFollowing})
                .then(suggestionRecord => {
                    if(suggestionRecord){
                        return suggestionRecord.update({$inc : {counter : 1}})
                    }
                    else{
                        return user.findOne({username : eachFollowing})
                        .then(user => {
                            const newSuggestion = new suggestionModel({
                                suggestionName : user.name,
                                username : currentUsername,
                                suggestionUsername : eachFollowing,
                                counter : 1
                            })
                            return newSuggestion.save();
                        })
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
            return suggestionModel.findOne({username : eachFollower, suggestionUsername : followedUsername})
            .then(suggestionRecord => {
                if(suggestionRecord){
                    return suggestionRecord.update({$inc : {counter : 1}})
                }
                else{
                    return user.findOne({username : followedUsername})
                    .then(user => {
                        const newSuggestion = new suggestionModel({
                            suggestionName : user.name,
                            username : eachFollower,
                            suggestionUsername : followedUsername,
                            counter : 1
                        })
                        return newSuggestion.save()
                    })
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