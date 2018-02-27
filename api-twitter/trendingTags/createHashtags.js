const findHashtags = require('find-hashtags');
const trend = require('./trendModel');


function addHashtags(content, id) {
    var arr = findHashtags(content);
    arr.forEach(tag => {
        trend.findOne({ hashtag: tag })
            .then(trendTag => {
                if (trendTag) {
                    return trendTag.update({ $inc: { counter: 1 }, $push: { tweetId: id } })
                }
                else {
                    var newTrend = new trend({
                        hashtag: tag,
                        counter: 1,
                        tweetId: id
                    })
                    return newTrend.save();
                }
            })
            .then(trendTag => {
                success: true
            })
            .catch(error => {
                console.error(error);
            })
    })
}


module.exports = exports = addHashtags;