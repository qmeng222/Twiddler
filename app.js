

$(document).ready(function(){
  jQuery("time.timeago").timeago();

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id=feed></div>');
  var $friendslist = $('<div class="friends-list"></div>');
  var $friendsHeader = $('<h4>Studentlist</h4>');
  var $mracus = $('<li>mracus</li>');
  var $douglascalhoun = $('<li>douglascalhoun</li>');
  var $shawndrost = $('<li>shawndrost</li>');
  var $sharksforcheap = $('<li>sharksforcheap</li>');
  var $leftside = $('<div class = "left"></div>');

$mracus.click(function(){
  button($(this).text());
})

$douglascalhoun.click(function(){
  button($(this).text());
})

$shawndrost.click(function(){
  button($(this).text());
})

$sharksforcheap.click(function(){
  button($(this).text());
})

$title.on("click", function(event) {
console.log (event);
alert('The title of this page is:' + event.target.innerText);
});

var UpdateFeedClick = function (event) {
  var index = streams.home.length - 1;
  renderFeed();
  $button.text('Update Feed');
  return false;
};

var handleUsernameClick = function (event) {
  var user = event.target.innerText.slice(1);
  renderFeed(user);
  $button.text('Back');
};

$mracus.appendTo($friendslist);
$douglascalhoun.appendTo($friendslist);
$shawndrost.appendTo($friendslist);
$sharksforcheap.appendTo($friendslist);

  // Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleUpdateClick = function(event) {
    $updateFeed.text('Update Feed');
    $(".tweet").remove();
    renderFeed();
  }

  var handleUsernameClick = function(event) {
    var name = event.target.innerText;
    var username = name.slice(1);
    $(".tweet").remove();
    $updateFeed.text('Back');
    renderFeed(username);
  }

  function renderFeed(username) {
    if (username) {
      var tweetArray = streams.users[username];
    } else {
      var tweetArray = streams.home;
    }

    var index = tweetArray.length - 1;
    while (index >= 0) {
      var tweet = tweetArray[index];
      var $tweet = $('<div class="tweet"></div>');

      // create various elements of tweet
      var $profilePic = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"></img>');
      var $username = $('<span class="username">@' + tweet.user + '</span>');
      var $message = $('<div class="message">' + tweet.message + '</div>');
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="comment fas fa-comment"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-heart"></i>');
      var $share = $('<i class="share fas fa-share"></i>');

      // username click
      $username.on("click", handleUsernameClick);

      // append all to tweet
      $profilePic.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      // append tweets to feed
      $tweet.appendTo($feed);
      index -= 1;
    }

  }

  renderFeed();


  $title.on('click', handleTitleClick);
  $updateFeed.on("click", handleUpdateClick);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);
});


