$(document).ready(function(){
  // Select already existing elements

  var $app = $('#app');
  $app.html('');

  $('time.timeago').timeago();

  // Create new HTML elements

  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');
  var $update = $('<button id="update-feed">Update Feed</button>');

  // Create event hander functions

  var renderFeed = function(user) {
    var targetStream;
    if (user !== undefined) {
      var name = user.replace('@', '');
      targetStream = streams.users[user];
    } else {
      targetStream = streams.home;
    }
    var index = targetStream.length - 1;
    while(index >= 0){
      var tweet = targetStream[index];
      var $tweet = $('<div class="tweet"></div>');
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
      var $commentIcon = $('<i class="comment icon far fa-comments"></i>');
      $commentIcon.appendTo($tweet);
      var $retweetIcon = $('<i class="retweet icon fas fa-retweet"></i>');
      $retweetIcon.appendTo($tweet);
      var $likeIcon = $('<i class="like icon far fa-heart"</i>');
      $likeIcon.appendTo($tweet);
      var $shareIcon = $('<i class="share icon far fa-share-square"></i>');
      $shareIcon.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  // Set event listeners (providing appropriate handlers as input)

  renderFeed();

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  $update.on('click', function(event) {
    event.preventDefault();
    $('#feed').empty();
    renderFeed();
  });

  $('.icon').hover(function() {
    console.log(event);
    $(this).css("color", "blue");
  }, function() {
    $(this).css("color", "black");
  });

  $('.username').on('click', function () {
    renderFeed($(this));
  });

  // Append new HTML elements to the DOM

  $title.appendTo($app);
  $feed.appendTo($app);
  $update.appendTo($app);

});