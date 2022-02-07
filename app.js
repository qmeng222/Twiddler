$(document).ready(function () {
  var $body = $('body');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2>Where Twiddlers be Twiddlin\'</h2>');

  // Create event handler functions
  var handleTitleClick = function (event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $subtitle.on('click', handleTitleClick);

  // Append new HTML elements to the DOM
  $subtitle.prependTo($body);
  $title.prependTo($body);


  renderFeed();
});



var updateFeed = function () {
  streams.home = [];
  for (var i = 0; i < 11; i++) {
    generateRandomTweet();
  }
  renderFeed();
};

var renderFeed = function () {
  var $feed = $('#feed');
  var index = streams.home.length - 1;
  while (index >= 0) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $username = $('<div class="username" onclick="filterUser(this.innerHTML)"></div>');
    var $pic = $('<br><img class="profile-photo"></img>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $message = $('<div class="message"></div>');
    var $icons = $('<span class="icons"><i class="fas fa-comments"></i> <i class="fas fa-retweet"></i> <i class="fas fa-thumbs-up"></i> <i class="fas fa-share"></i></span><br>');
    $username.text('@' + tweet.user);
    $message.text(tweet.message);
    $timestamp.text(jquery.timeago(tweet.created_at));
    $pic.attr('src', tweet.profilePhotoURL);
    $tweet.prependTo($feed);
    $pic.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $icons.appendTo($tweet);

    index -= 1;
  }
};

var filterUser = function (arg) {
  $('#update-feed').hide();
  $('#back').show();
  var tweets = $('#feed').children('.tweet').each(function () {
    if ($(this).children('.username').text() !== arg) {
      $(this).hide();
    }
  });
};

var goBack = function () {
  $('#back').hide();
  $('#update-feed').show();
  var tweets = $('#feed').children('.tweet').each(function () {
    $(this).show();
  });
};