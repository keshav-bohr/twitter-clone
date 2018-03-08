const mongoose = require('mongoose');
const router = require('express').Router();

const user = require('./userModel')


function logoutHandler(req, res, next){
    var token = req.cookies.token;
    user.findOne({username : req.currentUser.username})
    .then(user => {
        return user.update({
            $pull : {
                "tokens" : token
            }
        })
    })
    .then(user => {
        res.clearCookie('token').json({
            success: true
        })
    })
    .catch(error => {
        next(error)
    })
}



router.post('/logout',logoutHandler);

module.exports = exports = router;