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

  var $header = $('<header class="primary-header container"></header>');
  var $title = $('<h1 class="title"><a href="index.html">Twiddler</a></h1>');
  var $tagline = $('<h3 class="tagline"><strong>"Personal remarks are rude?"</strong> - Mad Hatter, \'Alice in Wonderland\'</h3>');
  var $grid = $('<div class="grid"></div>');
  var $friends = $('<div class="col-1-3" id="friends"></div>');
  var $updateButton = $('<button class="btn btn-alt" id="update-feed">Update Feed</button>');
  var $feed = $('<div class="col-1-3" id="feed"></div>');

  var $icons = $('<div class="grid icon-container"></div>');
  var $commentIcon = $('<i class="col-1-4 icon comment far fa-comment-dots" src="assets/icons/comment-dots-regular.svg"></i>');
  var $retweetIcon = $('<i class="col-1-4 icon retweet fas fa-retweet" src="assets/icons/retweet-solid.svg"></i>');
  var $likeIcon = $('<i class="col-1-4 icon like far fa-heart" src="assets/icons/heart-regular.svg"></i>');
  var $shareIcon = $('<i class="col-1-4 icon share far fa-share-square" src="assets/icons/share-square-regular.svg"></i>');

  // ----------------------------------------------------------------------------------------------
  // HTML rendering functions
  // ----------------------------------------------------------------------------------------------

  // var renderHeader = function() {
  //   $header.append($title, $tagline);
  // };

  var renderFeed = function(user) {
    var stream;
    user ? (stream = streams.users[user]) : (stream = streams.home);
    var index = stream.length - 1;
    $('.tweet').remove();
    $.each(stream, function(index, tweet) {
      var timestamp = $.timeago(tweet.created_at);
      var username = '@' + tweet.user;
      tweet = renderTweet(tweet.profilePhotoURL, username, tweet.message, timestamp);
      tweet.prependTo($feed);
    });
    $('.tweet').append($icons);
  };

  var renderTweet = function(profilePhoto, username, message, timestamp) {
    var $currentTweet = $('<div class="tweet"></div>');
    var $tweeterInfo = $('<aside class="col-1-3 tweeter-info"></aside>');
    var $profilePhoto = $('<img class="profile-photo" src=' + profilePhoto + ' alt="no profile photo">');
    var $username = $('<div class="username">' + username + '</div>');
    var $messageInfo = $('<div class="col-2-3 message-info"></div>');
    var $timestamp = $('<div class="timestamp">' + timestamp + '</div>');
    var $message = $('<p class="message">' + message + '</p>');

    $tweeterInfo.append($profilePhoto, $username);
    $messageInfo.append($timestamp, $message);
    $currentTweet.append($tweeterInfo, $messageInfo);
    // $currentTweet.append($profilePhoto, $timestamp, $username, $message);
    return $currentTweet;
  };

  var renderIcons = function() {
    $icons.append($commentIcon, $retweetIcon, $likeIcon, $shareIcon);
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
    $(this).css('background-color', 'grey');
  };

  var handleOut = function() {
    $(this).css('background-color', 'initial');
  };

  var handleUsernameClick = function() {
    var user = this.textContent.slice(1);
    renderFeed(user);
    $updateButton.text("Back");
    setEventListenersOn();
  };

  // ----------------------------------------------------------------------------------------------
  // Append new HTML elements to the DOM
  // ----------------------------------------------------------------------------------------------

  $header.appendTo($app);
  $title.appendTo($header);
  $tagline.appendTo($app);
  $grid.appendTo($app);
  $friends.appendTo($grid);
  $updateButton.appendTo($friends);
  $feed.appendTo($grid);

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
  // Initiate the page
  // ----------------------------------------------------------------------------------------------

  renderIcons();
  renderFeed();
  setEventListenersOn();

  window.isItBeautifulYet = true;
});