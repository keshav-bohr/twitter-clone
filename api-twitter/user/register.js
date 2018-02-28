const user = require('./userModel');
const router = require('express').Router();


function registerHandler(req, res, next){
    var newUser = new user({
        name: req.body.name,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        DOB : req.body.DOB
    })
    newUser.save()
    .then(user => {
        res.json({
            success: true,
            result: user
        })
    })
    .catch(error => {
        next(error);
    })
}



router.post('/register', registerHandler);


module.exports = exports = router;