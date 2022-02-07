$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id=feed></div>');

  // Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleUpdateClick = function(event) {
    $updateFeed.text('Update Feed');
    $(".tweet").remove();
    renderFeed();
  }

  var handleUsernameClick = function(event) {
    var name = event.target.innerText;
    var username = name.slice(1);
    $(".tweet").remove();
    $updateFeed.text('Back');
    renderFeed(username);
  }

  function renderFeed(username) {
    if (username) {
      var tweetArray = streams.users[username];
    } else {
      var tweetArray = streams.home;
    }

    var index = tweetArray.length - 1;
    while (index >= 0) {
      var tweet = tweetArray[index];
      var $tweet = $('<div class="tweet"></div>');

      // create various elements of tweet
      var $profilePic = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"></img>');
      var $username = $('<span class="username">@' + tweet.user + '</span>');
      var $message = $('<div class="message">' + tweet.message + '</div>');
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="comment fas fa-comment"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-heart"></i>');
      var $share = $('<i class="share fas fa-share"></i>');

      // username click
      $username.on("click", handleUsernameClick);

      // append all to tweet
      $profilePic.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      // append tweets to feed
      $tweet.appendTo($feed);
      index -= 1;
    }

  }

  renderFeed();

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $updateFeed.on("click", handleUpdateClick);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  window.isItBeautifulYet = true;
});