$(document).ready(function(){
  var $app = $('#app');

  var $title = $('<h1 class="logo logo-color">Twiddler</h1>');
  var $updateFeedBtn = $('<button id="update-feed">Update Feed</button>');
  var $masterContainer = $('<div id="master-container"></div>')
  var $leftContainer = $('<div id="left-container"></div>')
  var $middleContainer = $('<div id="middle-container"></div>')
  var $rightContainer = $('<div id="right-container"></div>')
  var $feed = $('<div id="feed"></div>');
  var $homeHeader = $('<div class="home-header"><p>Home</p></div>');

  var createTweet = function(data) {
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class="profile-photo"/>');
    var $contentContainer = $('<div class="tweet-content"></div>');

    var $tweetHeader = $('<div class="tweet-header"></div>');
    var $name = $('<span class="twiddler-name"></span>');
    var $userName = $('<span class="username low-importance-elem"></span>');
    var $timeStamp = $('<span class="timestamp low-importance-elem"></span>');

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
      {activeClrIcon: 'rgb(29, 155, 240)', activeClrBg: 'rgba(29, 155, 240, 0.1)'},
      {activeClrIcon: 'rgb(0, 186, 124)', activeClrBg: 'rgba(0, 186, 124, 0.1)'},
      {activeClrIcon: 'rgb(249, 24, 128)', activeClrBg: 'rgba(249, 24, 128, 0.1)'},
      {activeClrIcon: 'rgb(29, 155, 240)', activeClrBg: 'rgba(29, 155, 240, 0.1)'}
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
          $($iconContainer).css('background-color', '');
          $(iconsArr[i]).css('color', '');
          $($iconContainer).css('cursor', '');
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
    $tweetHeader.append($name).append(' ').append($userName).append(' <span class="low-importance-elem">*<span> ').append($timeStamp);
    $tweetHeader.appendTo($contentContainer);
    $message.appendTo($messageContainer);
    $messageContainer.appendTo($contentContainer);
    $tweetIconsContainer.appendTo($contentContainer);

    return $tweet;
  }

  var createFriend = function(name) {
    var data = streams.users[name][0];
    var $friendContainer = $('<li class="friend"></li>');
    var $profilePhoto = $('<img class="profile-photo"/>');
    var $nameContainer = $('<div class="name-container"></div>');
    var $name = $('<span class="twiddler-name"></span>');
    var $username = $('<span class="username low-importance-elem"></span>');

    $($profilePhoto).attr('src', data.profilePhotoURL);
    $($profilePhoto).attr('alt',"Photo of " + data.profilePhotoURL);
    $($name).text(data.user);
    $($username).text("@" + data.user);

    $($profilePhoto).appendTo($friendContainer);
    $($nameContainer).appendTo($friendContainer);
    $($name).appendTo($nameContainer);
    $($username).appendTo($nameContainer);

    return $friendContainer;
  }

  var updateFriendsList = function(name) {
    var $friendsList = $('#friends-list');
    var $friend = createFriend(name);
    $($friend).appendTo($friendsList);
  }

  var createFriendsList = function() {
    var $container = $('<div id="friends-list-container"></div>');
    var $title = $('<h2 class="sub-title">Friends List</h2>');
    var $friendsList = $('<ul id="friends-list"></ul>');
    $($title).appendTo($container);
    for (var name in streams.users) {
      (function(name) {
        var $friend = createFriend(name);
        $($friend).appendTo($friendsList);
      })(name);
    }
    $friendsList.appendTo($container);
    return $container;
  }

  var createForm = function() {
    var $form = $('<form id="new-tweet-form"></form>');
    var $userInput = $('<label for="tweet-username"><input id="tweet-username" name="username" placeholder="Username"></label>');
    var $messageInput = $('<label for="tweet-message"><input id="tweet-message" name="message" placeholder="What\'s Happening?"></label>');
    var $btnContainer = $('<div class="tweet-btn-container"></div>');
    var $btn = $('<button class="small-btn">Twid</button>');

    $($form).on('submit', function(event) {
      event.preventDefault();
      var user = $('#tweet-username').val();
      var message = $('#tweet-message').val();
      if (streams.users[user] === undefined) {
        writeTweet(message, user);
        updateFriendsList(user);
      } else {
        writeTweet(message, user);
      }
      $('#tweet-username').val('');
      $('#tweet-message').val('');
      renderFeed();
    });

    $($userInput).appendTo($form);
    $($messageInput).appendTo($form);
    $($btn).appendTo($btnContainer);
    $($btnContainer).appendTo($form);

    return $form;
  }

  var initUserNameClick = function() {
    var $usernameArr = $('.username');
    for (var i = 0; i < $usernameArr.length; i++) {
      $($usernameArr[i]).on('click', handleUsernameClick);
    }
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
    initUserNameClick();
  };

  var handleUsernameClick = function() {
    var $updateFeedBtn = $('#update-feed');
    $updateFeedBtn.text('Back');

    $($updateFeedBtn).one('click', function() {
      $updateFeedBtn.text('Update Feed');
    })

    renderFeed($(this).text().slice(1));
  };

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $($updateFeedBtn).on('click', renderFeed);
  $($homeHeader).on('click', renderFeed);

  $($app).html('');
  $($masterContainer).appendTo($app);
  $($leftContainer).appendTo($masterContainer);
  $($title).appendTo($leftContainer);
  $(createFriendsList()).appendTo($leftContainer);
  $($updateFeedBtn).appendTo($leftContainer);
  $($middleContainer).appendTo($masterContainer);
  $($rightContainer).appendTo($masterContainer);
  $($homeHeader).appendTo($middleContainer);
  $(createForm()).appendTo($middleContainer);
  $($feed).appendTo($middleContainer);

  renderFeed();
  window.isItBeautifulYet = true
});