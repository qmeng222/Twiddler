$(document).ready(function(){
  var $app = $('#app');
  //$app.html('');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);

  var $feed = $('<div id="feed"></div>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  $button.appendTo($app);

  var set = new Set();
  var firstLoad = true;

  function loadTweets() {
    var index = streams.home.length - 1;
    if(firstLoad) {
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        var $username = $('<div class="username">@' + tweet.user + '</div>');
        var $message = $('<div class="message">' + tweet.message + '</div>');
        var $profilePic = $('<img src="./assets/img/' + tweet.user +
        '.png" class="profile-photo">');
        var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
        var $iconBar = $('<div class="navBar"></div>');
        var $comment = $('<i class="icon comment far fa-comment fa-lg"></i>');
        $comment.appendTo($iconBar);
        var $retweet = $('<i class="icon retweet fas fa-retweet fa-lg"></i>');
        $retweet.appendTo($iconBar);
        var $like = $('<i class="icon like far fa-heart fa-lg"></i>');
        $like.appendTo($iconBar);
        var $share = $('<i class="icon share far fa-share-square fa-lg"></i>');
        $share.appendTo($iconBar);
        set.add(tweet.message + tweet.user);
        $profilePic.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $iconBar.appendTo($tweet);
        $tweet.appendTo($feed);
        $feed.appendTo($app);
        index--;
        firstLoad = false;
      }
    } else {
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        var $username = $('<div class="username">@' + tweet.user + '</div>');
        var $message = $('<div class="message">' + tweet.message + '</div>');
        var $profilePic = $('<img src="./assets/img/' + tweet.user +
        '.png" class="profile-photo">');
        var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
        var $iconBar = $('<div class="navBar"></div>');
        var $comment = $('<i class="icon comment far fa-comment fa-lg"></i>');
        $comment.appendTo($iconBar);
        var $retweet = $('<i class="icon retweet fas fa-retweet fa-lg"></i>');
        $retweet.appendTo($iconBar);
        var $like = $('<i class="icon like far fa-heart fa-lg"></i>');
        $like.appendTo($iconBar);
        var $share = $('<i class="icon share far fa-share-square fa-lg"></i>');
        $share.appendTo($iconBar);
        if (!set.has(tweet.message + tweet.user)) {
          set.add(tweet.message + tweet.user);
          $profilePic.appendTo($tweet);
          $username.appendTo($tweet);
          $message.appendTo($tweet);
          $timestamp.appendTo($tweet);
          $iconBar.appendTo($tweet);
          $tweet.prependTo($feed);
          $feed.appendTo($app);
          index--;
        } else {
          index--;
        }
      }
    }
  }

  loadTweets();

  $button.on("click", function(event) {
    loadTweets();
  });
});