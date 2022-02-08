$(document).ready(function () {
  var $body = $('body');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2>Where Twiddlers be Twiddlin\'</h2>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed" class="feed"></div>');
  // var $feedDiv = $('<div id="feed" class="feed"></div>');
  var $app = $('.app');
  // Create event handler functions
  var handleTitleClick = function (event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $subtitle.on('click', handleTitleClick);

  // Append new HTML elements to the DOM
  //$app.appendTo($body);
  $updateButton.prependTo($app);
  $feed.appendTo($app);
  $subtitle.prependTo($body);
  $title.prependTo($body);

  //$feedDiv.appendTo($app);

  renderFeed();
  window.isItBeautifulYet = true;
});


var renderFeed = function () {
  var $feed = $('.feed');
  $('#update-feed').text('Update Feed');
  $('#update-feed').attr('onClick', 'renderFeed()');
  $feed.empty();
  var index = 0;
  while (index < streams.home.length) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $username = $('<div class="username" onclick="filterUser(this.innerHTML)"></div>');
    var $pic = $('<br><img class="profile-photo"></img>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $message = $('<div class="message"></div>');
    var $icons = $('<i class="fas fa-comments comment"></i> <i class="fas fa-retweet retweet"></i> <i class="fas fa-thumbs-up like"></i> <i class="fas fa-share share"></i><br>');

    $username.text('@' + tweet.user);
    $message.text(tweet.message);
    $timestamp.text($.timeago(tweet.created_at));
    $pic.attr('src', tweet.profilePhotoURL);
    $tweet.prependTo($feed);
    $icons.prependTo($tweet);
    $timestamp.prependTo($tweet);
    $message.prependTo($tweet);
    $username.prependTo($tweet);
    $pic.prependTo($tweet);

    index += 1;
  }
};

var filterUser = function (arg) {
  var $feed = $('.feed');
  $feed.empty();
  var index = 0;
  $('#update-feed').text('Back');

  while (index < streams.home.length) {

    var tweet = streams.home[index];
    var username = '@' + tweet.user;
    if (username === arg) {
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<div class="username" onclick="filterUser(this.innerHTML)"></div>');
      var $pic = $('<br><img class="profile-photo"></img>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $message = $('<div class="message"></div>');
      var $icons = $('<i class="fas fa-comments comment"></i> <i class="fas fa-retweet retweet"></i> <i class="fas fa-thumbs-up like"></i> <i class="fas fa-share share"></i><br>');

      $username.text(username);
      $message.text(tweet.message);
      $timestamp.text($.timeago(tweet.created_at));
      $pic.attr('src', tweet.profilePhotoURL);
      $tweet.prependTo($feed);
      $icons.prependTo($tweet);
      $timestamp.prependTo($tweet);
      $message.prependTo($tweet);
      $username.prependTo($tweet);
      $pic.prependTo($tweet);
    }
    index += 1;
  }
};

var goBack = function () {
  $('#back').hide();
  $('#update-feed').show();
  renderFeed();
};