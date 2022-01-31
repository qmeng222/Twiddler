$(document).ready(function(){
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $update = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $pane = $('<div id="pane"></div>');
  var $newTweet = $('<div id="new-tweet"></div>');

  var $newTweetForm = $('<form id="new-tweet-form"></form>');
  var $inputTweetUser = $('<label for="username">Username:</label><br><input type="text" id="username" name="username" placeholder="Twiddler handle" required></input>');
  var $inputTweetMessage = $('<br><label for="message">Message:</label><br><input type="text" id="message" name="message" placeholder="What\'s on your mind?" required></input>');
  var $newTweetSubmit = $('<input type="submit" value="Submit">');

  var $username = $('<span class="username"></span>');
  var $message = $('<p class="message"></p>');
  var $profilePhoto = $('<img class="profile-photo>');
  var $timestamp = $('<span class="timestamp"></span>');

  var $comment = $('<i class="comment fas fa-comment"></i>');
  var $retweet = $('<i class="retweet fas fa-retweet"></i>');
  var $like = $('<i class="like fas fa-heart"></i>');
  var $share = $('<i class="share fas fa-share"></i>');

  var $friendsList = $('<ul id="friends-list"></ul>');

  // Create event handler functions
  var handleTitleClick = function(event) {
    alert('Welcome to the ' + event.target.innerText);
  }
  var handleUpdateClick = function(event) {
    $update.text("Update Feed");
    renderFeed();
  }
  var handleNewTweetSubmit = function(event) {
    var newTweetUser = $('#username').val();
    var newTweetMessage = $('#message').val();
    var tweet = {};

    tweet.user = newTweetUser;
    tweet.message = newTweetMessage;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';

    addTweet(tweet);
    renderFeed();
    event.preventDefault();
  }
  var addTweet = function(newTweet) {
    var username = newTweet.user;
    if(streams.users[username] === undefined) {
      streams.users[username] = [];
    }
    streams.users[username].push(newTweet);
    streams.home.push(newTweet);
  };
  var handleUsernameClick = function(event) {
    var currentUser = event.target.innerText.slice(1);
    $update.text("Back");
    renderFeed(currentUser);
  }
  var handlePhotoClick = function(event) {
    var currentUser = $('.').attr('src').slice(11, -4);
    $update.text("Back");
    renderFeed(currentUser);
  }

  // Set event listeners (provide appropriate handlers as input)
  $title.on("click", handleTitleClick);
  $update.on("click", handleUpdateClick);
  $newTweetSubmit.on("click", handleNewTweetSubmit);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $update.appendTo($app);
  $newTweet.appendTo($app);
  $friendsList.appendTo($app);
  $feed.appendTo($app);

  $newTweetForm.appendTo($newTweet);
  $inputTweetUser.appendTo($newTweetForm);
  $inputTweetMessage.appendTo($newTweetForm);
  $newTweetSubmit.appendTo($newTweetForm);

  var renderFeed = function(user) {
    var currentFeed = streams.home;
    if(user !== undefined) {
      currentFeed = streams.users[user];
    }
    $feed.empty();
    var index = currentFeed.length - 1;
    while(index >= 0){
      var tweet = currentFeed[index];
      var $tweet = $('<div class="tweet"></div>');
      var $icons = $('<div class="flex-container"></div>');

      $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
      $username = $('<span class ="username">@' + tweet.user + '</span>');
      $timestamp = $('<span class="timestamp"> - ' + jQuery.timeago(tweet.created_at) + '</span>');
      $message = $('<p class="message">' + tweet.message + '</p>');
      $comment = $('<i class="comment fas fa-comment"></i>');
      $retweet = $('<i class="retweet fas fa-retweet"></i>');
      $like = $('<i class="like fas fa-heart"></i>');
      $share = $('<i class="share fas fa-share"></i>');

      $tweet.appendTo($feed);
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $message.appendTo($tweet);

      $icons.appendTo($tweet);
      $comment.appendTo($icons);
      $retweet.appendTo($icons);
      $like.appendTo($icons);
      $share.appendTo($icons);

      $username.on("click", handleUsernameClick);
      $profilePhoto.on("click", handlePhotoClick);

      index -= 1;
    }
  }
  renderFeed();

  // Create friends list
  users.forEach(function(user) {
    var $friend = $('<li class="friend">@' + user + '</li>');
    $friend.appendTo($friendsList);
    $friend.on("click", handleUsernameClick);
  })

  window.isItBeautifulYet = true;

});