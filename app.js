$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  jQuery.timeago.settings.allowFuture = true;

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');

  // Create event handler functions
  $title.on('click', function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  var renderFeed = function(username) {
    $($feed).html('');
    var index = streams.home.length - 1;

    while(index >= 0){
      var tweet = streams.home[index];

      var $tweet = $('<div class="tweet"></div>');
      var $userPhoto = $('<img class="profile-photo">');
      var $username = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<span class="timestamp"></span>');
      var $commentIcon = $('<i class="icon comment fas fa-comment"></i>');
      var $retweetIcon = $('<i class="icon retweet fas fa-share"></i>');
      var $likeIcon = $('<i class="icon like fas fa-heart"></i>');
      var $shareIcon = $('<i class="icon share fas fa-share-alt"></i>');


      $($userPhoto).attr('src', `${tweet.profilePhotoURL}`);
      $username.text(`@${tweet.user}`);
      $username.text(`@${tweet.user}`);
      $message.text(`${tweet.message}`);
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var appendTweetUnits = function() {
        $tweet.appendTo($feed);
        $userPhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $commentIcon.appendTo($tweet);
        $retweetIcon.appendTo($tweet);
        $likeIcon.appendTo($tweet);
        $shareIcon.appendTo($tweet);
      }

      if (typeof username === 'string') {
        if (username === `@${tweet.user}`) {
          appendTweetUnits();
        }
      } else {
        appendTweetUnits();
      }

      index -= 1;
    }
  };

  var handleUsernameClick = function(event) {
    $updateFeed.text('Back');
    return renderFeed(event.target.innerText);
  }

  // Set event listeners (providing appropriate handlers as input)
  renderFeed();
  $updateFeed.on('click', function(event) {
    $updateFeed.text('Update Feed');
    return renderFeed();
  });

  $($feed).on('click', '.username', function(event) {
    return handleUsernameClick(event);
  });


  /*$($feed).on('click', '.username', function(event) {
    $updateFeed.text('Back');
    return renderFeed(event.target.innerText);
  });*/



  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $feed.appendTo($app);
  $updateFeed.appendTo($app);

  //Trigger: click on a username
  //I: a string (username)
  //O: a feed with only the tweets from that username

  //Strategy: if there is a click on an element with a class username (event listener)
  //modify renderFeed so that it filters the tweets which are appended to the feed
  //with only the ones of that username

  //Get the elements with a class of username and save it in a jQuery var
  //Set an event listener on click on that var, create a handler function
    //Return renderFeed with the username as an argument (event.target.innerText)
  //Add a parameter of username inside renderfeed
    //If username
      //Filter the tweets with only the ones of that username
    // Else
      // Get all the tweets

});