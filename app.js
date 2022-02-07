$(document).ready(function(){
  // Select already exsisting elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $homefeed = $('<div id="feed"></div>');

  // Create event handler functions
  var load = function() {
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class="profile-photo" alt="Profile Picture" src="assets/img/' + tweet.user + '.png">');
    var $username = $('<span class="username"></span>');
    var $message = $('<p class="message"></p>');
    var $time = $('<span class="timestamp"></span>');
    var $comment = $('<i class="icon comment fas fa-comments" alt="Comment Icon"></i>');
    var $retweet = $('<i class="icon retweet fas fa-retweet" alt="Retweet Icon"></i>');
    var $like = $('<i class="icon like fas fa-thumbs-up" alt="Like Icon"></i>');
    var $share = $('<i class="icon share fas fa-share" alt="Share Icon"></i>');

    $username.text('@' + tweet.user);
    $message.text(tweet.message);
    $time.text(jQuery.timeago(tweet.created_at));

    $tweet.prependTo($homefeed);
    $profilePhoto.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $time.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $button.appendTo($app);
  }
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }
  var handleUsernameClick = function(event) {
    $homefeed.html('');
    $button.text("Back");
    for (var i = 0; i < streams.home.length; i++) {
      var tweet = streams.home[i];
      console.log(event.target.innerText);
      console.log(tweet.user);
      if (event.target.innerText.slice(1, event.target.innerText.length) === tweet.user) {
        var $tweet = $('<div class="tweet"></div>');
        var $profilePhoto = $('<img class="profile-photo" alt="Profile Picture" src="assets/img/' + tweet.user + '.png">');
        var $username = $('<span class="username"></span>');
        var $message = $('<p class="message"></p>');
        var $time = $('<span class="timestamp"></span>');
        var $comment = $('<i class="icon comment fas fa-comments" alt="Comment Icon"></i>');
        var $retweet = $('<i class="icon retweet fas fa-retweet" alt="Retweet Icon"></i>');
        var $like = $('<i class="icon like fas fa-thumbs-up" alt="Like Icon"></i>');
        var $share = $('<i class="icon share fas fa-share" alt="Share Icon"></i>');

        $username.text('@' + tweet.user);
        $message.text(tweet.message);
        $time.text(jQuery.timeago(tweet.created_at));

        $tweet.prependTo($homefeed);
        $profilePhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $time.appendTo($tweet);
        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);
        $button.appendTo($app);
      }
    }
  }
  var renderFeed = function() {
    $homefeed.html('');
    for (var i = 0; i < streams.home.length; i++) {
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" alt="Profile Picture" src="assets/img/' + tweet.user + '.png">');
      var $username = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $time = $('<span class="timestamp"></span>');
      var $comment = $('<i class="icon comment fas fa-comments" alt="Comment Icon"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet" alt="Retweet Icon"></i>');
      var $like = $('<i class="icon like fas fa-thumbs-up" alt="Like Icon"></i>');
      var $share = $('<i class="icon share fas fa-share" alt="Share Icon"></i>');

      $username.text('@' + tweet.user);
      $username.on("click", handleUsernameClick);
      $message.text(tweet.message);
      $time.text(jQuery.timeago(tweet.created_at));

      $tweet.prependTo($homefeed);
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $time.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
    }
  }

  // Set event listeners (providing appropriate handlers as input)
  $button.on("click", renderFeed);
  $title.on("click", handleTitleClick);
  //$userNames.on("click", renderFeed);

  // ??????????
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    load();
    index -= 1;
  }

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $homefeed.appendTo($app);
});