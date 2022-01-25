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
    var $commentIcon = $('<i class="far fa-comment icon comment"></i>');
    var $retweetIcon = $('<i class="fas fa-redo icon retweet"></i>');
    var $likeIcon = $('<i class="far fa-heart icon like"></i>');
    var $shareIcon = $('<i class="far fa-share-square icon share"></i>');

    var iconsArr = [$commentIcon, $retweetIcon, $likeIcon, $shareIcon];
    // activeClrBg stands for Active color background
    var iconColors = [
      {defaultClr: 'rgb(83, 100, 113)', defaultClrBg: '#fff', activeClrIcon: 'rgb(29, 155, 240)', activeClrBg: 'rgba(29, 155, 240, 0.1)'},
      {defaultClr: 'rgb(83, 100, 113)', defaultClrBg: '#fff', activeClrIcon: 'rgb(0, 186, 124)', activeClrBg: 'rgba(0, 186, 124, 0.1)'},
      {defaultClr: 'rgb(83, 100, 113)', defaultClrBg: '#fff', activeClrIcon: 'rgb(249, 24, 128)', activeClrBg: 'rgba(249, 24, 128, 0.1)'},
      {defaultClr: 'rgb(83, 100, 113)', defaultClrBg: '#fff', activeClrIcon: 'rgb(29, 155, 240)', activeClrBg: 'rgba(29, 155, 240, 0.1)'}
    ]
    for (var i = 0; i < iconsArr.length; i++) {
      $(iconsArr[i]).attr('src', './assets/icons/placeholder.png');

      (function(i) {
        var $iconContainer = $('<div class="icon-container"></div>');

        $($iconContainer).hover(function(){
          $($iconContainer).css('background-color', iconColors[i].activeClrBg);
          $(iconsArr[i]).css('color', iconColors[i].activeClrIcon);
          $($iconContainer).css('cursor', 'pointer');
        }, function() {
          $($iconContainer).css('background-color', iconColors[i].defaultClrBg);
          $(iconsArr[i]).css('color', iconColors[i].defaultClr);
        });

        iconsArr[i].appendTo($iconContainer);
        $iconContainer.appendTo($tweetIconsContainer);
      })(i);
    }
    $($profilePhoto).attr('src', data.profilePhotoURL);
    $($profilePhoto).attr('alt', 'User ' + data.user);
    $($message).text(data.message);

    $name.text(data.user);
    $userName.text('@' + data.user);
    $timeStamp.text(jQuery.timeago(data.created_at));

    $profilePhoto.appendTo($tweet);
    $contentContainer.appendTo($tweet);
    $tweetHeader.append($name).append(' ').append($userName).append(' * ').append($timeStamp);
    $tweetHeader.appendTo($contentContainer);
    $message.appendTo($messageContainer);
    $messageContainer.appendTo($contentContainer);
    $tweetIconsContainer.appendTo($contentContainer);

    return $tweet;
  }

  var renderFeed = function(user) {
    $('#feed').empty();

    var tweetsArr;
    typeof user !== 'string' ? tweetsArr = streams.home : tweetsArr = streams.users[user];

    for (var i = tweetsArr.length - 1; i >= 0; i--) {
      var tweet = tweetsArr[i];
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