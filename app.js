$(document).ready(function() {
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  var renderFeed = function(username) {
    $feed.html('');
    if (username === undefined) {
      var index = streams.home.length - 1;
    } else {
      var index = streams.users[username].length - 1;
    }

    while (index >= 0) {
      if (username === undefined) {
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[username][index];
      }

      var $tweet = $('<div class="tweet"></div>');

      var sourceImage = "./assets/img/" + tweet.user + "" + ".png";
      var $image = $('<img class="profile-photo" src='+sourceImage+'>');
      $image.appendTo($tweet);

      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);

      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $like = $('<i class="like icon far fa-thumbs-up"></i>');
      $like.appendTo($tweet);

      var $comment = $('<i class="comment icon fas fa-comments"></i>');
      $comment.appendTo($tweet);

      var $share = $('<i class="share icon fas fa-share"></i>');
      $share.appendTo($tweet);

      var $retweet = $('<i class="retweet icon fas fa-retweet"></i>');
      $retweet.appendTo($tweet);

      $tweet.appendTo($feed);

      $username.on('click', function(event) {
        $feed.html('');
        var name = event.target.innerText.slice(1);
        renderFeed(name);
        $('#update-feed').text('Back');

        $('#update-feed').on('click', function() {
          $('#update-feed').text('Update Feed');
        });
      });

      index--;
    }
  }

  $button.on('click', function() {
    renderFeed();
  });

  $button.prependTo($app);
  $title.prependTo($app);
  $feed.appendTo($app);

  renderFeed();
});


