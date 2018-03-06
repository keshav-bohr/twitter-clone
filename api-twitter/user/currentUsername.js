const router = require('express').Router();


function currentUsernameHandler(req, res, next){
    res.json({
        currentUsername : req.currentUser.username
    })
}


router.get('/currentUsername', currentUsernameHandler)

module.exports = exports = router