$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  jQuery.timeago.settings.allowFuture = true;

  // Create new HTML elements
  var $leftBanner = $('<aside class="col-1-3"></aside>');
  var $title = $('<h1>Twiddler</h1>');
  var $rightCol = $('<div class="col-2-3"></div>');
  var $topBanner = $('<div class="top-banner"></div>');
  var $feed = $('<div id="feed"></div>');
  var $homeButton = $('<a href="index.html"><button class="btn main-btn">Home</button></a>');
  var $updateFeed = $('<button id="update-feed" class="btn main-btn">Update Feed</button>');
  var $friendsList = $('<ul id="friends-list" class="top-banner-item">My Friends</ul>');

  var $newTweetForm = $('<form id="new-tweet-form" class="top-banner-item" action="#" onsubmit="return false"></form>');
  var $usernameLabel = $('<label for="username">Username</label>');
  var $username = $('<input type="text" name="username" id="username" required>');
  var $message = $('<input type="text" name="message" id="message" required>');
  var $messageLabel = $('<label for="message">Write your message</label>');
  var $submitNewTweetForm = $('<input type="submit" name="submit" value="Post" class="btn">');

  var updateFriendsList = function() {
    for (var user in streams.users) {
      var $friend = $('<li class="friend"></li>');
      $friend.text(`@${user}`);
      $friend.appendTo($friendsList);
    }
  }

  updateFriendsList();

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
  };

  var saveNewTweet = function() {
    var tweetComponents = {
      user: username.value,
      message: message.value,
      created_at: new Date(),
      profilePhotoURL: `./assets/img/${username.value}.png` || './assets/img/visitor.png'
    }

    if (!streams.users[username.value]) {
      streams.users[username.value] = [];
    }

    streams.users[username.value].push(tweetComponents);
    streams.home.push(tweetComponents);
    renderFeed();
    return false;
  };

  // Set event listeners (providing appropriate handlers as input)
  renderFeed();
  $updateFeed.on('click', function(event) {
    $updateFeed.text('Update Feed');
    return renderFeed();
  });

  $($feed).on('click', '.username', function(event) {
    return handleUsernameClick(event);
  });

  $($friendsList).on('click', '.friend', function(event) {
    return handleUsernameClick(event);
  });

  $($submitNewTweetForm).on('click', saveNewTweet);


  // Append new HTML elements to the DOM
  $leftBanner.appendTo($app);
  $rightCol.appendTo($app);

  $title.appendTo($leftBanner);
  $homeButton.appendTo($leftBanner);
  $updateFeed.appendTo($leftBanner);

  $topBanner.appendTo($rightCol);
  $feed.appendTo($rightCol);

  $newTweetForm.appendTo($topBanner);
  $friendsList.appendTo($topBanner);

  $usernameLabel.appendTo($newTweetForm);
  $username.appendTo($newTweetForm);
  $messageLabel.appendTo($newTweetForm);
  $message.appendTo($newTweetForm);
  $submitNewTweetForm.appendTo($newTweetForm);

  window.isItBeautifulYet = true;

});