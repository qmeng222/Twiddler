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

  //Adds friend list
  var $friends_list_container = $('<div id="friends-list-container"></div>');
  $friends_list_container.append('<button id="friends-title">friends</button>');
  $container.append($friends_list_container);
  var $friends_list = $('<ul id="friends-list"></ul>');
  $friends_list_container.append($friends_list);
  for (var i = 0; i < window.users.length; i++) {
    var $friend = $('<li class="friend"></li>');
    $friend.text(window.users[i]);
    $friends_list.append($friend);
  }

  // Adds home feed division
  var $home_feed = $('<div id="feed"></div>');
  $container.append($home_feed);

  // Adds submit post container to home feed
  var $submit_post = $('<div id="submit-post"></div>');
  var $top_bar = $('<div class="top-bar">@</div>');
  $submit_post.append($top_bar);
  $home_feed.append($submit_post);

  // Adds new post form
  var $new_post_form = $('<form method="post" id="new-post-form"></form>');
  var $enter_username = $('<input type="text" name="username" id="enter-username">');
  var $enter_message = $('<input type="text" name="message" id="enter-message">');
  var $submit = $('<input type="submit" value="submit" id="submit">');
  $new_post_form.append($enter_username, $enter_message, $submit);
  $submit_post.append($new_post_form);

  // Adds tweet container to home feed
  var $tweet_container = $('<div id="tweet-container"></div>');
  $home_feed.append($tweet_container);

  // Event handler function for rendering feed
  var renderFeed = function(event, user) {
    //clears feed
    $tweet_container.empty();
    //sets stream variable depending on presence of user argument
    var stream;
    user ? (stream = streams.users[user]) : (stream = streams.home);
    //iterates through stream
    for (var i = 0; i < stream.length; i++) {
      //tweet division container
      var tweet = stream[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.prependTo($tweet_container);
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

  // Event handler function for new tweet submission
  var handleNewTweet = function(event) {
    event.preventDefault();
    var form_values = $('#new-post-form ').serializeArray();
    var tweet = {};
    tweet.user = form_values[0].value;
    tweet.message = form_values[1].value;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/visitor.png';
    streams.home.push(tweet);
    console.log(streams.home);
    renderFeed();
  };

  // Event listener function for new tweet submission
  $('#submit').on('click', handleNewTweet);

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
    var user = $(this).text();
    if (user[0] === '@') {
      user = user.slice(1);
    }
    renderFeed(event, user);
  };

  // Event listener function for username click
  $home_feed.on('click', '.username', handleUsernameClick);

  // Event listener function for username click within friends list
  $friends_list_container.on('click', 'li', handleUsernameClick);

  window.isItBeautifulYet = true

});