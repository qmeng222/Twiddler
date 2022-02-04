$(document).ready(function() {
  var $app = $('#app');
  var $title = $('<h1>Twiddler</h1>');
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
      $user.appendTo($tweet);
      $timePosted.appendTo($tweet);
      $text.appendTo($tweet);
      $commentImg.appendTo($tweet);
      $retweetImg.appendTo($tweet);
      $likeImg.appendTo($tweet);
      $shareImg.appendTo($tweet);
      $tweet.appendTo($currentFeed);
      index -= 1;
    }
  };

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  $updateButton.on('click', function() {
    $('#update-feed').text('Update Feed');
    renderFeed();
  });

  $app.on({
    mouseenter: function() {
    $(this).css('color', 'blue');
    },
    mouseleave: function() {
      $(this).css('color', 'yellow');
    }
   }, 'i.icon');

   $app.on('click', '.username', function() {
     var user = (($(this).text()).substring(1));
     renderFeed(user);
     $('#update-feed').text('Back');
   });

  $app.html('');
  renderFeed();
  $title.appendTo($app);
  $updateButton.appendTo($app);
  $currentFeed.appendTo($app);
});