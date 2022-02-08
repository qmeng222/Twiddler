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
  var $update_feed_btn = $('<button id="update-feed">update feed</button>');
  $app.append($update_feed_btn);

  // Adds home feed division for tweets
  var $home_feed = $('<div id="feed"></div>');
  $app.append($home_feed);

  // Event handler function for rendering home or user feed
  var renderFeed = function(event, user) {
    //if no user input, renders home feed
    if (user === undefined) {
      var oldFeedLength = $('div.tweet').length;
      var newFeedLength = streams.home.length;
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
        var $comment = $('<i class="fas fa-comment icon comment" id="comment"></i>');
        $comment.appendTo($tweet);
        //adds retweet icon
        var $retweet = $('<i class="fas fa-retweet icon retweet" id="retweet"></i>');
        $retweet.appendTo($tweet);
        //adds like icon
        var $like = $('<i class="fas fa-heart icon like" id="like"></i>');
        $like.appendTo($tweet);
        //adds share iconr
        var $share = $('<i class="fas fa-share icon share" id="share"></i>');
        $share.appendTo($tweet);
      }
    //if user input given, render specific user feed
    } else {
      
    }
  };

  // Adds initial tweets to home feed
  renderFeed();

  // Event listener for update feed button
  $update_feed_btn.on('click', renderFeed);

  // Event handler functions for icon hover
  var mouseOverIcon = function(event) {
    //var icon = this.id;
    //console.log(icon);
    $('#' + this.id).css('color', '#B99EF3');
  };

  var mouseOffIcon = function(event) {
    $('.icon').css('color', '#f7f5fa');
  };

  // Event listener function for icon mouseover
  $('.icon').hover(mouseOverIcon, mouseOffIcon);

  // Event handler function for username click
  var handleUsernameClick = function(event) {
    // changes button text to 'back' from 'update feed'
    $update_feed_btn.text('back');
    // renders user feed
    renderFeed();
  };

  // Event listener function for username click
  $('.username').on('click', handleUsernameClick)

});

 /* // Select already existing elements

  // Create new HTML elements

  var $title = $('<h1>twiddler<h1>');
  var $update_feed_btn = $('<button id="update-feed">update feed</button>');
  var $home_feed = $('<div id="feed"></div>');

  // Create event handler functions

  var handleTitleClick = function(event) {
    alert('The title of the page is: ' + event.target.innerText);
  };

  var renderFeed = function(event, user) {
    //if no user input, renders home feed
    if (user === undefined) {
      var oldFeedLength = $('div.tweet').length;
      var newFeedLength = streams.home.length;
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
    //if user input given, render specific user feed
    } else {

    }
  };
  renderFeed(); //create initial home feed

  var handleUsernameClick = function(event) {
    $update_feed_btn.text(back);
    renderFeed(event, )
  };

  /*var mouseOverIcon = function(event) {
    $('.icon').css('color', 'blue');
  };

  var mouseOffIcon = function(event) {
    $('.icon').css('color', 'purple');
  };

  // Set event listeners
  $title.appendTo($app);
  $app.append($home_feed);

  $('h1').on('click', handleTitleClick);
  $update_feed_btn.on('click', renderFeed);
  $('.icon').on('click', function() {
    console.log('hi');
    $('.icon').css('color', 'blue');
  });

  // Append new HTML elements to the DOM

  $title.appendTo($app);
  $app.append($update_feed_btn);
  $app.append($home_feed);*/