


var renderFeed = function (user) {

  if (arguments.length === 0) {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"></img>');
      var $tweetMessage = $('<p class="message">' + tweet.message + '</p>');
      var $username = $('<div class="username">@' + tweet.user + '</div>');
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="fas fa-comment icon comment"></i>');
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      var $like = $('<i class="fas fa-heart icon like"></i>');
      var $share = $('<i class="fas fa-share icon share"></i>');
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $tweetMessage.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
  } else {
    var index = streams.users[user].length - 1;
    while(index >= 0){
      var tweet = streams.users[user][index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"></img>');
      var $tweetMessage = $('<p class="message">' + tweet.message + '</p>');
      var $username = $('<div class="username">@' + tweet.user + '</div>');
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="fas fa-comment icon comment"></i>');
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      var $like = $('<i class="fas fa-heart icon like"></i>');
      var $share = $('<i class="fas fa-share icon share"></i>');
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $tweetMessage.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
  }

};




// Select already existing elements
var $app = $('#app');
var $body = $('body');

// Create new HTML elements
var $title = $('<h1>Twiddler</h1>');
var $updateFeedButton = $('<button id="update-feed" type="button">Update Feed</button>');
var $feed = $('<div id="feed"></div>');







// Create event handler functions
var handleTitleClick = function(event) {
  alert('The title of this page is: ' + event.target.innerText);
}
var updateFeed = function(event) {
  $('.tweet').remove();
  renderFeed();
  $('button').text('Update Feed');
  var $username = $('.username');
  $username.on('click', handleUsernameClick);
}
var handleUsernameClick = function(event) {
  var innerText = event.target.innerText;
  var user = innerText.slice(1);
  $('.tweet').remove();
  renderFeed(user);
  $('button').text('Back');
  var $username = $('.username');
  $username.on('click', handleUsernameClick);
}




// Set event listeners
$title.on('click', handleTitleClick);
$updateFeedButton.on('click', updateFeed);


// Append new HTML elements to the DOM
$app.html('');
$title.appendTo($app);
$updateFeedButton.appendTo($feed);
$feed.appendTo($app);


renderFeed();
var $username = $('.username');
$username.on('click', handleUsernameClick);



window.isItBeautifulYet = true;





























