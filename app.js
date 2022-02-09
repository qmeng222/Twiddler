$(document).ready(function(){
  // Select already existing elements

  var $app = $('#app');
  $app.html('');
  $app.addClass('container');
  $('time.timeago').timeago();

  // Create new HTML elements

  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $friendList = $('<ul id="friend-list">Friends</ul>');

  // Create event hander functions

  var renderFeed = function(user) {
    $feed.empty();
    var targetStream;
    if (user !== undefined) {
      var name = user.replace('@', '');
      targetStream = streams.users[name];
    } else {
      targetStream = streams.home;
    }
    var index = targetStream.length - 1;
    while(index >= 0){
      var tweet = targetStream[index];
      var $tweet = $('<div class="tweet container-2"></div>');
      var $profilePic = $('<img class="profile-photo">');
      $profilePic.attr('src', tweet.profilePhotoURL);
      $profilePic.appendTo($tweet);
      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);
      var $timestamp = $('<span class="timestamp"></span>');
      var timeAgo = $.timeago(tweet.created_at);
      $timestamp.text(timeAgo);
      $timestamp.appendTo($tweet);
      var $message = $('<p class="message"></p>');
      $message.text(tweet.message);
      $message.appendTo($tweet);
      var $icons = $('<div class="icons"></div>')
      var $commentIcon = $('<i class="comment icon far fa-comments"></i>');
      $commentIcon.appendTo($icons);
      var $retweetIcon = $('<i class="retweet icon fas fa-retweet"></i>');
      $retweetIcon.appendTo($icons);
      var $likeIcon = $('<i class="like icon far fa-heart"</i>');
      $likeIcon.appendTo($icons);
      var $shareIcon = $('<i class="share icon far fa-share-square"></i>');
      $shareIcon.appendTo($icons);
      $icons.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  var handleUsernameClick = function(username) {
    renderFeed(username);
    if ($button.html() === 'Update Feed') {
      $button.html('Back');
    }
  };

  var renderFriends = function(users) {
    for (var key in streams.users) {
      var $user = $('<li class="friend"></li>');
      $user.text(key);
      $user.appendTo($friendList);
    }
  }

  // Set event listeners (providing appropriate handlers as input)

  renderFeed();
  renderFriends();

  $title.on('click', function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  $button.on('click', function(event) {
    event.preventDefault();
    renderFeed();
    if ($button.html() === 'Back') {
      $button.html('Update Feed');
    }
  });

  $feed.on('mouseenter', '.icon', function(event) {
    $(this).css("color", "rgb(29, 79, 27)");
  });

  $feed.on('mouseleave', '.icon', function(event) {
    $(this).css("color", "rgb(56, 33, 14)");
  });

  $feed.on('click', '.username', function (event) {
    handleUsernameClick($(this).html());
  });

  $friendList.on('click', '.friend', function (event) {
    handleUsernameClick($(this).html());
  });

  // Append new HTML elements to the DOM

  $title.appendTo($app);
  $feed.appendTo($app);
  $button.appendTo($app);
  $friendList.appendTo($app);

});

window.isItBeautifulYet = true;