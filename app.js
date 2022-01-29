$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  var renderFeed = function(array) {
    var index = streams.home.length - 1;
    while(index >= 0){

      // Create new HTML elements
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src=""></img');
      var $userName = $('<div class="username"></div>');
      var $message = $('<div class ="message"></div>');
      var $timeStamp = $('<div class="timestamp"></div>');
      var $comment = $('<i class="icon comment far fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like far fa-heart"></i>');
      var $share = $('<i class="icon share far fa-share-square"></i>');

      // Select already existing elements
      $userName.text('@' + tweet.user);
      $message.text(tweet.message);
      $timeStamp.text(jQuery.timeago(new Date(tweet.created_at)));


      // Append new HTML elements to the DOM
      $profilePhoto.appendTo($tweet);
      $userName.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }
  }

  renderFeed();

  // Create event handler functions
  var handleTitleClick = $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  $button.on('click', function(event) {
    $('#feed').empty();
    renderFeed();
  });

  // Set event listeners (providing appropriate handlers as input)

  // Append new HTML elements to the DOM
  $app.html('');
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

});


