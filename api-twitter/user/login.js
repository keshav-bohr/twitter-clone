const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const user = require('./userModel');

function loginHandler(req, res, next){
    user.findOne({
        username: req.body.username
    })
    .then(user => {
        return user.saveToken();
    })
    .then(user => {
        res.cookie('token',user.tokens[user.tokens.length -1])
        res.json({
            success: true
        })
    })
    .catch(error =>{
        next(error);
    })
}



router.post('/login',passport.authenticate('local', {session : false}), loginHandler);


module.exports = exports = router;