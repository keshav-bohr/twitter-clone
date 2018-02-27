const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../user/userModel');

module.exports = exports = new LocalStrategy(
    function (username, password, done){
        user.findOne({
            username: username
        })
        .then(user => {
            if(!user){
                return done(null, false);
            }

            else{
                user.verifyPassword(password)
                .then(match => {
                    if(match){
                        done(null, true);
                    }
                    else{
                        done(null, false);
                    }
                })
            }
        })
        .catch(error => {
            done(error);
        })
    }
)