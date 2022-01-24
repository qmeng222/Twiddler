$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
    // Homepage
  var $title = $('<h1>Twiddler</h1>');
  var $btn = $('<button id="update-feed">Update Feed</button>');
  var $home = $('<div id="home">Home</div>');

    // New Tweet
  var $newTweet = $('<form id="new-tweet-form"></form>');
  var $inputUsernameLabel = $('<label id="username-label" for="username"></label>');
  var $inputUsername = $('<input type="text" placeholder="Username" id="username" name="username" autocomplete="off">');
  var $inputMessageLabel = $('<label for="message"></label>');
  var $inputMessage = $('<input type="text" placeholder="What\'s happening?" id="message" name="message" autocomplete="off">');
  var $newTwidButton = $('<button id="twid" type="submit">Twid</button>');

    // Friends List
  var $friendsList = $('<ul id="friends-list">Friends List</ul>');
  var $friend = $('<li class="friend">Friend</li>');
  var $friendPhoto = $('<img class="profile-photo">');
  var $friendUsername = $('<span class="friend-username"></span>');
  var $friendName = $('<span class="friend-name"></span>');

    // Twiddler Feed
  var $feed = $('<div id="feed"></div');
  var $tweet = $('<div class="tweet"></div>');
  var $profilePhoto  = $('<img class="profile-photo">');
  var $username = $('<span class="username"></span>');
  var $message = $('<p class="message"></p>');
  var $timestamp = $('<span class="timestamp"></span>');
  var $icons = $('<div class="icon"></div>')
  var $comment = $('<i class="icon comment far fa-comment-alt"></i>');
  var $retweet = $('<i class="icon retweet fas fa-redo"></i>');
  var $like = $('<i class="icon like far fa-heart"></i>');
  var $share = $('<i class="icon share far fa-share-square"></i>');

  // Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleButtonClick = function(event) {
    if (event.target.innerText === 'Back') {
      $btn.text("Update Feed");
    }
    renderFeed();
  }

  var handleUsernameClick = function(event) {
    $btn.text('Back');
    var currentUser = event.target.innerText.substring(1)
    renderFeed(currentUser);
  }

  var handleTwidButtonClick = function(event) {
    var $inputUsernameValue = document.getElementById("username").value;
    var $inputMessageValue = document.getElementById("message").value;
    var tweet = {};
    tweet.user = $inputUsernameValue;
    tweet.message = $inputMessageValue;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/' + $inputUsernameValue + '.png';
    if (!streams.users[$inputUsernameValue]) {
      streams.users[$inputUsernameValue] = [];
    }
    streams.users[$inputUsernameValue].push(tweet);
    streams.home.push(tweet);
    renderFeed();
    event.preventDefault();
    document.getElementById("username").value = '';
    document.getElementById("message").value = '';
    validateTwidButton();
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", handleTitleClick);
  $btn.on("click", handleButtonClick);
  $username.on("click", handleUsernameClick);
  $newTwidButton.on("click", handleTwidButtonClick);


  // Append new HTML elements to the DOM
    // Homepage
  $title.appendTo($app);
  $btn.appendTo($app);
  $home.appendTo($app);

    // New Tweet
  $newTweet.appendTo($app);
  $inputUsernameLabel.appendTo($newTweet);
  $inputUsername.appendTo($newTweet);
  $inputMessageLabel.appendTo($newTweet);
  $inputMessage.appendTo($newTweet);
  $newTwidButton.appendTo($newTweet);

    // Friends List
  $friendsList.appendTo($app);

    // Twiddler Feed
  $feed.appendTo($app);

  // Starting Page
  var renderFeed = function(user) {
    if (user === undefined) {
      $feed.empty();
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        $tweet = $('<div class="tweet"></div>');
        $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
        $username = $('<span class="username">@' + tweet.user + '</span>');
        $message = $('<p class="message">' + tweet.message + '</p>');
        $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
        $icons = $('<div class="icon"></div>');
        $comment = $('<i class="icon comment far fa-comment-alt"></i>');
        $retweet = $('<i class="icon retweet fas fa-redo"></i>');
        $like = $('<i class="icon like far fa-heart"></i>');
        $share = $('<i class="icon share far fa-share-square"></i>');
        $tweet.appendTo($feed);
        $profilePhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $icons.appendTo($tweet);
        $comment.appendTo($icons);
        $retweet.appendTo($icons);
        $like.appendTo($icons);
        $share.appendTo($icons);
        $username.on("click", handleUsernameClick);
        index -= 1;
      }
    } else {
      $feed.empty();
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        if (user === tweet.user) {
          $tweet = $('<div class="tweet"></div>');
          $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
          $username = $('<span class="username">@' + tweet.user + '</span>');
          $message = $('<p class="message">' + tweet.message + '</p>');
          $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
          $icons = $('<div class="icon"></div>');
          $comment = $('<i class="icon comment far fa-comment-alt"></i>');
          $retweet = $('<i class="icon retweet fas fa-redo"></i>');
          $like = $('<i class="icon like far fa-heart"></i>');
          $share = $('<i class="icon share far fa-share-square"></i>');
          $tweet.appendTo($feed);
          $profilePhoto.appendTo($tweet);
          $username.appendTo($tweet);
          $message.appendTo($tweet);
          $timestamp.appendTo($tweet);
          $icons.appendTo($tweet);
          $comment.appendTo($icons);
          $retweet.appendTo($icons);
          $like.appendTo($icons);
          $share.appendTo($icons);
          index -= 1;
        }
        index -= 1;
      }
    }
  }

  var createFriendsList = function() {
    for (var key in streams.users) {
      var user = key;
      $friend = $('<li class="friend"></li>');
      $friendPhoto = $('<img class="friend-photo" src="assets/img/' + user + '.png">');
      $friendName = $('<span class="friend-name">' + user + '</span>');
      $friendUsername = $('<span class="friend-username">@' + user + '</span>');
      $friend.appendTo($friendsList);
      $friendPhoto.appendTo($friend);
      $friendName.appendTo($friend);
      $friendUsername.appendTo($friend);
      $friendUsername.on("click", handleUsernameClick);
    }
  };

  $newTwidButton.prop('disabled', true);
  var validateTwidButton = function() {
    var buttonDisabled = $inputUsername.val().trim() === '' || $inputMessage.val().trim() === '';
    $newTwidButton.prop('disabled', buttonDisabled);
  }
  $inputUsername.on('keyup', validateTwidButton);
  $inputMessage.on('keyup', validateTwidButton);

  createFriendsList();

  renderFeed();

  window.isItBeautifulYet = true
});