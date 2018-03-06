const mongoose = require('mongoose');
const followModel = require('./followModel');
const router = require('express').Router();


function unblockUserHandler(req,res,next){
    followModel.findOne({username : req.currentUser.username, blocked : req.body.username})
    .then(followRecord => {
        return followRecord.update({$pull : {blocked : req.body.username}})
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






router.post('/unblock', unblockUserHandler);


module.exports = exports = router