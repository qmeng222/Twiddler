$(document).ready(function () {

  jQuery("time.timeago").timeago();

  var $feed = $('#feed');
  var $update = $('#update-feed');

  var updateFeed = function () {
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $img = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png" alt="User Profile Picture"/>');
      var $twiddlerContainer = $('<div class="twiddler-container"><div/>');
      var $username = $('<div class="username">' + '@' + tweet.user + '<div/>');
      var $message = $('<div class="message">' + tweet.message + '<div/>');
      var $interactions =
        $('<div class="interactions"><i class="fas fa-comment"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i><i class="fas fa-share"></i><div/>');

      $twiddlerContainer.append($username).append($message).append($interactions);
      $tweet.prepend($img).append($twiddlerContainer);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  $update.on('click', function (event) {
    $feed.empty();
    updateFeed();
  });

  updateFeed();
});