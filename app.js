$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');

  // Create event handler functions
  $title.on("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  var renderFeed = function() {
    $($feed).html('');
    var index = streams.home.length - 1;

    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $userPhoto = $('<img class="profile-photo">');
      var $username = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<span class="timestamp"></span>');
      var $commentIcon = $('<img class="icon comment" src="assets/icons/placeholder.png">');
      var $retweetIcon = $('<img class="icon retweet" src="assets/icons/placeholder.png">');
      var $likeIcon = $('<img class="icon like" src="assets/icons/placeholder.png">');
      var $shareIcon = $('<img class="icon share" src="assets/icons/placeholder.png">');

      $($userPhoto).attr('src', `${tweet.profilePhotoURL}`);
      $username.text(`@${tweet.user}`);
      $username.text(`@${tweet.user}`);
      $message.text(`${tweet.message}`);
      $timestamp.text(`${tweet.created_at}`);

      $tweet.appendTo($feed);
      $userPhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);

      index -= 1;
    }
  };

  // Set event listeners (providing appropriate handlers as input)
  renderFeed();
  $updateFeed.on("click", renderFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $feed.appendTo($app);
  $updateFeed.appendTo($app);

});