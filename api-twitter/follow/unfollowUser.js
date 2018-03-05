const mongoose = require('mongoose');
const followModel = require('./followModel');
const router = require('express').Router();


function unfollowUserHandler(req, res, next){
    followModel.findOne({username : req.currentUser.username})
    .then(followRecord => {
        return followRecord.update({$pull: {following : req.body.username} })
    })
    .then(followRecord => {
        return followModel.findOne({username : req.body.username})
    })
    .then(followRecord => {
        return followRecord.update({$pull : {followers : req.currentUser.username}})
    })
    .then(followRecord => {
        res.json({
            success : true
        })
    })
    .catch(error => {
        next(error)
    })

}




router.post('/unfollowUser', unfollowUserHandler)


module.exports = exports = router
