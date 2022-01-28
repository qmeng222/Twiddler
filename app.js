$(document).ready(function() {
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $feedDiv = $('<div id="feed"></div>');
  var $updateBtn = $('<button type="button" id="update-feed">Update Feed</button>');
  var $title = $('<h1>Twiddler</h1>');

  // Create event handler functions
  function renderFeed () {
    $feedDiv.html('');
    var streamsLength = streams.home.length - 1;
    while(streamsLength >= 0){
      var tweet = streams.home[streamsLength];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo">');
      var $userName = $('<span class="username"></span>');
      var $message = $('<span class="message"></span>');
      var $timeStamp = $('<span class="timestamp"></span>');
      var $commentImg = $('<img class="icon comment">');
      var $retweetImg = $('<img class="icon retweet">');
      var $likeImg = $('<img class="icon like">');
      var $shareImg = $('<img class="icon share">');

      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $userName.text('@' + tweet.user);
      $message.text(tweet.message);
      $timeStamp.text(tweet.created_at);
      $('.icon').attr('src', '/assets/icons/placeholder.png');

      //$tweet.text('@' + tweet.user + ': ' + tweet.message);
      $profilePhoto.appendTo($tweet);
      $userName.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $commentImg.appendTo($tweet);
      $retweetImg.appendTo($tweet);
      $likeImg.appendTo($tweet);
      $shareImg.appendTo($tweet);
      $tweet.appendTo($feedDiv);
      streamsLength -= 1;
    }
  };

  // Set event listeners (providing appropriate handlers as inputs)
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
    });

  $updateBtn.on("click", renderFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateBtn.appendTo($app);
  $feedDiv.appendTo($app);

  renderFeed();
});