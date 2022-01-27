$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');

  var $updateButton = $('<button id="update-feed">Update Feed</button>');

  var $feedBox = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function () {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $('<img>',{class:'profile-photo', src:'assets/img/' + tweet.user +'.png'}).appendTo($tweet);
      var $username = $('<span class="username"></span>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);
      var $message = $('<p class="message"></p>');
      $message.text(tweet.message);
      $message.appendTo($tweet);
      var $timestamp = $('<span class="timestamp"><span>');
      $timestamp.text(jQuery.timeago(new Date()));
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
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      index -= 1;
    }
  }
  var handleUpdateButton = function() {
    $("#feed").empty();
    renderFeed();
  };

  //Set event listeners (providing appropriate handlers as input)
  $updateButton.on("click", handleUpdateButton);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateButton.appendTo($app);
  $feedBox.appendTo($app);
  renderFeed();

});