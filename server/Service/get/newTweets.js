var func = function(userName, timeOfLastTweet, users) {
  var followed = users[userName].following;
  var numFollowed = followed.length;
  var numGrabbedPer = Math.ceil(25/numFollowed);
  var tweets = [];
  followed.forEach(function(name) {
    var followedTweets = users[name]['tweets'];
    var numGrabbed = numGrabbedPer > followedTweets.length ? followedTweets.length : numGrabbedPer;
    tweets = tweets.concat(users[name]['tweets'].slice(0,numGrabbed))
  })

  tweets = tweets.filter(function(item) {
    var timeDif = item.created_at - timeOfLastTweet;
    return timeDif > 1000;
  });
  return tweets.length ? tweets.sort(function(a, b) { return Date(a.created_at) - Date(b.created_at)}) : [];
}


module.exports = {
  func
}


