$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $header = $('<div class="header"></div>');
  var $title = $('<h1>Twiddler</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');


  // Create event handler functions

  var alertTitle = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  };

  var renderFeed = function(user) {
    if (user) {
      getUserTweets(user);
    } else {
      getTweets();
    }
  }

  var getTweets = function(){
    var index = streams.home.length - 1;

    while(index >= 0){
      // Access Tweets
      var tweet = streams.home[index];

      // Create new HTML elements
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message">' + tweet.message + '<br>' + '</p>');
      var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
      var $photo = $('<img class="profile-photo" src="./assets/img/' + tweet.user + '.png"></img>');
      var $timestamp = $('<p class="timestamp">' + jQuery.timeago(tweet.created_at) + '</p>');
      var $like = $('<i class="fa fa-solid fa-heart like"></i>');
      var $comment = $('<i class="fa fa-solid fa-comments comment"></i>');
      var $share = $('<i class="fa fa-solid fa-arrow-up-right-from-square share"></i>');
      var $retweet = $('<i class="fa fa-solid fa-retweet retweet"></i>');

     // Append new HTML elements to the Tweet
     $photo.appendTo($tweet);
     $username.appendTo($tweet);
     $message.appendTo($tweet);
     $timestamp.appendTo($tweet);
     $comment.appendTo($tweet);
     $retweet.appendTo($tweet);
     $like.appendTo($tweet);
     $share.appendTo($tweet);

      // Append Tweet to Feed
      $tweet.appendTo($feed);

      index -= 1;
    }
  };

  var getUserTweets = function(username){
    var index = streams.users[username].length - 1;

    while(index >= 0){
      // Access User Tweets
      var tweet = streams.users[username][index];

      // Create new HTML elements
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message">' + tweet.message + '<br>' + '</p>');
      var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
      var $photo = $('<img class="profile-photo" src="./assets/img/' + tweet.user + '.png"></img>');
      var $timestamp = $('<p class="timestamp">' + jQuery.timeago(tweet.created_at) + '</p>');
      var $like = $('<i class="fa fa-solid fa-heart like"></i>');
      var $comment = $('<i class="fa fa-solid fa-comments comment"></i>');
      var $share = $('<i class="fa fa-solid fa-arrow-up-right-from-square share"></i>');
      var $retweet = $('<i class="fa fa-solid fa-retweet retweet"></i>');

     // Append new HTML elements to the Tweet
     $photo.appendTo($tweet);
     $username.appendTo($tweet);
     $message.appendTo($tweet);
     $timestamp.appendTo($tweet);
     $comment.appendTo($tweet);
     $retweet.appendTo($tweet);
     $like.appendTo($tweet);
     $share.appendTo($tweet);

     // Append Tweet to Feed
     $tweet.appendTo($feed);

     index -= 1;

      index -= 1;
    }
  };

  var flipButtonText = function(){
    if ($updateButton.text() === 'Back'){
      $updateButton.text('Update Feed');
    }

    $feed.html('');
    renderFeed();
  };

  // Set event listeners (providing appropriate handlers as input)
  $updateButton.on('click', function(){
    flipButtonText();
  });

  $title.on('click', function(event){
    alertTitle(event);
  });

  $feed.on('click', '.username', function(event) {
    var user = event.target.innerText;
    var username = user.slice(1);

    $updateButton.text('Back');
    $feed.html('');
    renderFeed(username);
  });

  // Append new HTML elements to the DOM
  $header.appendTo($app);
  $title.appendTo($header);
  $updateButton.appendTo($app);
  $feed.appendTo($app);

  renderFeed();
});
window.isItBeautifulYet = true
