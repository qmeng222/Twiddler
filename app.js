$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Adds twiddler page heading
  var $title = $('<h1>twiddler<h1>');
  $title.appendTo($app);

  // Adds content container
  var $container = $('<div id="content"></div>');
  $app.append($container);

  // Event handler function for title click
  var handleTitleClick = function(event) {
    location.reload();
  };

  // Event listener for title click
  $title.on('click', handleTitleClick);

  // Adds update feed button
  var $button = $('<button id="update-feed">update feed</button>');
  $container.append($button);

  // Adds home feed division for tweets
  var $home_feed = $('<div id="feed"></div>');
  $container.append($home_feed);

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
      //top bar container
      var $top_bar = $('<div class="top-bar"></div>');
      //icon container
      var $icon_container = $('<div class="icon-container"></div>');
      $icon_container.prepend($('<hr>'));
      //profile pic in image container
      var $image_container = $('<div class="image-container"></div>');
      var $profile_pic = $('<img class="profile-photo">');
      $profile_pic.attr('src', tweet.profilePhotoURL);
      $image_container.append($profile_pic);
      //username child element
      var $username = $('<span class="username"></span');
      $username.text('@' + tweet.user);
      //message child element
      var $message = $('<span class="message"></span>');
      $message.text(tweet.message);
      //timestamp child element
      var $timestamp = $('<span class="timestamp"></span>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      //comment icon in icon container
      var $comment = $('<i class="fas fa-comment fa-lg icon comment"></i>');
      $icon_container.append($comment, $('<hr>'));
      //retweet icon in icon container
      var $retweet = $('<i class="fas fa-retweet fa-lg icon retweet"></i>');
      $icon_container.append($retweet, $('<hr>'));
      //like icon in icon container
      var $like = $('<i class="fas fa-heart fa-lg icon like"></i>');
      $icon_container.append($like, $('<hr>'));
      //share icon in icon container
      var $share = $('<i class="fas fa-share fa-lg icon share"></i>');
      $icon_container.append($share);
      //append icons and username to top bar
      $top_bar.append($username, $icon_container);
      //append tweet elements to tweet
      $tweet.append($image_container, $top_bar, $message, $timestamp);
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