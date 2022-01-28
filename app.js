$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1 id="title">Twiddler</h1>');

  var $updateButton = $('<button id="update-feed">Update Feed</button>');

  var $feedBox = $('<div id="feed"></div>');

  var $friendListBox = $('<div id="friendListBox">Friend List</div>');
  var $friendList = $('<ul id="friends-list"></ul>');

  var $newTweetFormBox = $('<form id="new-tweet-form"></form>');
  var $newTweetTitle = $('<legend id="new_tweet_title">New Tweet</legend>')
  var $inputUsername = $('<input id="inputUsername" type="text" name="username">');
  var $inputComment = $('<input name="message" id="input_comment" type="text">');
  var $inputSubmit = $('<input type="submit" name="submit" value="Send">');
  var $usernameLabel = $('<label id="usernameLabel" for="inputUsername">Username</label>');
  var $commentLabel = $('<label id="commentLabel" for="input_comment">Message</label>');

  // Create event handler functions
  var userMode = false;
  var usernameOnClick;
  var renderFeed = function () {
    if(userMode) {
      var indexOfUsername = streams.users[usernameOnClick].length - 1;
      while (indexOfUsername >= 0) {
        var usertweet = streams.users[usernameOnClick][indexOfUsername];
        var $tweet = $('<div class="tweet"></div>');
        $('<img>', { class:'profile-photo', src:usertweet.profilePhotoURL }).appendTo($tweet);
        var $username = $('<span class="username" type="button"></span>');
        $username.text('@' + usertweet.user);
        $username.appendTo($tweet);
        var $message = $('<p class="message"></p>');
        $message.text(usertweet.message);
        $message.appendTo($tweet);
        var $timestamp = $('<span class="timestamp"><span>');
        $timestamp.text(jQuery.timeago(usertweet.created_at));
        $timestamp.appendTo($tweet);
        var $comment = $('<i class="far fa-comment-dots comment"></i>');
        $comment.appendTo($tweet);
        var $retweet = $('<i class="fas fa-retweet retweet"></i>');
        $retweet.appendTo($tweet);
        var $like = $('<i class="far fa-thumbs-up like"></i>');
        $like.appendTo($tweet);
        var $share = $('<i class="far fa-share-square share"></i>');
        $share.appendTo($tweet);
        $tweet.appendTo($feedBox);
        indexOfUsername -= 1;
      }
    } else {
      var index = streams.home.length - 1;
      while (index >= 0) {
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        $('<img>', { class:'profile-photo', src:tweet.profilePhotoURL }).appendTo($tweet);
        var $username = $('<span class="username" type="button"></span>');
        $username.text('@' + tweet.user);
        $username.appendTo($tweet);
        $username.on("click", handleUsernameClick);
        var $message = $('<p class="message"></p>');
        $message.text(tweet.message);
        $message.appendTo($tweet);
        var $timestamp = $('<span class="timestamp"><span>');
        $timestamp.text(jQuery.timeago(tweet.created_at));
        $timestamp.appendTo($tweet);
        var $comment = $('<i class="far fa-comment-dots comment"></i>');
        $comment.appendTo($tweet);
        var $retweet = $('<i class="fas fa-retweet retweet"></i>');
        $retweet.appendTo($tweet);
        var $like = $('<i class="far fa-thumbs-up like"></i>');
        $like.appendTo($tweet);
        var $share = $('<i class="far fa-share-square share"></i>');
        $share.appendTo($tweet);
        $tweet.appendTo($feedBox);
        index -= 1;
      }
    }
  }

  var handleUpdateButton = function() {
    if (userMode) {
      document.getElementById("update-feed").innerText = "Update Feed";
    }
    userMode = false;
    $("#feed").empty();
    $("#friends-list").empty();
    renderFeed();
    handleFriendList();
  };

  var handleUsernameClick = function() {
    usernameOnClick =  $(this).text();
    usernameOnClick = usernameOnClick.substring(1, usernameOnClick.length);
    userMode = true;
    document.getElementById("update-feed").innerText = "Back";
    $("#feed").empty();
    renderFeed();
  }

  var handleFriendListClick = function() {
    usernameOnClick =  $(this).text();
    userMode = true;
    document.getElementById("update-feed").innerText = "Back";
    $("#feed").empty();
    renderFeed();
  }

  var handleFriendList = function() {
    var friendList = [];
    for (var i = 0; i < streams.home.length; i++){
      var tweet = streams.home[i];
      var friendName = tweet.user;
      if (friendList.indexOf(friendName) === -1) {
        friendList.push(friendName);
        var $friendName = $('<li class="friend">'+ friendName + '</li>');
        $friendName.on("click", handleFriendListClick);
        $friendName.appendTo($friendList);
      }
    }
    $friendList.appendTo($friendListBox);
  }

  var handleNewTweet = function() {
    var newUserName = $inputUsername.val();
    var newComment = $inputComment.val();
    var newTimeStamp = new Date();
    var newPhoto = "./assets/img/visitor.png";
    var userInfo = {'user': newUserName, 'message': newComment, 'created_at': newTimeStamp, 'profilePhotoURL': newPhoto};
    window.streams.home.push(userInfo);
    if (window.streams.users[newUserName] === undefined) {
      window.streams.users[newUserName] = [];
      window.streams.users[newUserName].push(userInfo);
    } else {
      window.streams.users[newUserName].push(userInfo);
    }
    handleUpdateButton();
  }

  //Set event listeners (providing appropriate handlers as input)
  $updateButton.on("click", handleUpdateButton);
  $inputSubmit.on("click", handleNewTweet);

  // Append new HTML elements to the DOM
  $title.appendTo($app);

  $updateButton.appendTo($app);

  $newTweetFormBox.appendTo($app);
  $newTweetTitle.appendTo($newTweetFormBox);
  $usernameLabel.appendTo($newTweetFormBox);
  $inputUsername.appendTo($newTweetFormBox);
  $commentLabel.appendTo($newTweetFormBox);
  $inputComment.appendTo($newTweetFormBox);
  $inputSubmit.appendTo($newTweetFormBox);

  $feedBox.appendTo($app);
  $friendListBox.appendTo($app);
  renderFeed();
  handleFriendList();
  window.isItBeautifulYet = true;
});