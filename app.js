$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new html elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update</button>')
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function(username) {
    $feed.html('');

    if (username !== undefined) {
      var index = streams.users[username].length - 1;
    }
    if (username === undefined) {
      var index = streams.home.length - 1;
    }
    while(index >= 0){
      if (username !== undefined) {
        var tweet = streams.users[username][index];
      }
      if (username === undefined) {
        var tweet = streams.home[index];
      }
      var $tweet = $('<div class="tweet"></div>');

      var $photo = $('<img class="profile-photo" src="./assets/img/' + tweet.user + '.png"></img>');
      var $username = $('<p class="username">' + '@' + tweet.user + '</p>');
      var $message = $('<p class="message">' + tweet.message + '<br>' + '</p>');
      var $timestamp = $('<p class="timestamp">' + jQuery.timeago(tweet.created_at) + '</p>');
      var $comment = $('<i class="comment fas fa-comment fa-lg"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet fa-lg"></i>');
      var $like = $('<i class="like fas fa-thumbs-up fa-lg"></i>');
      var $share = $('<i class="share fas fa-share-square fa-lg"></i>');

      $photo.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $tweet.appendTo($feed);

      $username.on("click", function(event) {
        var handleUsernameClick = event.target.innerText.slice(1);
        $updateFeed.text('Back');
        $feed.html('');
        renderFeed(handleUsernameClick);

        $updateFeed.on("click", function() {
          $updateFeed.text('Update')
        });
      });

      index -= 1;
    }
  }
  renderFeed();

  // Set event listeners
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $updateFeed.on("click", function() {
    renderFeed();
  });

  // Append new html elements to DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);
});
window.isItBeautifulYet = true;
