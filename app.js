$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Select already existing elements

  // Create new HTML elements

  var $title = $('<h1>twiddler<h1>');
  var $update_feed_btn = $('<button id="update-feed">update feed</button>');
  var $home_feed = $('<div id="feed"></div>');

  // Create event handler functions

  var handleTitleClick = function(event) {
    alert('The title of the page is: ' + event.target.innerText);
  };

  var renderFeed = function(event) {
    var oldFeedLength = $('div.tweet').length;
    var newFeedLength = streams.home.length;
    for (var i = oldFeedLength; i < newFeedLength; i++) {
      //adds tweet division container
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.prependTo($home_feed);
      //adds profile pic child element
      var $profile_pic = $('<img class="profile-photo">');
      $profile_pic.attr('src', tweet.profilePhotoURL);
      $profile_pic.appendTo($tweet);
      //adds username child element
      var $username = $('<span class="username"></span');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);
      //adds message child element
      var $message = $('<span class="message"></span>');
      $message.text(tweet.message);
      $message.appendTo($tweet);
      //adds timestamp child element
      var $timestamp = $('<span class="timestamp"></span>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);
      //adds comment icon
      var $comment = $('<i class="fas fa-comment icon comment"></i>');
      $comment.appendTo($tweet);
      //adds retweet icon
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      $retweet.appendTo($tweet);
      //adds like icon
      var $like = $('<i class="fas fa-heart icon like"></i>');
      $like.appendTo($tweet);
      //adds share iconr
      var $share = $('<i class="fas fa-share icon share"></i>');
      $share.appendTo($tweet);
    }
  };
  renderFeed(); //create initial home feed

  // Set event listeners

  $title.on('click', handleTitleClick);
  $update_feed_btn.on('click', renderFeed);

  // Append new HTML elements to the DOM

  $title.appendTo($app);
  $app.append($update_feed_btn);
  $app.append($home_feed);


 /* // Adds twiddler page heading
  var $title = $('<h1>twiddler<h1>');
  $title.appendTo($app);

  // Click event for heading
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of the page is: ' + event.target.innerText);
  });

  // Adds update feed button
  var $update_feed_btn = $('<button id="update-feed">update feed</button>');
  $app.append($update_feed_btn);

  // Adds home feed division for tweets
  var $home_feed = $('<div id="feed"></div>');
  $app.append($home_feed);


  //
  var renderFeed = function(event) {
    var oldFeedLength = $('div.tweet').length;
    var newFeedLength = streams.home.length;
    for (var i = oldFeedLength; i < newFeedLength; i++) {
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.prependTo($home_feed);
    }
  };

  // Adds initial tweets to home feed
  renderFeed();

  // Click event for update feed button
  $update_feed_btn.on('click', renderFeed);

*/});