const mongoose = require('mongoose');
const router = require('express').Router();


const user = require('./userModel');


function searchUserHandler(req, res, next){
user.find({name : { $regex: '.*' + req.body.name + '.*' , $options : 'i'} }).select('name username')
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