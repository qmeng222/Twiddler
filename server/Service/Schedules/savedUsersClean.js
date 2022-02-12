var init = function(users, saveFunc, saveIntervals) {
  saveIntervals = saveIntervals ? saveIntervals : 3600;//seconds
  saveIntervals *= 1000; //miliseconds
  var createTimeout = async function() {
    setTimeout(async function() {
      var totalTweets = 0;
      Object.keys(users).forEach(function(key) {
        var user = users[key];
        var numTweets = user.tweets.length;
        totalTweets += numTweets;
      })
      if (totalTweets > 5000) {
        Object.keys(users).forEach(function(key) {
          var user = users[key];
          var tweets = user.tweets;
          user.tweets = tweets.slice(0, Math.floor(tweets.length * .9));
        })
        saveFunc('users.json', users)
        scheduleSave();
      }
    }, saveIntervals);
  };

  var scheduleSave = async function() {
    createTimeout();
  }
  return scheduleSave;
}

module.exports = {
  init
}