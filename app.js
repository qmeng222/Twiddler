$(document).ready(function () {

  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $username;
  var $tweet;


  // Create event handler functions
  var renderFeed = function (event, user) {
    $feed.html('');
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      $tweet = $('<div class="tweet"></div>');

      var $profilePhoto = $('<img class="profile-photo" src="assets/img/visitor.png">');
      $username = $('<p class="username"></p>');
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<time class="timeago"></time>');
      var $comment = $('<div class="comment icon"></div>');
      var $commentIcon = $('<i class="fas fa-comment"></i>');
      var $retweet = $('<div class="retweet icon"></div>');
      var $retweetIcon = $('<i class="fas fa-retweet"></i>');
      var $like = $('<div class="like icon"></div>');
      var $likeIcon = $('<i class="fas fa-thumbs-up"></i>');
      var $share = $('<div class="share icon"></div>');
      var $shareIcon = $('<i class="fas fa-share"></i>');

      if (tweet.user === 'sharksforcheap') {
        $profilePhoto.attr("src", "assets/img/sharksforcheap.png");
      } else if (tweet.user === 'mracus') {
        $profilePhoto.attr("src", "assets/img/mracus.png");
      } else if (tweet.user === 'shawndrost') {
        $profilePhoto.attr("src", "assets/img/shawndrost.png");
      } else if (tweet.user === 'douglascalhoun') {
        $profilePhoto.attr("src", "assets/img/douglascalhoun.png");
      }
      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $timestamp.text(jQuery.timeago(tweet.created_at.toISOString()));

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $commentIcon.appendTo($comment);
      $retweet.appendTo($tweet);
      $retweetIcon.appendTo($retweet);
      $like.appendTo($tweet);
      $likeIcon.appendTo($like);
      $share.appendTo($tweet);
      $shareIcon.appendTo($share);

      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  var titleClick = function (event) {
    alert('The title of this page is: ' + event.target.innerText);
  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", titleClick);
  $updateFeedButton.on("click", renderFeed);


  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);

  renderFeed();

  $feed.on("click", ".username", function () {

    var user = $(this).text();
    console.log(user);
  });

});