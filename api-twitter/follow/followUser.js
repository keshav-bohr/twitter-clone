const mongoose = require('mongoose');
const router  = require('express').Router();
const followModel = require('./followModel');
const user = require('../user/userModel')
const createSuggestion = require('../suggestions/createSuggestions')


function followUserHandler(req, res, next){
    followModel.findOne({username : req.currentUser.username})
    .then(followRecord => {
        if(followRecord){
            return followRecord.update({$push : {"following" : req.body.username}});
        }
        else{
            var newFollow = new followModel({
                username: req.currentUser.username,
                following : req.body.username
            })
            return newFollow.save();
        }
    })
    .then(followRecord => {
        return followModel.findOne({username : req.body.username})
    })
    .then(followRecord => {
        if(followRecord){
            return followRecord.update({$push : {"followers" : req.currentUser.username}});
        }
        else{
            var newFollow = new followModel({
                username: req.body.username,
                followers : req.currentUser.username
            })
            return newFollow.save()
        }
    })
    .then(followRecord => {
        createSuggestion(req.body.username, req.currentUser.username)
        res.json({
            success: true
        })
    })
    .catch(error => {
        next(error)
    })
}




router.post('/followUser', followUserHandler);

module.exports = exports = router;
