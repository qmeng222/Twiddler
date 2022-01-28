$(document).ready(function(){
  // Select the div with the ID #app
  var $app = $('<div id = "app"></div>');
  $app.appendTo('body');
  $app.html('');

  // Create an element within the #app element with id feed
  var $feed = $('<div id = "feed"></div>');
  $feed.appendTo($app);

  // Create an element with id called called update-feed
  var $updateFeed = $('<h2 id = "update-feed">Update Feed</h2>');
  $updateFeed.prependTo($app);

  //functions - Begin --------------
  var JQhtmlDiv = function(className) {
    return $('<div class="' + className + '"></div>');
  }

  var JQhtmlIcon = function(className) {
    return $('<i class="' + className + '"></i>');
  }

  var feedGenerator = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = JQhtmlDiv('tweet');
      var $message = JQhtmlDiv('message');
      var $userName = JQhtmlDiv('username');
      var $timeStamp = JQhtmlDiv('timestamp');
      var $userImage = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');

      //icons
      //var $comment = $('<i class="comment fas fa-comment"></i>');
      var $comment = JQhtmlIcon("retweet fas fa-retweet");
      var $retweet = JQhtmlIcon("retweet fas fa-retweet");
      var $like = JQhtmlIcon("like fas fa-thumbs-up");
      var $share = JQhtmlIcon("share fas fa-share");

      //set the content within desired elements
      $message.text(tweet.message);
      $userName.text('@' + tweet.user);
      $timeStamp.text(jQuery.timeago(tweet.created_at));

      //insert elements into the DOM
      // First handle the feed
      $tweet.appendTo($feed);
      // handle tweet elements
      tweetElements = [$message, $userName, $userImage, $timeStamp, $comment,
        $retweet, $like, $share];
      tweetElements.forEach(function(tweetElement) {
        tweetElement.appendTo($tweet);
      })
      index -= 1;
    }
  }
  // functions - end ------------------------

  // Initial tweet
  feedGenerator();

  // update feed
  $updateFeed.on("click", function(event) {
    // remove all div.tweet elements within the feed
    $feed.html('');
    feedGenerator();
  });

  console.log('hold here');


});