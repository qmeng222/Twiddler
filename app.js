$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1 id="title">Twiddler</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $aside = $('<div id="aside"></div>');

  // Create event handler functions
  var renderFeed = function(event){
    $feed.html('');
    var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        var timestamp = jQuery.timeago(tweet['created_at']);
        var $tweet = createTweet(tweet.user, tweet.message, timestamp)
        $tweet.appendTo($feed);
        index -= 1;
      }
  }

  var createTweet = function(user, message, timestamp){
    var $tweet = $('<div class="tweet"></div>');
    var $photo = $('<img class="profile-photo" src="file:///Users/ianhoffman/precourse/seip2202-twiddler/assets/img/'+user+'.png"></img>');
    var $username = $('<span class="username">@' + user + '</span>');
    var $message = $('<span class="message">: ' + message + '</span>');
    var $timestamp = $('<span class="timestamp">'+timestamp+'</span>');
    var $icons = $('<div class = "icons"></div>');
    var $comment = $('<i class="fa-solid fa-comments fa-sm icon comment"></i>');
    var $retweet = $('<i class="fa-solid fa-retweet fa-sm retweet"></i>');
    var $like = $('<i class="fa-solid fa-heart fa-sm like"></i>');
    var $share = $('<i class="fa-solid fa-share fa-sm share"></i>');


    $photo.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $icons.appendTo($tweet);
    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);

    return $tweet;



  }
  // Set event listeners (providing appropriate handlers as input)
  $updateButton.on("click", function(event){renderFeed(event)});

  // Append new HTML elements to the DOM
  //Append to app
  $title.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);

  //This function call initializes the page on startup
  renderFeed();

});
