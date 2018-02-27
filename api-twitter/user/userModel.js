const userSchema = require('./userSchema');
const mongoose = require('mongoose')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')


userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        argon2.hash(user.password)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(error => {
            next(error);
        })
    }
    else{
        next();
    }
})

userSchema.methods.verifyPassword = function(userSubmittedPassword){
    return argon2.verify(this.password, userSubmittedPassword);
}

userSchema.methods.saveToken = function(){
    let token = jwt.sign({id: this.id, access: "auth"}, "twitterClone");
    this.tokens.push(token);
    return this.save();
}


userSchema.statics.verifyToken = function(token){
    var decoded = jwt.verify(token,'twitterClone');
    return this.findOne({
        "_id": decoded.id,
        "tokens": token
    })
}



const user = mongoose.model('user', userSchema);
module.exports = exports = user;