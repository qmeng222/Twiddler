$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  //Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $menuPanel = $('<div class="small-panel" id="menu"></div>');
  $menuPanel.append($('<h2 class = "subtitle">Menu</h2>'));
  var $friendsPanel = $('<div class="small-panel" id="friendslist"></div>');
  var $feed = $('<div class="large-panel" id="feed"></div');
  var $update = $('<button class="btn" type="button" id="update-feed">Update Feed</button>');
  var $newTweet = $('<form id="new-tweet-form"></form>');
  $newTweet.append($('<h3>Submit New Tweet</h3>'));
  $newTweet.append('<label for="form-username">Username:</label><br>');
  $newTweet.append('<input type="text" id="form-username" name="username" placeholder="@username"><br>');
  $newTweet.append('<label for="form-message">Message:</label><br>');
  $newTweet.append('<input type="text" id="form-message" name="message" rows="6" placeholder="Message"><br>');
  $newTweet.append('<input class="btn" type="submit" value="Submit">');

  //Create event handler functions
  var handleUsernameClick = function (event) {
    var user = event.target.innerText.substring(1);
    renderFeed(user);
    $update.text('Back');
  }

  var renderFeed = function (user) {
    var currentStream = (typeof user === 'string') ? streams.users[user] : streams.home
    $feed.empty();
    var index = currentStream.length - 1;
    while(index >= 0){
      var tweet = currentStream[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profPic = $('<img class="profile-photo" src=' + tweet.profilePhotoURL + '>');
      var $username = $('<span class="username">@'+ tweet.user + '</span>');
      var $message = $('<p class="message">' + tweet.message + '</p>');
      var $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
      var $comment = $('<i class="icon comment far fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like far fa-thumbs-up"></i>');
      var $share = $('<i class="icon share fas fa-external-link-alt"></i>');
      var $icons = $('<div class = "icons"></div>');
      $icons.append([$message, $comment, $retweet, $like, $share, $timestamp]);
      $tweet.append([$profPic, $message, $username, $icons, $timestamp]);
      $tweet.appendTo($feed);
      $username.on('click',handleUsernameClick);
      index -= 1;
    }
  };

  var renderFriendsList = function () {
    $friendsPanel.empty();
    $friendsPanel.append($('<h2 class = "subtitle">Friends</h2>'));
    var $friendsList = $('<ul id="friends-list"></ul>');
    var userList = Object.keys(streams.users);
    for (var i = 0; i < userList.length; i++) {
      var $username = $('<li class="username friend">@'+ userList[i] + '</li>');
      $friendsList.append($username);
      $username.on('click',handleUsernameClick);
    }
    $friendsPanel.append($friendsList);
  };

  var submitNewTweet = function () {
    window.visitor = $('#form-username').val();
    var newUser = !Boolean(streams.users[visitor]);
    writeTweet($('#form-message').val());
    renderFeed();
    if (newUser) {
      renderFriendsList();
    }
  }

  //Set event listeners
  $title.on('click', function (event) {
    console.log(event);
    alert('The title of this page is: '+event.target.innerText);
  });

  $update.on('click', function () {
    renderFeed();
    if($update.text() === 'Back') {
      $update.text('Update Feed');
    }
  });

  $newTweet.on('submit', function(event) {
    event.preventDefault();
    submitNewTweet();
  });

  //Append new HTML elements to the DOM
  $app.html('');
  $("time.timago").timeago();
  $title.appendTo($app);
  $app.append([$menuPanel,$feed,$friendsPanel]);
  $menuPanel.append($update);
  $menuPanel.append()
  $menuPanel.append($newTweet);
  renderFeed();
  renderFriendsList();

  window.isItBeautifulYet = true;

});