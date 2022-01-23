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
  var $subtitle = $('<h4>"Personal remarks are rude?" - Mad Hatter, \'Alice in Wonderland\'</h4>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  // var $tweet = $('.tweet');
  var $icon = $('.icon');
  var $username = $('.username');

  var $icons = $('<div></div>');
  var $commentIcon = $('<i class="icon comment far fa-comment-dots" src="assets/icons/comment-dots-regular.svg"></i>');
  var $retweetIcon = $('<i class="icon retweet fas fa-retweet" src="assets/icons/retweet-solid.svg"></i>');
  var $likeIcon = $('<i class="icon like far fa-heart" src="assets/icons/heart-regular.svg"></i>');
  var $shareIcon = $('<i class="icon share far fa-share-square" src="assets/icons/share-square-regular.svg"></i>');

  // ----------------------------------------------------------------------------------------------
  // Create main functions
  // ----------------------------------------------------------------------------------------------

  var renderFeed = function(user) {
    var stream;
    user ? (stream = streams.users[user]) : (stream = streams.home);
    var index = stream.length - 1;
    $('.tweet').remove();
    while(index >= 0){
      var tweet = stream[index];
      var timestamp = $.timeago(tweet.created_at);
      var username = '@' + tweet.user;
      var $currentTweet = renderTweet(tweet.profilePhotoURL, username, tweet.message, timestamp);
      $currentTweet.appendTo($feed);
      index -= 1;
    }
    $('.tweet').append($icons);
  };

  var renderTweet = function(profilePhoto, username, message, timestamp) {
    var $currentTweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class="profile-photo" src=' + profilePhoto + ' alt="no profile photo">');
    var $username = $('<span class="username">' + username + '</span>');
    var $message = $('<p class="message">' + message + '</p>');
    var $timestamp = $('<span class="timestamp">' + timestamp + '</span>');
    $currentTweet.append($profilePhoto, $username, $message, $timestamp);
    return $currentTweet;
  };

  var renderIcons = function() {
    $icons.append($commentIcon, $retweetIcon, $likeIcon, $shareIcon);
    return $icons;
  };

  // ----------------------------------------------------------------------------------------------
  // Create event handler functions
  // ----------------------------------------------------------------------------------------------

  var handleTitleClick = function(event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  };

  var handleUpdateButtonClick = function(event) {
    if (this.textContent === 'Back') {
      $updateButton.text('Update Feed');
    }
    renderFeed();
    setEventListenersOn();
  };

  var handleIn = function() {
    $(this).css('background-color', 'gray');
  };

  var handleOut = function() {
    $(this).css('background-color', 'initial');
  };

  var handleUsernameClick = function() {
    $updateButton.text("Back");
    var user = this.textContent.slice(1);
    renderFeed(user);
    setEventListenersOn();
  };

  // ----------------------------------------------------------------------------------------------
  // Append new HTML elements to the DOM
  // ----------------------------------------------------------------------------------------------

  $title.appendTo($app);
  $subtitle.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);

  // ----------------------------------------------------------------------------------------------
  // Set event listeners (providing appropriate handlers as input)
  // ----------------------------------------------------------------------------------------------

  var setEventListenersOn = function() {
    $title.on("click", handleTitleClick);
    $updateButton.on("click", handleUpdateButtonClick);
    $('.icon').hover(handleIn, handleOut);
    $('.username').hover(handleIn, handleOut);
    $('.username').on("click", handleUsernameClick);
  };

  // ----------------------------------------------------------------------------------------------
  // Misc
  // ----------------------------------------------------------------------------------------------

  renderIcons();
  renderFeed();
  setEventListenersOn();

});