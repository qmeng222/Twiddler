$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $topBar = $('<div id="header"></div>');
  var $title = $('<h1 id="main-title" class="top-bar">Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed" class="top-bar"><i class="fas fa-sync-alt"></i></button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var updateFeed = function() {
    $feed.html('');
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];

      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message"></p>');
      var $username = $('<span class="username"></span>');
      var $profilePhoto = $('<img class="profile-photo">');
      var $timestamp = $('<span class="timestamp"></span>');
      var $actionIconDiv = $('<div class="action-icons"></div>');
      var $comment = $('<i class="icon comment fas fa-comment">');//<i class="fas fa-reply"></i>
      var $retweet = $('<i class="icon retweet fas fa-retweet">');
      var $like = $('<i class="icon like fas fa-heart">');
      var $share = $('<i class="icon share fas fa-external-link-alt">');

      $message.text(tweet.message);
      $username.text('@' + tweet.user);
      $profilePhoto.attr("src", tweet.profilePhotoURL);
      $timestamp.text($.timeago(tweet.created_at));

      $tweet.append($profilePhoto)
            .append($username)
            .append($timestamp)
            .append($message)
            .append($comment)
            .append($retweet)
            .append($like)
            .append($share);

      console.log($timestamp[0].innerText);

      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
    $feed.appendTo($app);
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", function() {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  })
  $updateFeed.on("click", updateFeed);

  // Append new HTML elements to the DOM
  $topBar.append($title).append($updateFeed);
  $topBar.appendTo($app);

  // Function to update feed and add to $app
  updateFeed();

});