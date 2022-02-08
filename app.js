$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Adds twiddler page heading
  var $title = $('<h1>twiddler<h1>');
  $title.appendTo($app);

  // Event handler function for title click
  var handleTitleClick = function(event) {
    alert('The title of the page is: ' + event.target.innerText);
  };

  // Event listener for title click
  $title.on('click', handleTitleClick);

  // Adds update feed button
  var $button = $('<button id="update-feed">update feed</button>');
  $app.append($button);

  // Adds home feed division for tweets
  var $home_feed = $('<div id="feed"></div>');
  $app.append($home_feed);

  // Event handler function for rendering feed
  var renderFeed = function(event, user) {
    //clears feed
    $home_feed.empty();
    //sets stream variable depending on presence of user argument
    var stream;
    user ? (stream = streams.users[user]) : (stream = streams.home);
    //iterates through stream
    for (var i = 0; i < stream.length; i++) {
      //tweet division container
      var tweet = stream[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.prependTo($home_feed);
      //profile pic child element
      var $profile_pic = $('<img class="profile-photo">');
      $profile_pic.attr('src', tweet.profilePhotoURL);
      //username child element
      var $username = $('<span class="username"></span');
      $username.text('@' + tweet.user);
      //message child element
      var $message = $('<span class="message"></span>');
      $message.text(tweet.message);
      //timestamp child element
      var $timestamp = $('<span class="timestamp"></span>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      //comment icon
      var $comment = $('<i class="fas fa-comment icon comment"></i>');
      //retweet icon
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      //like icon
      var $like = $('<i class="fas fa-heart icon like"></i>');
      //share icon
      var $share = $('<i class="fas fa-share icon share"></i>');
      //append tweet elements to tweet
      $tweet.append($profile_pic, $username, $message, $timestamp, $comment, $retweet, $like, $share);
    }
  };

  // Adds initial tweets to home feed
  renderFeed();

  // Event handler function for update feed/back button
  var handleButtonClick = function(event) {
    if ($button.text() === 'back') {
      $button.text('update feed');
    }
    renderFeed();
  };

  // Event listener for update feed/back button
  $button.on('click', handleButtonClick);

  // Event handler functions for icon hover
  var mouseOverIcon = function(event) {
    $(this).css('color', '#B99EF3');
  };
  var mouseOffIcon = function(event) {
    $('.icon').css('color', '#f7f5fa');
  };

  // Event listener functions for icon hover
  $home_feed.on('mouseenter', '.icon', mouseOverIcon);
  $home_feed.on('mouseleave', '.icon', mouseOffIcon);

  // Event handler function for username click
  var handleUsernameClick = function(event) {
    // changes button text to 'back' from 'update feed'
    $button.text('back');
    // renders user feed
    var user = $(this).text().slice(1);
    renderFeed(event, user);
  };

  // Event listener function for username click
  $home_feed.on('click', '.username', handleUsernameClick);

});