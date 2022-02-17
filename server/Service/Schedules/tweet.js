var init = function(users, newTweet, timeTillNext, percentRange, numberToGen) {
  timeTillNext = timeTillNext ? timeTillNext : 10000;
  percentRange = percentRange ? percentRange : .15;
  var numberToGen = 500;
  var numGened = 0;
  var createTimeout = async function(nextTweetTime) {
    setTimeout(async function() {
      if (numberToGen > numGened) {
        numGened++;
        var nextTweet = newTweet(users)
        scheduleTweet(nextTweet);
      }
    }, nextTweetTime);
  };

  var scheduleTweet = async function(nextTweet) {
    var nextTweetTime = timeTillNext + (Math.floor(Math.random() * (timeTillNext * (2 * percentRange))) - (timeTillNext * percentRange));
    createTimeout(nextTweetTime);
    if (nextTweet) {
      users[nextTweet.user]['tweets'].unshift(nextTweet);
    }
  }
  return scheduleTweet;
}


module.exports = {
  init
}