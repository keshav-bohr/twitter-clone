const mongoose = require('mongoose');
const followModel = require('./followModel');
const router = require('express').Router();



function blockUserHandler(req, res, next){
    followModel.findOne({username : req.currentUser.username, following : req.body.username})
    .then(followRecord => {
        if(followRecord){
            return followRecord.update({$pull: {following : req.body.username} })
            .then(followRecord => {
                return followModel.findOne({username : req.body.username, followers : req.currentUser.username})
            })
            .then(followRecord => {
                return followModel.update({$pull : {followers : req.currentUser.username}})
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

