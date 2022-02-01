
$(document).ready(function() {
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<div id="title">Twiddler</div>');
  var $updateFreed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function(parent) {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePic = $(`<img class="profile-photo" src="assets/img/${tweet.user}.png">`);
      var $username = $('<span class="username"></span>')
      var $message = $(`<p class="message">${tweet.message}</p>`)
      var $timestamp = $(`<span class="timestamp">${tweet.created_at}</span>`)
      var $comment = $(`<img class="icon comment" src="assets/icons/placeholder.png">`);
      var $retweet = $(`<img class="icon retweet" src="assets/icons/placeholder.png">`);
      var $like = $(`<img class="icon like" src="assets/icons/placeholder.png">`);
      var $share = $(`<img class="icon share" src="assets/icons/placeholder.png">`);
      $username.text('@' + tweet.user);
      $tweet.appendTo(parent);
      $profilePic.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      index -= 1;
    }
  }
  renderFeed($feed);

  // Set event listeners
  $updateFreed.on("click", function(e) {
    $(".tweet").remove();
    renderFeed($feed);
  });

 // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFreed.appendTo($app);
  $feed.appendTo($app);
  $feed.appendTo($app);
  $feed.appendTo($app);
});






