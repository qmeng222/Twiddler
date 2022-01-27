$(document).ready(function(){
  var $app = $('#app');
  //$app.html('');
  var $feed = $('#feed');

  var writeTweets = function() {
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');

      var $pfp = $('<img class="profile-photo" src="'+tweet.profilePhotoURL+'">');

      var $username = $('<h3 class="username"></h3');
      $username.text('@' + tweet.user);

      var $message = $('<p class="message"></p>');
      $message.text(tweet.message);

      var $infobar = $('<div class="infobar"></div>')

      var $timestamp = $('<p class="timestamp"></p>');
      $timestamp.text(tweet.created_at);

      var $comment = $('<img class="icon comment" src="assets/icons/placeholder.png">');
      var $retweet = $('<img class="icon retweet" src="assets/icons/placeholder.png">');
      var $like = $('<img class="icon like" src="assets/icons/placeholder.png">');
      var $share = $('<img class="icon share" src="assets/icons/placeholder.png">');
      $infobar.append($timestamp, $comment, $retweet, $like, $share);

      $tweet.append($pfp, $username, $message, $infobar);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };
  writeTweets();

    var btnHandler = function(event) {
      $feed.empty();
      writeTweets();
    };

    $(':button,#update-feed').on('click', btnHandler);
});