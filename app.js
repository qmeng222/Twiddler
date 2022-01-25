$(document).ready(function(){
  var $app = $('#app');

  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedBtn = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  var createTweet = function(data) {
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class="profile-photo"/>');
    var $contentContainer = $('<div class="tweet-content"></div>');

    var $tweetHeader = $('<div class="tweet-header"></div>');
    var $name = $('<span class="twiddler-name"></span>');
    var $userName = $('<span class="username"></span>');
    var $timeStamp = $('<span class="timestamp"></span>');

    var $messageContainer = $('<div class="message-container"></div>');
    var $message = $('<p class="message"></p>');

    var $tweetIconsContainer = $('<div class="tweet-icons-container"></div>');
    var $commentIcon = $('<img class="icon comment" />');
    var $retweetIcon = $('<img class="icon retweet" />');
    var $likeIcon = $('<img class="icon like" />');
    var $shareIcon = $('<img class="icon share" />');

    var iconsArr = [$commentIcon, $retweetIcon, $likeIcon, $shareIcon];
    for (var i = 0; i < iconsArr.length; i++) {
      $(iconsArr[i]).attr('src', './assets/icons/placeholder.png');
    }

    $($profilePhoto).attr('src', data.profilePhotoURL);
    $($profilePhoto).attr('alt', 'User ' + data.user);
    $($message).text(data.message);

    $name.text(data.user);
    $userName.text('@' + data.user);
    $timeStamp.text(data.created_at);

    $profilePhoto.appendTo($tweet);
    $contentContainer.appendTo($tweet);
    $tweetHeader.append($name).append(' ').append($userName).append(' * ').append($timeStamp);
    $tweetHeader.appendTo($contentContainer);
    $message.appendTo($messageContainer);
    $messageContainer.appendTo($contentContainer);
    $commentIcon.appendTo($tweetIconsContainer);
    $retweetIcon.appendTo($tweetIconsContainer);
    $likeIcon.appendTo($tweetIconsContainer);
    $shareIcon.appendTo($tweetIconsContainer);
    $tweetIconsContainer.appendTo($contentContainer);

    return $tweet;
  }

  var renderFeed = function() {
    $('#feed').empty();
    for (var i = streams.home.length - 1; i >= 0; i--) {
      var tweet = streams.home[i];
      var $tweet = createTweet(tweet);
      $tweet.appendTo('#feed');
    }
  };

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $($updateFeedBtn).on('click', renderFeed);

  $app.html('');
  $title.appendTo($app);
  $updateFeedBtn.appendTo($app);
  $($feed).appendTo($app);

  renderFeed();

});