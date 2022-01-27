$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
    // Navbar
  var $navbar = $('<div id="navbar"></div>');
  var $homeIcon = $('<img id="home-icon" src="assets/icons/homeIcon.svg">');
  var $line = $('<img id="line" src="assets/icons/line.svg">');
  var $groupIcons = $('<img id="group-icon" src="assets/icons/group1.svg"><img id="group-icon" src="assets/icons/group2.svg"><img id="group-icon" src="assets/icons/group3.svg"><img id="group-icon" src="assets/icons/group4.svg">');
  var $addGroupBtn = $('<img src="assets/icons/addGroup.svg">');

  $homeIcon.appendTo($navbar);
  $line.appendTo($navbar);
  $groupIcons.appendTo($navbar);
  $addGroupBtn.appendTo($navbar);

    // Sidebar
  var $sidebar = $('<div id="sidebar"></div>');
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Home</button>');
  var $usersTitle = $('<p id="users-title">USERS</p>');
  var $usersList = $('<div id="users-list"></div>');
  var $user = $('<div class="user"></div>');
  var $userPhoto = $('<img class="user-photo" src="">');
  var $userUsername = $('<p class="user-username">user-name</p>');

  $title.appendTo($sidebar);
  $updateFeed.appendTo($sidebar);
  $usersTitle.appendTo($sidebar);
  $usersList.appendTo($sidebar);

    // Feed
  var $feed = $('<div id="feed"></div>');

  // New Tweet Form
  var $newTweetForm = $('<div id="new-tweet-form"></div>');
  var $visitorPhoto = $('<img id="visitor-photo" src="assets/img/visitor.png">');
  var $newTweetInfo = $('<div id="new-tweet-info"></div>');
  var $visitorName = $('<input type="text" id="visitor-name" name="visitor" placeholder="@username"></input>');
  var $newTweetMessage = $('<input type="message" id="new-tweet-message" name="visitor" placeholder="What\'s on your mind?"></input>');
  var $postBtn = $('<button id="post-btn">Post</button>');

  $visitorName.appendTo($newTweetInfo);
  $newTweetMessage.appendTo($newTweetInfo);
  $postBtn.appendTo($newTweetInfo);
  $visitorPhoto.appendTo($newTweetForm);
  $newTweetInfo.appendTo($newTweetForm);
  $newTweetForm.prependTo($feed);

  // Tweets
  var $tweet = $('<div class="tweet"></div>');
  var $profilePhoto = $('<img class="profile-photo" src="assets/img/mracus.png">');
  var $tweetInfo = $('<div class="tweet-info"></div>');
  var $tweetUserDiv = $ ('<div class="tweet-user-div"></div>');
  var $tweetUser = $('<p class="tweet-user">mracus</p>');
  var $username = $('<p class="username">@mracus</p>');
  var $timestamp = $('<p class="timestamp">2 mins ago</p>');
  var $message = $('<p class="message">Foo bar baz lorem ipsum</p>');
  var $tweetBtns = $('<div class="tweet-btns"></div>');
  var $like = $('<img class="like" src="assets/icons/placeholder.png">');
  var $comment = $('<img class="comment" src="assets/icons/placeholder.png">');
  var $retweet = $('<img class="retweet" src="assets/icons/placeholder.png">');
  var $share = $('<img class="share" src="assets/icons/placeholder.png">');
  var $likeText = $('<p class="tweet-btn-text">like</p>');
  var $commentText = $('<p class="tweet-btn-text">like</p>');
  var $retweetText = $('<p class="tweet-btn-text">like</p>');
  var $likeBtn = $('<div class="like-btn"></div>');
  var $commentBtn = $('<div class="comment-btn"></div>');
  var $retweetBtn = $('<div class="retweet-btn"></div>');
  var $shareBtn = $('<div class="share-btn"></div>');

    // Extra Div
  var $extraDiv = $('<div id="extra-div"></div>');
  var $extraPhoto = $('<img id="extra-photo" src="assets/img/extra-photo.svg">');

  $extraPhoto.appendTo($extraDiv);

  // Create helper functions
  var renderFeed = function(user) {
    var currentArray = streams.home;

    if (user) {
      $feed.empty();
      currentArray = streams.users[user];
      console.log(currentArray);
    }
    for (var i = 0; i < currentArray.length; i++) {
        $tweet = $('<div class="tweet"></div>');
        $profilePhoto = $('<img class="profile-photo" src="assets/img/' + currentArray[i].user + '.png">');
        $tweetInfo = $('<div class="tweet-info"></div>');
        $tweetUserDiv = $ ('<div class="tweet-user-div"></div>');
        $tweetUser = $('<p class="tweet-user">' + currentArray[i].user + '</p>');
        $username = $('<p class="username">@' + currentArray[i].user +'</p>');
        $timestamp = $('<p class="timestamp">' + jQuery.timeago(streams.home[i].created_at) +'</p>');
        $message = $('<p class="message">' + streams.home[i].message + '</p>');
        $tweetBtns = $('<div class="tweet-btns"></div>');
        $like = $('<i class="fas fa-heart fa-lg like"></i>');
        $likeText = $('<p class="tweet-btn-text">like</p>');
        $comment = $('<i class="fas fa-comment fa-lg comment"></i>');
        $commentText = $('<p class="tweet-btn-text">comment</p>');
        $retweet = $('<i class="fas fa-retweet fa-lg retweet"></i>');
        $retweetText = $('<p class="tweet-btn-text">retweet</p>');
        $share = $('<i class="fas fa-share fa-lg share"></i>');
        $likeBtn = $('<div class="like-btn"></div>');
        $commentBtn = $('<div class="comment-btn"></div>');
        $retweetBtn = $('<div class="retweet-btn"></div>');
        $shareBtn = $('<div class="share-btn"></div>');
        $like.appendTo($likeBtn);
        $likeText.appendTo($likeBtn);
        $likeBtn.appendTo($tweetBtns);
        $comment.appendTo($commentBtn);
        $commentText.appendTo($commentBtn);
        $commentBtn.appendTo($tweetBtns);
        $retweet.appendTo($retweetBtn);
        $retweetText.appendTo($retweetBtn);
        $retweetBtn.appendTo($tweetBtns);
        $share.appendTo($shareBtn);
        $shareBtn.appendTo($tweetBtns);
        $commentBtn.appendTo($tweetBtns);
        $retweetBtn.appendTo($tweetBtns);
        $shareBtn.appendTo($tweetBtns);
        $tweetUser.appendTo($tweetUserDiv);
        $username.appendTo($tweetUserDiv);
        $tweetUserDiv.appendTo($tweetInfo);
        $timestamp.appendTo($tweetInfo);
        $message.appendTo($tweetInfo);
        $tweetBtns.appendTo($tweetInfo);
        $profilePhoto.appendTo($tweet);
        $tweetInfo.appendTo($tweet);
        $tweet.prependTo($feed);
        $username.on("click", handleUsernameClick);
      }
    };

  var updateFeed = function() {
    for (var i = streams.home.length - 1; i >= 0; i--) {
      $tweet = $('<div class="tweet"></div>');
      $profilePhoto = $('<img class="profile-photo" src="assets/img/' + streams.home[i].user + '.png">');
      $tweetInfo = $('<div class="tweet-info"></div>');
      $tweetUserDiv = $ ('<div class="tweet-user-div"></div>');
      $tweetUser = $('<p class="tweet-user">' + streams.home[i].user + '</p>');
      $username = $('<p class="username">@' + streams.home[i].user +'</p>');
      $timestamp = $('<p class="timestamp">' + jQuery.timeago(streams.home[i].created_at) +'</p>');
      $message = $('<p class="message">' + streams.home[i].message + '</p>');
      $tweetBtns = $('<div class="tweet-btns"></div>');
      $like = $('<i class="fas fa-heart fa-lg like"></i>');
      $likeText = $('<p class="tweet-btn-text">like</p>');
      $comment = $('<i class="fas fa-comment fa-lg comment"></i>');
      $commentText = $('<p class="tweet-btn-text">comment</p>');
      $retweet = $('<i class="fas fa-retweet fa-lg retweet"></i>');
      $retweetText = $('<p class="tweet-btn-text">retweet</p>');
      $share = $('<i class="fas fa-share fa-lg share"></i>');
      $likeBtn = $('<div class="like-btn"></div>');
      $commentBtn = $('<div class="comment-btn"></div>');
      $retweetBtn = $('<div class="retweet-btn"></div>');
      $shareBtn = $('<div class="share-btn"></div>');

      $like.appendTo($likeBtn);
      $likeText.appendTo($likeBtn);
      $likeBtn.appendTo($tweetBtns);
      $comment.appendTo($commentBtn);
      $commentText.appendTo($commentBtn);
      $commentBtn.appendTo($tweetBtns);
      $retweet.appendTo($retweetBtn);
      $retweetText.appendTo($retweetBtn);
      $retweetBtn.appendTo($tweetBtns);
      $share.appendTo($shareBtn);
      $shareBtn.appendTo($tweetBtns);
      $commentBtn.appendTo($tweetBtns);
      $retweetBtn.appendTo($tweetBtns);
      $shareBtn.appendTo($tweetBtns);
      $tweetUser.appendTo($tweetUserDiv);
      $username.appendTo($tweetUserDiv);
      $tweetUserDiv.appendTo($tweetInfo);
      $timestamp.appendTo($tweetInfo);
      $message.appendTo($tweetInfo);
      $tweetBtns.appendTo($tweetInfo);
      $profilePhoto.appendTo($tweet);
      $tweetInfo.appendTo($tweet);
      $tweet.appendTo($feed);
      $username.on("click", handleUsernameClick);
    }
  };

  var renderUsersList = function() {
    for (var user in streams.users) {
      $user = $('<div class="user"></div>');
      $userPhoto = $('<img class="user-photo" src="assets/img/' + user + '.png">');
      $userUsername = $('<p class="user-username">' + user + '</p>');
      $userPhoto.appendTo($user);
      $userUsername.appendTo($user);
      $user.appendTo($usersList);
    }
  };

  var handleUsernameClick = function() {
    $updateFeed.text('Back');
    renderFeed($(this).text().slice(1));
  }

  renderUsersList();

  renderFeed();

  // Set event listeners (providing appropriate handlers as input)
  $username.on("click", handleUsernameClick);

  $homeIcon.click(function() {
    updateFeed();
  });

  $updateFeed.click(function() {
    $updateFeed.text('Home');
    $feed.empty();
    $newTweetForm.prependTo($feed);
    updateFeed();
  });

  // Append new HTML elements to the DOM
  $navbar.appendTo($app);
  $sidebar.appendTo($app);
  $feed.appendTo($app);
  $extraDiv.appendTo($app);
});