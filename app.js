$(document).ready(function () {
  var $body = $('body');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2>Where Twiddlers be Twiddlin\'</h2>');
  var $updateButton = $('<button id="update-feed" onclick=updateFeed()>Update Feed</button>');
  var $backButton = $('<button id="back" onclick=goBack() style="display:none;">Back</button>');
  var $feedDiv = $('<div id="feed"></div>');
  var $app = $('<div id="#app"></div> ');
  // Create event handler functions
  var handleTitleClick = function (event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $subtitle.on('click', handleTitleClick);

  // Append new HTML elements to the DOM
  $app.appendTo($body);
  $subtitle.prependTo($body);
  $title.prependTo($body);
  $updateButton.appendTo($app);
  $backButton.appendTo($app);
  $feedDiv.appendTo($app);

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