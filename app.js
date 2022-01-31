$(document).ready(function(){
  jQuery("time.timeago").timeago();

  // Selecting existing HTML elements
  var $app = $('#app');
  var currentTweet = 0;

  // Creating HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h3>home page</h3>');
  var $feed = $('<div id="feed"></div>');
  var $updateButton = $('<button id="update-feed"></button>');

  // Create event handlers
  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is ' + event.target.innerText);
  };

  var handleUserClick = function(user) {
    $feed.empty();
    currentTweet = 0;
    $subtitle.text(user);
    $updateButton.text("Back");
    updateFeed(streams.users[user]);
    currentTweet = 0;
  };

  var createTweet = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    var $user = $('<div class="user"></div>');
    var $message = $('<div class="tweet-right"></div>');
    var $username = $('<span class="username"></span>');
    var $timestamp = $('<span class="timestamp"></span>');
    var $profilePhoto = $('<img class="profile-photo"></img>');
    var $comment = $('<i class="comment fas fa-comments"></i>');
    var $like = $('<i class="like fas fa-heart"></i>');
    var $retweet = $('<i class="retweet fas fa-trash"></i>');
    var $share = $('<i class="share fas fa-share"></i>');
    $message.append('<p class="message">' + tweet.message + '</p>');
    $message.append($like, $comment, $retweet, $share);
    $username.text('@' + tweet.user);
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $timestamp.appendTo($message);
    $profilePhoto.attr('src', tweet.profilePhotoURL);
    $profilePhoto.appendTo($user);
    $username.appendTo($user);
    $user.appendTo($tweet);
    $message.appendTo($tweet);
    $username.on("click", function() { handleUserClick(tweet.user) });
    return $tweet;
  };

  var updateFeed = function(stream) {
    if (currentTweet === 0) {
      $feed.empty();
    }
    if (stream) {
      $updateButton.text('Back');
    } else {
      $subtitle.text('home page');
      $updateButton.text('Update Feed');
    }
    var tweets = stream ? stream : streams.home;
    for (var index = currentTweet; index < tweets.length; index++) {
      var tweet = tweets[index];
      var $tweet = createTweet(tweet);
      $tweet.prependTo($feed);
      currentTweet++;
    }
  };

  // Set event listeners
  $title.on("click", handleTitleClick);
  $updateButton.text('Update Feed');
  $updateButton.on("click", function () { updateFeed() });

  // Append HTML elements to DOM
  //$app.html('');
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);
  updateFeed();

  window.isItBeautifulYet = true
});