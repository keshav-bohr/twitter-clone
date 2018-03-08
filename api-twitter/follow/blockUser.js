const mongoose = require('mongoose');
const followModel = require('./followModel');
const removeSuggestions = require('../suggestions/removeSuggestions')
const router = require('express').Router();



function blockUserHandler(req, res, next){
    followModel.findOne({username : req.currentUser.username, following : req.body.username})
    .then(followRecord => {
        if(followRecord){
            return followRecord.update({$pull: {following : req.body.username, followers : req.body.username} }, {multi : true})
            .then(followRecord => {
                return followModel.findOne({username : req.body.username, followers : req.currentUser.username})
            })
            .then(followRecord => {
                return followRecord.update({$pull : {followers : req.currentUser.username, following : req.currentUser.username}}, {multi : true})
            })
        }
        else{
            return followRecord
        }
    })
    .then(followRecord => {
        return followModel.findOne({username : req.currentUser.username})
    })
    .then(followRecord => {
        return followRecord.update({$push : {blocked : req.body.username}})
    })
    .then(followRecord => {
        removeSuggestions(req.body.username, req.currentUser.username)
        res.json({
            success: true
        })
    })
    .catch(error => {
        next(error)
    })
}






router.post('/block', blockUserHandler);


module.exports = exports = router;

