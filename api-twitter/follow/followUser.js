const mongoose = require('mongoose');
const router  = require('express').Router();
const followModel = require('./followModel');
const user = require('../user/userModel')


function followUserHandler(req, res, next){
    let followId;
    user.findOne({username: req.body.username})
    .then(user => {
        followId = user.id;
        return followModel.findOne({user : req.currentUser.id})
    })
    .then(followRecord => {
        if(followRecord){
            return followRecord.update({$push : {"following" : followId}});
        }
        else{
            var newFollow = new followModel({
                user: req.currentUser.id,
                following : followId
            })
            return newFollow.save();
        }
    })
    .then(followRecord => {
        return followModel.findOne({user : followId})
    })
    .then(followRecord => {
        if(followRecord){
            return followRecord.update({$push : {"followers" : req.currentUser.id}});
        }
        else{
            var newFollow = new followModel({
                user: followId,
                followers : req.currentUser.id
            })
            return newFollow.save()
        }
    })
    .then(followRecord => {
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
