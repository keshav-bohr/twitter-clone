const mongoose = require('mongoose');
const trendModel = require('./trendModel');
const router = require('express').Router();


function listTrendingHandler(req, res, next){
    let trendings = []
    trendModel.find()
    .then(allTrendings => {
        allTrendings.forEach(eachTrend => {
            trendings.push({hashtag : eachTrend.hashtag, counter : eachTrend.counter})
        })
        return new Promise((resolve, reject) => {
            if(trendings.length === allTrendings.length){
                resolve()
            }
        })
    })
    .then(() => {
        trendings.sort(function(a, b){return b.counter - a.counter})
        res.json({
            trendings : trendings
        })
    })
    .catch(error => {
        next(error)
    })
}



router.get('/trendings', listTrendingHandler);
module.exports = exports = router