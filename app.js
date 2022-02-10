$(document).ready(function(){

  var $app = $('#app');

  var $feed = $('<div id="feed"></div>');
  var updateFeedText = 'Update Feed';
  var $updateFeed = $('<button id="update-feed">' + updateFeedText +'</button>');


  var renderFeed = function(event, user) {
    $feed.html('');
    !user ? $updateFeed.text(updateFeedText) : $updateFeed.text('Back');

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      if (!user || tweet.user === user) {
        var $tweet = composeTweet(tweet);
        $tweet.appendTo($feed);
      }
      index -= 1;
    }
  };

  // Given a tweet's data, compose a UI element for that tweet
  var composeTweet = function(tweet) {

    var $tweet = $('<div class="tweet"></div>');

    var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
    var $username = $('<div class="username">@' + tweet.user + '</div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $timestamp = $('<div class="timestamp">' + $.timeago(tweet.created_at) + '<dive>');
    var placeholderImgUrl = "assets/icons/placeholder.png";
    var $comment = $('<i class="comment fa-solid fa-comment"></i>');
    var $retweet = $('<i class="retweet fa-solid fa-retweet"></i>');
    var $like = $('<i class="like fa-solid fa-heart"></i>');
    var $share = $('<i class="share fa-solid fa-share"></i>');

    $profilePhoto.appendTo($tweet);
    $message.appendTo($tweet);
    $username.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);

    $username.on("click", function(e) {
      renderFeed(e, tweet.user);
    })

    return $tweet;
  };

  $updateFeed.on("click", renderFeed);

  $app.html('');
  $updateFeed.appendTo($app);
  $feed.appendTo($app);
  renderFeed();

  window.isItBeautifulYet = true;

});