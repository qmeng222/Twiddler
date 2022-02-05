$(document).ready(function() {
  var $app = $('#app');
  var $title = $('<h1>twiddler</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $currentFeed = $('<div id="feed"></div>');

  var renderFeed = function(user) {

    $('#feed').empty();
    var feedSource = streams.home;

    if (user) {
      feedSource = streams.users[user];
    };

    var index = feedSource.length - 1;

    while(index >= 0) {
      var tweet = feedSource[index];
      var $icons = $('<div class="icon-holder"></div>');
      var $tweet = $('<div class="tweet"></div>');
      var $userImg = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '" alt="Picture of Twiddler user">');
      var $user = $('<span class="username">@' + tweet.user + '</span>');
      var $timePosted = $('<span class="timestamp">' + $.timeago(tweet.created_at) + '</span>');
      var $text = $('<p class="message">' + tweet.message + '</p>');
      var $commentImg = $('<i class="icon comment far fa-comment-alt"></i>');
      var $retweetImg = $('<i class="icon retweet fas fa-retweet"></i>');
      var $likeImg = $('<i class="icon like far fa-thumbs-up"></i>');
      var $shareImg = $('<i class="icon share far fa-share-square"></i>');
      $userImg.appendTo($tweet);
      $text.appendTo($tweet);
      $timePosted.appendTo($tweet);
      $user.appendTo($tweet);
      $commentImg.appendTo($icons);
      $retweetImg.appendTo($icons);
      $likeImg.appendTo($icons);
      $shareImg.appendTo($icons);
      $icons.appendTo($tweet);
      $tweet.appendTo($currentFeed);
      index -= 1;
    }
  };

  var feedRefresh = function() {
    renderFeed();
    if ($('#update-feed').text() === 'Back') {
      $('#update-feed').text('Update Feed');
    }
  };

  var handleUsernameClick = function() {
    var user = (($(this).text()).substring(1));
    renderFeed(user);
    if ($('#update-feed').text() === 'Update Feed') {
      $('#update-feed').text('Back');
    }
  };

  $title.on('click', feedRefresh);

  $updateButton.on('click', feedRefresh);

  $app.on('click', '.username', handleUsernameClick);

  $app.on({
    mouseenter: function() {
    $(this).css('color', '#07f');
    },
    mouseleave: function() {
      $(this).css('color', 'black');
    }
   }, 'i.icon');

  $app.html('');
  renderFeed();
  $title.appendTo($app);
  $updateButton.appendTo($app);
  $currentFeed.appendTo($app);

  window.isItBeautifulYet = true;
});