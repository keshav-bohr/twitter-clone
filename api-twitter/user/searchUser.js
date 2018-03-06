const mongoose = require('mongoose');
const router = require('express').Router();

const followModel = require('../follow/followModel')
const user = require('./userModel');


function searchUserHandler(req, res, next){
    var usersWhoBlockedCurrent = [];
    followModel.find({blocked : req.currentUser.username})
    .then(followRecord => {
        followRecord.forEach(eachUser => {
            usersWhoBlockedCurrent.push(eachUser.username)
        })
        return user.find({name : { $regex: '.*' + req.body.name + '.*' , $options : 'i'}, username : {$nin : usersWhoBlockedCurrent} }).select('name username')
    })
    .then(users => {
        res.json({
            users
        })
    })
    .catch(error => {
        next(error)
    })
}



router.post('/search', searchUserHandler);

module.exports = exports = router;