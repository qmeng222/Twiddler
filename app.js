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
    $subtitle.text(user);
    $updateButton.text("Back");
    $feed.empty();
    currentTweet = 0;
    updateFeed(streams.users[user]);
  };

  var createTweet = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<div class="message"></div>');
    var $username = $('<span class="username"></span>');
    var $timestamp = $('<span class="timestamp"></span>');
    var $profilePhoto = $('<img class="profile-photo"></img>');
    $message.text(tweet.message);
    $username.text('@' + tweet.user);
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $timestamp.appendTo($message);
    $profilePhoto.attr('src', tweet.profilePhotoURL);
    $profilePhoto.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $username.on("click", function() { handleUserClick(tweet.user) });
    return $tweet;
  };

  var updateFeed = function(stream) {
    if (stream) {
      $updateButton.text('Back');
    } else {
      $subtitle.text('home page')
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



});