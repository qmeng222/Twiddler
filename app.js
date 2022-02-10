$(document).ready(function(){
  // Select already existing app element
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title      = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed       = $('<div id="feed"></div>');

  // Append static elements to the page (DOM)
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  // Create helper function for loading the feed
  var renderFeed = function(user) {
    if (!user) {
      index = streams.home.length - 1;
    } else {
      index = streams.users[user].length - 1;
    }

    while (index >= 0) {
      if (!user) {
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[user][index];
      }

      // Create new HTML elements
      var $tweet          = $('<div class="tweet"></div>');
      var $profilePhoto   = $('<img class="profile-photo">');
      var $username       = $('<div class="username"></div>');
      var $message        = $('<div class="message"></div>');
      var $timestamp      = $('<div class="timestamp"></div>');
      var $iconContainer  = $('<div class="icons"></div>');
      var $iconComment    = $('<i class="icon comment far fa-comment">');
      var $iconRetweet    = $('<i class="icon retweet far fa-share-square"></i>');
      var $iconLike       = $('<i class="icon like far fa-thumbs-up">');
      var $iconShare      = $('<i class="icon share far fa-heart">');

      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $timestamp.text(jQuery.timeago(tweet.created_at));

      // Append elements to the page (DOM)
      $tweet.appendTo($feed);
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $iconContainer.appendTo($tweet);
      $iconComment.appendTo($iconContainer);
      $iconRetweet.appendTo($iconContainer);
      $iconLike.appendTo($iconContainer);
      $iconShare.appendTo($iconContainer);

      index -= 1;
    }
  };

  renderFeed();

  // Create event handler functions
  var handleBtnClick = function(event) {
    $feed.html('');
    renderFeed();
    $updateFeed.text('Update Feed');
  }

  var handleUsernameClick = function(event) {
    var user = $(this).text().slice(1);
    $updateFeed.text('Back');
    $feed.html('');
    renderFeed(user);
  }

  // Set event listeners
  $updateFeed.on('click', handleBtnClick);
  $feed.on('click', ".tweet .username", handleUsernameClick);

  window.isItBeautifulYet = true
});

