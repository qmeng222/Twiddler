$(document).ready(function(){
  //select already existing elements
  var $app = $('#app');
  $app.html('');

  //create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"><div>');

  //create event handler functions
  var getUser = function(inputName) {
    var userStream = streams.users[inputName];
    return userStream;
  };

  var renderFeed = function(user) {
    $("#feed").empty();

    if (user === undefined) {
      var homeIndex = streams.home.length - 1;
      while(homeIndex >= 0){
        var tweet = streams.home[homeIndex];
        var $tweet = $('<div class="tweet"></div>');
        // $tweet.text('@' + tweet.user + ': ' + tweet.message);

        //create new HTML elements
        var $profilePhoto = $('<img class="profile-photo" alt="profile-photo">');
        var $username = $('<span class="username"></span>');
        var $message = $('<span class="message"></span>');
        var $timestamp = $('<span class="timestamp"></span>');
        var $iconContainer = $('<div class="icon-container"></div>');
        var $comment = $('<i class="icon comment far fa-comments"></i>');
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share fas fa-share"></i>');

        //content
        $profilePhoto.attr("src", tweet.profilePhotoURL);
        $username.text('@' + tweet.user + ': ');
        $message.text(tweet.message);
        $timestamp.text($.timeago(tweet.created_at));
        $comment.attr("src", './assets/icons/placeholder.png')
        $retweet.attr("src", './assets/icons/placeholder.png')
        $like.attr("src", './assets/icons/placeholder.png')
        $share.attr("src", './assets/icons/placeholder.png')

        //appends
        $profilePhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $comment.appendTo($iconContainer);
        $retweet.appendTo($iconContainer);
        $like.appendTo($iconContainer);
        $share.appendTo($iconContainer);
        $iconContainer.appendTo($tweet);

        $tweet.appendTo($feed);

        //event handlers
        var handleUsernameClick = function() {
          var clickedName = $(this).text().slice(1,-2);
          if ($button.text() === 'Update Feed') {
            $button.text('Back');
          }
          renderFeed(clickedName);
        };

        var handleMouseOver = function() {
          $(this).css("color", "lime");
        };

        var handleMouseOut = function() {
          $(this).css("color", "white");
        };

        //event listeners
        $("i").hover(handleMouseOver, handleMouseOut);
        // $("i").on("mouseover", handleMouseOver);
        // $("i").on("mouseout", handleMouseOut);
        $username.on('click', handleUsernameClick);

        homeIndex -= 1;
      }
    } else {
      var userStream = getUser(user);
      var userIndex = userStream.length - 1;
      while(userIndex >= 0){
        var tweet = userStream[userIndex];
        var $tweet = $('<div class="tweet"></div>');
        // $tweet.text('@' + tweet.user + ': ' + tweet.message);

        //create new HTML elements
        var $profilePhoto = $('<img class="profile-photo" alt="profile-photo">');
        var $username = $('<span class="username"></span>');
        var $message = $('<span class="message"></span>');
        var $timestamp = $('<span class="timestamp"></span>');
        var $iconContainer = $('<div class="icon-container"></div>');
        var $comment = $('<i class="icon comment far fa-comments"></i>');
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share fas fa-share"></i>');

        //content
        $profilePhoto.attr("src", tweet.profilePhotoURL);
        $username.text('@' + tweet.user + ': ');
        $message.text(tweet.message);
        $timestamp.text($.timeago(tweet.created_at));
        $comment.attr("src", './assets/icons/placeholder.png')
        $retweet.attr("src", './assets/icons/placeholder.png')
        $like.attr("src", './assets/icons/placeholder.png')
        $share.attr("src", './assets/icons/placeholder.png')

        //appends
        $profilePhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $comment.appendTo($iconContainer);
        $retweet.appendTo($iconContainer);
        $like.appendTo($iconContainer);
        $share.appendTo($iconContainer);
        $iconContainer.appendTo($tweet);

        $tweet.appendTo($feed);

        //event handlers
        var handleMouseOver = function() {
          $(this).css("color", "lime");
        };

        var handleMouseOut = function() {
          $(this).css("color", "white");
        };

        //event listeners
        $("i").hover(handleMouseOver, handleMouseOut);
        // $("i").on("mouseover", handleMouseOver);
        // $("i").on("mouseout", handleMouseOut);

        userIndex -= 1;
      }
    }
  };

  //append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  //set event listeners
  // $('#update-feed').on('click', renderFeed);
  $button.on('click', function(event) {
    if ($button.text() === 'Back') {
      $button.text('Update Feed');
    }
    renderFeed();
  });

  renderFeed();

  window.isItBeautifulYet = true
});