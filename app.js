$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');

  // App Title
  var $title = $('<h1 id="title">Twiddler</h1>');
  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  };
  $title.on("click", handleTitleClick);
  $title.appendTo($app);
  // Subtitle
  var $subtitle = $('<h6 id="subtitle">Twiddle your thumbs</h6>');
  $subtitle.appendTo($app);

  // Refresh Feed Button
  var $button = $('<button id="update-feed">Update Feed</button>');
  var refreshClick = function() {
    $('.tweet').removeClass('tweet');
    openFeed();
  };
  $button.on("click", refreshClick);
  $button.appendTo($app);

  // Feed Title
  var $feedTitle = $('<h5 id="feedTitle">Feed</h5>');
  $feedTitle.appendTo($app);

  // Feed
  var $feed = $('<div id="feed"></div>');
  var openFeed = function() {
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');

    // Get Profile Photo
    var getImage = function (user) {
      if (user === 'douglascalhoun') return $('<img class="profile-photo" src="assets/img/douglascalhoun.png"></img>');
      if (user === 'mracus') return $('<img class="profile-photo" src="assets/img/mracus.png"></img>');
      if (user === 'sharksforcheap') return $('<img class="profile-photo" src="assets/img/sharksforcheap.png"></img>');
      if (user === 'shawndrost') return $('<img class="profile-photo" src="assets/img/shawndrost.png"></img>');
      if (user === 'visitor') return $('<img class="profile-photo" src="assets/img/visitor.png"></img>');
    };

    // Profile Photo
    var $image = getImage(tweet.user);
    $image.appendTo($tweet);
    // Username
    var $username = $('<div class="username"></div>');
    var username = '@' + tweet.user;
    $username.appendTo($tweet);
    // Message
    var $message = $('<p class="message"></p>');
    var message = tweet.message;
    $message.appendTo($tweet);
    // Time
    var $timestamp = $('<div class="timestamp"></div>');
    var timestamp = jQuery.timeago(tweet.created_at);
    $timestamp.appendTo($tweet);
    // Icons
    var $comment = $('<i class="fas fa-comment"></i>');
    $comment.appendTo($tweet);
    var $retweet = $('<i class="fas fa-retweet"></i>');
    $retweet.appendTo($tweet);
    var $like = $('<i class="fas fa-heart"></i>');
    $like.appendTo($tweet);
    var $share = $('<i class="fas fa-share"></i>');
    $share.appendTo($tweet);

    $username.text(username);
    $message.text(message);
    $timestamp.text(timestamp);
    $tweet.appendTo($feed);
    index -= 1;
  }
};
  openFeed();
  $feed.appendTo($app);

  // Select already existing elements
  // Create new HTML elements
  // Create event handler functions
  // Set event listeners (providing appropriate handlers as input)
  // Append new HTML elements to the DOM
});