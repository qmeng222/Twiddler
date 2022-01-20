$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Select already exisiting elements

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id=update-feed>Update Feed</button>');
  var $feed = $('<div id=feed></div>');

  // Create event handler function
  var renderFeed = function(array, user) {
    var index = streams.home.length - 1;
    while(index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $photo = $('<img class="profile-photo">');
      var $user = $('<div class="username"></div>');
      var $message = $('<p class="message"></p>');
      var $time = $('<span class="timestamp"></span>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="far fa-comment comment"></i>');
      var $retweet = $('<i class="fas fa-retweet retweet"></i>');
      var $like = $('<i class="far fa-heart like"></i>');
      var $share = $('<i class="fas fa-share share"></i>');

      $photo.attr('src', 'assets/img/' + tweet.user + '.png')
      $user.text('@' + tweet.user);
      $message.text(tweet.message);
      $time.text(jQuery.timeago(tweet.created_at));

      // $('<i class="far fa-comment"></i>').appendTo($comment);
      // $('<i class="fas fa-retweet"></i>').appendTo($retweet);
      // $('<i class="far fa-heart"></i>').appendTo($like);
      // $('<i class="fas fa-share"></i>').appendTo($share);

      $comment.appendTo($icon);
      $retweet.appendTo($icon);
      $like.appendTo($icon);
      $share.appendTo($icon);

      $photo.appendTo($tweet);
      $user.appendTo($tweet);
      $message.appendTo($tweet);
      $time.appendTo($tweet);
      $icon.appendTo($tweet);

      $tweet.appendTo($feed);
      index -= 1;
    }
  }

  renderFeed(streams.home);

  // Set event listeners
  $button.on('click', function() {
    $('div.tweet').remove();
    renderFeed(streams.home);
  });

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

});