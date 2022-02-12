
var func = function(userName, users) {
  var followed = users[userName].following;
  var numFollowed = followed.length;
  var numGrabbedPer = Math.ceil(40/numFollowed);
  var tweets = [];
  followed.forEach(function(name) {
    var followedTweets = users[name]['tweets'];
    var numGrabbed = numGrabbedPer > followedTweets.length ? followedTweets.length : numGrabbedPer;
    tweets = tweets.concat(users[name]['tweets'].slice(0,numGrabbed))
  })
  var sorted =  tweets.sort(function(a, b) { return b.created_at - a.created_at});
  return sorted;
}


module.exports = {
  func
}