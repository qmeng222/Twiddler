$(document).ready(function(){
  // creates a variable that refers to the already-existing HTML div with id="app"
  var $app = $('#app');
  // clears the HTML from the app
  $app.html('');
  // creates div with id="feed"
  var $feed = $('<div id="feed"></div>');
  // adds feed div as a child to the app div
  $feed.appendTo($app);

  var $navbar = $('<div class="navbar" id="main-navbar"></div>');
  $navbar.appendTo($app);

  updateFeed();
  createUpdateFeedButton(function() {
    $feed.empty();
    updateFeed(); // currently adds more tweets to the feed
  }).appendTo($app);

});


var createUpdateFeedButton = function(onClick) {
    // creates update feed button
  var $updateFeedButton = $('<button id="update-feed" text="Add">Update Feed</button>');
  // creates functionality for the button - should add more tweets to the feed
  $updateFeedButton.on('click', onClick)
  return $updateFeedButton;
}

var updateFeed = function() {
  var index = streams.home.length - 1;
  while(index >= 0){
    // JavaScript only, data structure
    var tweet = streams.home[index];
    var $tweet = createTweet(tweet);
    // Adds the newly constructed tweet (jQuery object) to the div with an id="feed"
    $tweet.appendTo($('#feed'));
    index -= 1;
  }
}

var createTweet = function(tweet) {
  // creates jQuery variables
  var $tweet = $('<div class="tweet"></div>');
  var $message = $('<div class="message"></div>');
  var $username = $('<div class="username"></div>');
  var $profilePhoto = $('<img class="profile-photo"/>');
  var $timestamp = $('<div class="timestamp"></div>');
  var $commentIcon = $('<img class="icon comment"/>');
  var $retweetIcon = $('<img class="icon retweet"/>');
  var $likeIcon = $('<img class="icon like"/>');
  var $shareIcon = $('<img class="icon share">');

  // adds to elements via jQuery variables
  $message.text(tweet.message);
  $username.text('@' + tweet.user + ': ')
  $profilePhoto.attr('src', tweet.profilePhotoURL);
  $timestamp.text(tweet.created_at)
  $commentIcon.attr('src', './assets/icons/placeholder.png');
  $retweetIcon.attr('src', './assets/icons/placeholder.png');
  $likeIcon.attr('src', './assets/icons/placeholder.png');
  $shareIcon.attr('src', './assets/icons/placeholder.png');

  // appends these elements to the tweets
  $username.appendTo($tweet);
  $message.appendTo($tweet);
  $profilePhoto.appendTo($tweet);
  $timestamp.appendTo($tweet);
  $commentIcon.appendTo($tweet);
  $retweetIcon.appendTo($tweet);
  $likeIcon.appendTo($tweet);
  $shareIcon.appendTo($tweet);

  return $tweet;
}

