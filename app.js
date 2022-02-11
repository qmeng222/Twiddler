$(document).ready(function() {
  // timeago
  jQuery("time.timeago").timeago();

  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2>Where Twiddlers be Twiddlin\'</h2>');
  var $feed = $('<div id="feed"></div>');
  var $button = $('<button id="update-feed" type="button">Update Feed</button>');

  // Create event handler functions
  var handleTitleClick = function(event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  }

  var handleUsernameClick = function(event) {
    var username = event.target.innerText.substr(1);
    renderFeed(username);
    $button.text('Back');
    $button.click(function(event) {
      $button.text('Update Feed');
      renderFeed();
    });
  };

  var renderFeed = function(username) {
    // clear the feed first
    $feed.html('');
    // determine where to draw the tweets from
    var feed = username !== undefined ? streams.users[username] : streams.home;
    // make the tweet
    var index = feed.length - 1;
    while (index >= 0) {
      var tweet = feed[index];
      // establish the tweet
      var $tweet = $('<div class="tweet"></div>');
      // profile photo
      var $profilePhoto = $('<img class="profile-photo"></img>');
      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $profilePhoto.appendTo($tweet);
      // username
      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);
      // message
      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);
      // timestamp
      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);
      // img elements with the class of icon
      var $iconComment = $('<i class="icon comment fa-solid fa-comment"></i>');
      $iconComment.appendTo($tweet);
      var $iconRetweet = $('<i class="icon retweet fa-solid fa-retweet"></i>');
      $iconRetweet.appendTo($tweet);
      var $iconLike = $('<i class="icon like fa-solid fa-heart"></i>');
      $iconLike.appendTo($tweet);
      var $iconShare = $('<i class="icon share fa-solid fa-share"></i>');
      $iconShare.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
    userListener();
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $subtitle.on('click', handleTitleClick);
  $button.click(function(event) {
    renderFeed();
  });

  // listen for users as well
  function userListener() {
    $('.username').click(handleUsernameClick);
  };

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);
  renderFeed();

  window.isItBeautifulYet = true;
});