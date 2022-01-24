$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  jQuery.timeago.settings.allowFuture = true;

  // Create new HTML elements
  var $rightBanner = $('<aside class="col-1-3"></aside>');
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed" class="col-2-3"></div>');
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
      var $timestamp = $('<span class="timestamp"></span>');
      var $username = $('<span class="username"></span>');
      var $message = $('<br><p class="message"></p>');
      var $social = $('<section class="social"></section>');
      var $commentIcon = $('<i class="icon comment fas fa-comment"></i>');
      var $retweetIcon = $('<i class="icon retweet fas fa-share"></i>');
      var $likeIcon = $('<i class="icon like fas fa-heart"></i>');
      var $shareIcon = $('<i class="icon share fas fa-share-alt"></i>');


      $($userPhoto).attr('src', `${tweet.profilePhotoURL}`);
      $username.text(`@${tweet.user}`);
      $message.text(`${tweet.message}`);
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var appendTweetUnits = function() {
        $tweet.appendTo($feed);
        $userPhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $message.appendTo($tweet);
        $social.appendTo($tweet)
        $shareIcon.appendTo($social);
        $likeIcon.appendTo($social);
        $retweetIcon.appendTo($social);
        $commentIcon.appendTo($social);
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


  // Append new HTML elements to the DOM
  $rightBanner.appendTo($app);
  $title.appendTo($rightBanner);
  $feed.appendTo($app);
  $updateFeed.appendTo($rightBanner);

  window.isItBeautifulYet = true

});