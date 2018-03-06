const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser')


const registerRouter = require('./user/register');
const loginRouter = require('./user/login')
const createTweetRouter = require('./tweets/createTweet');
const deleteTweetRouter = require('./tweets/deleteTweet');
const config = require('./config/passport');
const authToken = require('./authToken/authMiddleware');
const currentUsernameRouter = require('./user/currentUsername')
const followUserRouter = require('./follow/followUser');
const unfollowUserRouter = require('./follow/unfollowUser');
const blockUserRouter = require('./follow/blockUser');
const unblockUserRouter = require('./follow/unblockUser');
const timelineTweetsRouter = require('./tweets/timelineTweets');
const searchUserRouter = require('./user/searchUser')
const userProfileRouter = require('./user/userProfile')



// Cross origin request
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Connect to database
mongoose.connect("mongodb://localhost:27017/twitter-clone");


// Cookie parser middleware
app.use(cookieParser())


// Parse json data
app.use(bodyParser.json())

// Internal error handler
app.use((error, req, res, next) => {
    res.status(500).send('internal error occurred');
})



// Passport config and initialise
passport.use(config);
app.use(passport.initialize());


// Register router
app.use('/user',registerRouter);


// Login router
app.use('/user',loginRouter);


// Authentication middleware
app.use(authToken);

// Current Username router
app.use('/', currentUsernameRouter);

// Create tweet router
app.use('/tweet',createTweetRouter);

// Delete tweet router
app.use('/tweet',deleteTweetRouter);


// Follow user router
app.use('/', followUserRouter)

// Unfollow user router
app.use('/', unfollowUserRouter)

// Block user router
app.use('/', blockUserRouter)

// Unblock user router
app.use('/', unblockUserRouter)

// Timeline Tweets router
app.use('/tweet', timelineTweetsRouter);


// Search user router
app.use('/user', searchUserRouter)

// User profile router
app.use('/user', userProfileRouter)


// Server at 3001
app.listen(3001);