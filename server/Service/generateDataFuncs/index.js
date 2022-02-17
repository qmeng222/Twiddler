var tweet = require('./genTweet.js').generateRandomTweet;

module.exports = {
    tweet
};

//This module is specifically for generating data for testing and then writing
//that data to the DB so that the app can access the data as it would in vivo.