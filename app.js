$(document).ready(function(){

  // ----------------------------------------------------------------------------------------------
  // Select already existing elements
  // ----------------------------------------------------------------------------------------------

  var $body = $('body');
  var $app = $('#app');
  $app.html('');

  // ----------------------------------------------------------------------------------------------
  // Create new HTML elements
  // ----------------------------------------------------------------------------------------------

  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2></h2>');
  var $updateButton = $('<button id="update-feed">Update Button</button>');
  var $feed = $('<div id="feed"></div>');
  var $tweet

  // ----------------------------------------------------------------------------------------------
  // Create main functions
  // ----------------------------------------------------------------------------------------------

  var renderFeed = function() {
    var index = streams.home.length - 1;
    $(".tweet").remove();
    while(index >= 0){
      var tweet = streams.home[index];
      // var $tweet = $('<div class="tweet"></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      var username = '@' + tweet.user;
      var $tweet = renderTweet(tweet.profilePhotoURL, username, tweet.message, tweet.created_at);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  var renderTweet = function(profilePhoto, username, message, timestamp) {
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class="profile-photo" src=' + profilePhoto + ' alt="no profile photo">');
    var $username = $('<span class="username">' + username + '</span>');
    var $message = $('<p class="message">' + message + '</p>');
    var $timestamp = $('<span class="timestamp">' + timestamp + '</span>');
    var $icons = $('<div class="icon"></div>');
    var $commentIcon = $('<img class="icon comment" src="assets/icons/placeholder.png" alt="comment">');
    var $retweetIcon = $('<img class="icon retweet" src="assets/icons/placeholder.png" alt="retweet">');
    var $likeIcon = $('<img class="icon like" src="assets/icons/placeholder.png" alt="like">');
    var $shareIcon = $('<img class="icon share" src="assets/icons/placeholder.png" alt="share">');
    $icons.append($commentIcon, $retweetIcon, $likeIcon, $shareIcon);
    $tweet.append($profilePhoto, $username, $message, $timestamp, $icons);
    return $tweet;
  };

  // ----------------------------------------------------------------------------------------------
  // Create event handler functions
  // ----------------------------------------------------------------------------------------------

  var handleTitleClick = function(event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  };

  var handleUpdateButtonClick = function(event) {
    renderFeed();
  };

  // ----------------------------------------------------------------------------------------------
  // Set event listeners (providing appropriate handlers as input)
  // ----------------------------------------------------------------------------------------------

  $title.on("click", handleTitleClick);
  $updateButton.on("click", handleUpdateButtonClick);

  // ----------------------------------------------------------------------------------------------
  // Append new HTML elements to the DOM
  // ----------------------------------------------------------------------------------------------

  $title.appendTo($app);
  $subtitle.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);

  // ----------------------------------------------------------------------------------------------
  // Misc
  // ----------------------------------------------------------------------------------------------

  renderFeed();

});