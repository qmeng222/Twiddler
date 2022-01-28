$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  $app.html('');

  // HTML Elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed"></button>');
  var $feed = $('<div id="feed"></div>');

  // Event Handler & Listener Functions
  $updateFeedButton.on("click", function() {
    $feed.html('');
    refreshFeed();
  });

  var handleUsernameClick = function (event) {
    var clickedUser = event.target.innerText.substring(1);
    $feed.html('');
    refreshFeed(clickedUser);
  }

  // refresh feed function
  var refreshFeed = function (selectUser) {
    if (selectUser === undefined) {
      var index = streams.home.length - 1;
      $updateFeedButton.text('Update Feed');
    } else {
      var index = streams.users[selectUser].length -1;
      $updateFeedButton.text('Back');
    }

    while(index >= 0){
      var tweet = selectUser ? streams.users[selectUser][index] : streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profileContainer = $('<div class="profile-container"></div>');
      var $tweetContentContainer = $('<div class="tweet-container"></div>');
      var $profilePhoto = $('<img class="profile-photo">');
      var $username = $('<div class="username"></div>');
      var $message = $('<div class="message"></div>');
      var $timeStamp = $('<div class="timestamp"></div>');
      var $icons = $('<div class="icon"></div>');
      var $iconComment = $('<i class="far fa-comment-dots comment"></i>');
      var $iconRetweet = $('<i class="fas fa-retweet retweet"></i>');
      var $iconLike = $('<i class="far fa-heart like"></i>');
      var $iconShare = $('<i class="far fa-share-square share"></i>');

      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $timeStamp.text(jQuery.timeago(tweet.created_at));

      $tweet.appendTo($feed);
      $profileContainer.appendTo($tweet);
      $tweetContentContainer.appendTo($tweet)
      $profilePhoto.appendTo($profileContainer);
      $username.appendTo($profileContainer);
      $timeStamp.appendTo($tweetContentContainer);
      $message.appendTo($tweetContentContainer);
      $icons.appendTo($tweetContentContainer);
      $iconComment.appendTo($icons);
      $iconRetweet.appendTo($icons);
      $iconLike.appendTo($icons);
      $iconShare.appendTo($icons);

      $username.on('click', handleUsernameClick);

      index -= 1;
    }
  };

  // Append HTML Element to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);
  refreshFeed();

  window.isItBeautifulYet = true;
});