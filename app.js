$(document).ready(function () {

  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function (event, user) {
    $feed.html('');
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      if (user !== undefined) {
        $updateFeedButton.text('Back to Home');
        var username = user.substring(1, user.length);
        if (username !== tweet.user) {
          index -= 1;
          continue;
        }
      }

      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/visitor.png">');
      var $username = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<div class="timeago timestamp"></div>');
      var $commentIcon = $('<i class="fas fa-comment comment icon"></i>');
      var $retweetIcon = $('<i class="fas fa-retweet retweet icon"></i>');
      var $likeIcon = $('<i class="fas fa-thumbs-up like icon"></i>');
      var $shareIcon = $('<i class="fas fa-share share icon"></i>');
      var $iconRow = $('<div class="iconrow"></div');

      if (tweet.user === 'sharksforcheap') {
        $profilePhoto.attr("src", "assets/img/sharksforcheap.png");
      } else if (tweet.user === 'mracus') {
        $profilePhoto.attr("src", "assets/img/mracus.png");
      } else if (tweet.user === 'shawndrost') {
        $profilePhoto.attr("src", "assets/img/shawndrost.png");
      } else if (tweet.user === 'douglascalhoun') {
        $profilePhoto.attr("src", "assets/img/douglascalhoun.png");
      }
      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $timestamp.text(jQuery.timeago(tweet.created_at.toISOString()));

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $commentIcon.appendTo($iconRow);
      $retweetIcon.appendTo($iconRow);
      $likeIcon.appendTo($iconRow);
      $shareIcon.appendTo($iconRow);
      $iconRow.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }
  };

  var titleClick = function (event) {
    alert('The title of this page is: ' + event.target.innerText);
  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", titleClick);
  $updateFeedButton.on("click", function () {
    $updateFeedButton.text('Update Feed');
    renderFeed();
  });

  $feed.on("click", ".username", function () {
    var user = $(this).text();
    renderFeed(event, user);
  });

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);

  renderFeed();



});

window.isItBeautifulYet = true;