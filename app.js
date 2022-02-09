$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1 id="title">Twiddler</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $aside = $('<div id="aside"></div>');
  var $tweet = $('<div class="tweet"></div>');
  var $username = ('<div id="username"></div>');
  var $photo;
  var $message;
  var $timestamp;
  var $icons;
  var $comment;
  var $retweet;
  var $like;
  var $share;

  // Create event handler functions
  var renderFeed = function(user){
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

  var renderUserFeed = function(user){
      username = user;
      $feed.html('');
      var index = streams.home.length - 1;
          while(index >= 0){
            var tweet = streams.home[index];
            var timestamp = jQuery.timeago(tweet['created_at']);
            var $tweet = createTweet(tweet.user, tweet.message, timestamp)
            if(tweet.user === username){
              $tweet.appendTo($feed);
            }

            index -= 1;
        }


  }

  var handleUsernameClick = function(username){
    $updateButton.text('Back');
    renderUserFeed(username)
  }

  var createTweet = function(user, message, timestamp){
    $tweet = $('<div class="tweet"></div>');
    $photo = $('<img class="profile-photo" src="file:///Users/ianhoffman/precourse/seip2202-twiddler/assets/img/'+user+'.png"></img>');
    $username = $('<div class="username">@' + user + '</div>');
    $message = $('<div class="message">' + message + '</div>');
    $timestamp = $('<div class="timestamp">'+timestamp+'</div>');
    $icons = $('<div class = "icons"></div>');
    $comment = $('<i class="fa-solid fa-comments fa-sm icon comment"></i>');
    $retweet = $('<i class="fa-solid fa-retweet fa-sm retweet"></i>');
    $like = $('<i class="fa-solid fa-heart fa-sm like"></i>');
    $share = $('<i class="fa-solid fa-share fa-sm share"></i>');

    var username = user;
    $username.on("click", function(event){
      handleUsernameClick(username);
    });

    $photo.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $icons.appendTo($tweet);
    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);
    $timestamp.appendTo($tweet);

    return $tweet;
  }
  // Set event listeners (providing appropriate handlers as input)
  $updateButton.on("click", function(event){
    $updateButton.text('Update Feed');
    renderFeed(event)
  });

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });




  // Append new HTML elements to the DOM
  //Append to app
  $title.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);

  //This function call initializes the page on startup
  renderFeed();

  window.isItBeautifulYet = true;

});
