const user = require('../user/userModel');

function checkTokenMiddleware(req, res, next){
    var token = req.cookies.token;
    if(token){
        return user.verifyToken(token)
        .then(user => {
            if(user){
                req.currentUser = user;
                next();
            }
            else{
                res.send("user not found");
            }
        })
        .catch(error => {
            next(error);
        })
    }
    }


module.exports = exports = checkTokenMiddleware;