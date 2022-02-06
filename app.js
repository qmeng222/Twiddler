$(document).ready(function(){
  //SELECT already existing elements or div with ID #app from the DOM
    //use jQuery's fn to select all elements w/ ID #app already appended to DOM w/ CSS selector/string as input
  var $app = $('#app');
  $app.html('');

  //GENERATE or create new elements w/ raw HTML as input, not appended to DOM, only exist in memory as variable
  var $title = $('<h1>Twiddler</h1>');
  var $updatefeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  //CREATE event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  //use for handle update click and back click
  var handleUpdateClick = function(event) {
    $updatefeed.text('Update Feed');
    $(".tweet").remove();
    renderFeed();
  }

  var handleUserClick = function(event) {
    var name = event.target.innerText;
    var username = name.slice(1);
    $(".tweet").remove();
    $updatefeed.text('Back');
    renderFeed(username);
  }

  //SET click event listeners on the element providing appropriate handlers as input
  $title.on('click', handleTitleClick);
  $updatefeed.on("click", handleUpdateClick);

  function renderFeed(username) {
    if (username) {
      var tweetArray = streams.users[username];
    } else {
      var tweetArray = streams.home;
    }

    var index = tweetArray.length - 1;
    while ( index >= 0 ) {
      var tweet = tweetArray[index];
      var $tweet = $('<div class="tweet"></div>');

      //create new elements for tweet
      var $profilePic = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"></img>');
      var $username = $('<span class="username">@' + tweet.user + '</span>');
      var $message = $('<div class="message">' + tweet.message + '</div>');
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="comment fas fa-comment"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-heart"></i>');
      var $share = $('<i class="share fas fa-share"></i>');

      // make username clickable
      $username.on("click", handleUserClick);

      //append stuff to tweet
      $profilePic.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      //append tweets to feed
      $tweet.appendTo($feed);
      index -= 1;
    }

  }

  renderFeed();

  //APPEND new HTML element sto the DOM, nested inside of the #app div
  $title.appendTo($app);
  $updatefeed.appendTo($app);
  $feed.appendTo($app);

  window.isItBeautifulYet = true
});