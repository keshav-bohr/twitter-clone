const findHashtags = require('find-hashtags');
const trend = require('./trendModel');


function deleteHashtags(content, id) {
    var arr = findHashtags(content);
    arr.forEach(tag => {
        trend.findOne({ hashtag: tag })
            .then(trendTag => {
                if (trendTag.counter === 1) {
                    trendTag.remove();
                }
                else{
                    if(trendTag){
                        return trendTag.update({$inc : {counter : -1}, $pull : {"tweetId" : id}})    // check the query
                    }
                }
            })
            .then(trendTag => {
                success : true
            })
            .catch(error => {
                console.error(error);
            })
    })
}


module.exports = exports = deleteHashtags;