$(document).ready(function(){
  // creates a variable that refers to the already-existing HTML div with id="app"
  var $app = $('#app');
  // clears the HTML from the app
  $app.html('');

  var $title = $('<h1 id="title">Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(e) {
    alert('The title of this page is: ' + e.target.innerText);
  })

  var $sidebar = $('<section id="sidebar"></section>');

  var showUserFeed = function(username) {
    $('#feed').remove();
    var $feed = renderFeed(username, function(){});
    $feed.appendTo($app);
    console.log('showUserFeed executed')
    $('#update-feed').text('Back');
  }

  var showHomeFeed = function() {
    $('#feed').remove();
    // initializes the feed at appropriate state (home)
    var $feed = renderFeed('', showUserFeed);
    $feed.appendTo($app);
    console.log('showHomeFeed executed')
    $('#update-feed').text('Update Feed')
  }

  createFeedButton(showHomeFeed).appendTo($sidebar);
  createFriendsList(showUserFeed).appendTo($sidebar);
  createNewTweetForm(showHomeFeed).appendTo($sidebar);
  $sidebar.appendTo($app);
  showHomeFeed();
});

// creates update feed button
var createFeedButton = function(onClick) {
  // creates update feed button element and adds "Update Feed" as default text
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  // creates functionality for the button - should add more tweets to the feed
  $updateFeedButton.on('click', onClick);
  console.log('createFeedButton invoked')
  return $updateFeedButton;
};

var renderFeed = function(user, onShowNewFeed) {
  var allTweets = user ? streams.users[user] : streams.home;
  var $feed = $('<div id="feed"></div>');
  for (var i = allTweets.length -1; i >= 0; i--) {
    // JavaScript only, data structure
    var tweet = allTweets[i];
    // creates the jQuery object
    var $tweet = createTweet(tweet, onShowNewFeed);
    console.log('onShowNewFeed in renderFeed: ', onShowNewFeed)
    // Adds the newly constructed tweet (jQuery object) to the div with an id="feed"
    $tweet.appendTo($feed);
  }
  return $feed;
};

var createTweet = function(tweet, onUsernameClick) {
  // creates jQuery variables
  var $tweet = $('<div class="tweet"></div>');
  var $message = $('<div class="message"></div>');
  var $username = $('<div class="username"></div>');
  var $profilePhoto = $('<img class="profile-photo"/>');
  var $timestamp = $('<div class="timestamp"></div>');
  var $commentIcon = $('<i class="icon comment far fa-comments"></i>');
  var $retweetIcon = $('<i class="icon retweet fas fa-retweet"></i>');
  var $likeIcon = $('<i class="icon like far fa-heart"></i>');
  var $shareIcon = $('<i class="icon share far fa-share-square"></i>');

  // adds to elements via jQuery variables
  $message.text(tweet.message);
  $username.text('@' + tweet.user + ':')
  $profilePhoto.attr('src', tweet.profilePhotoURL);
  $timestamp.text(jQuery.timeago(tweet.created_at));
  $username.on("click", function(e) {
    onUsernameClick(e.target.innerText.replace('@', '').replace(':', ''));
    console.log('username clicked');
  });

  // appends these elements to the tweets
  $profilePhoto.appendTo($tweet);
  $username.appendTo($tweet);
  $message.appendTo($tweet);
  $timestamp.appendTo($tweet);
  $commentIcon.appendTo($tweet);
  $retweetIcon.appendTo($tweet);
  $likeIcon.appendTo($tweet);
  $shareIcon.appendTo($tweet);

  return $tweet;
};

var createFriendsList = function(onClick) {
  var allFriends = streams.users;
  // create HTML <ul> element via jQuery
  var $friendsList = $('<ul id="friends-list">Friends List</ul>');
  $('#friends-list').on('click', "li", function(e) {
    onClick(e.target.innerText);
  })
  for (var key in allFriends) {
    var $friend = $('<li class="friend"></li>');
    $friend.on("click", function(e) {
      onClick(e.target.innerText);
    })
    $friend.text(key).appendTo($friendsList);
  }
  return $friendsList
}

window.visitor = 'defaultname';

var createNewTweetForm = function(onClick) {

  // creates jQuery elements
  var $tweetForm = $('<div id="tweet-form">Tweet Form</div>')
  var $submitButton = $('<button class="submit-button" type="button">Post Tweet</button>')
  var $usernameText = $('<label>Username</label>')
  var $usernameInput = $('<textarea class="textarea" id="username"></textarea>')
  var $messageText = $('<label>Message</label>')
  var $textarea = $('<textarea class="textarea message"></textarea>')

  //adds elements to the app
  $usernameText.appendTo($tweetForm);
  $usernameInput.appendTo($tweetForm);
  $messageText.appendTo($tweetForm);
  $textarea.appendTo($tweetForm);
  $submitButton.appendTo($tweetForm);

  // gives Post Tweet button functionality
  $submitButton.on("click", function(e) {
    window.visitor = $usernameInput.val();
    if (!streams.users[window.visitor]) {
      var $friend = $('<li class="friend"></li>');
      $friend.text(window.visitor);
      $friend.appendTo('#friends-list');
    }
    writeTweet($textarea.val());
    onClick();
  });

  return $tweetForm;
}

window.isItBeautifulYet = true;