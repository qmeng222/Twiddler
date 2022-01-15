$(document).ready(function() {
  var $app = $('#app');
  $app.html('');

  $('<h1>Twiddler</h1>').appendTo($app);
  $('<button id="update-feed">Update Feed</button>').appendTo($app);
  $('<div id="feed"></div>').appendTo($app);

  $feed = $('#feed');
  $updateFeed = $('#update-feed');

  var updateFeed = function() {
    renderFeed();
    $updateFeed.html('Update Feed');
  };

  var handleUsernameClick = function() {
    renderFeed(this.innerText.slice(1));
    $updateFeed.html('Back');
  };

  var renderFeed = function(inputUser) {
    var index = inputUser ? streams.users[inputUser].length - 1 : streams.home.length - 1;

    $($feed).empty();

    while (index >= 0) {
      var tweet = inputUser ? streams.users[inputUser][index] : streams.home[index];
      var img = '<img src="assets/img/' + tweet.user + '.png" class="profile-photo" width="40px" height="40px">';
      var user = '<div class="username">@' + tweet.user + '</div>';
      var message = '<div class="message">' + tweet.message + '</div>';
      var timestamp = '<div class="timestamp">' + $.timeago(tweet.created_at) + '</div>';

      var icons = ['<i class="comment far fa-comments"></i>', '<i class="retweet fas fa-retweet"></i>',
        '<i class="like far fa-heart"></i>', '<i class="share far fa-share-square"></i>'];

      var $tweet = $('<div class="tweet"></div>');
      $tweet.append(img);
      $tweet.append(user);
      $tweet.append(message);
      $tweet.append(timestamp);

      for (var i = 0; i < icons.length; i++) {
        $tweet.append(icons[i]);
      }
      $tweet.appendTo($feed);
      index -= 1;
    }

    $('.username').click(handleUsernameClick);
  };

  renderFeed();

  $($updateFeed).click(updateFeed);

});