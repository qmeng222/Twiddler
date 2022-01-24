$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');

  // App Title
  var $title = $('<h1 id="title">Twiddler</h1>');
  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  };
  $title.on("click", handleTitleClick);
  $title.appendTo($app);

  // Subtitle
  var $subtitle = $('<h5 id="subtitle">Twiddle your thumbs</h5>');
  $subtitle.appendTo($app);

  // Refresh Feed Button
  var $feedButton = $('<button id="update-feed">Update Feed</button>');
  var renderFeed = function() {
    $('#feed').empty();
    openFeed();
  };
  $feedButton.on("click", renderFeed);
  $feedButton.appendTo($app);

  // Change Button Names
  var $backButton = $('<button id="update-feed">Back</button>');
  var changeButtonName = function () {
    $feedButton.replaceWith($backButton);
    $backButton.on("click", handleBackButtonClick);
  };

  // Back Button Click
  var handleBackButtonClick = function () {
    $backButton.replaceWith($feedButton);
    renderFeed();
    $feedButton.on("click", renderFeed);
  };

  // Icon Hover Color Change
  var hoverColor = function (event) {
    $(event).on({
      mouseenter: function () {
        $(event).css({
          color: "red"
        });
      },
      mouseleave: function () {
        $(event).css({
          color: "white"
        });
      },
    });
  };

  // Get Tweet Info
  var getTweetInfo = function (tweet) {
    var $tweet = $('<div class="tweet"></div>');

      // Tweet Profile Photo
      var $image = getImage(tweet.user);
      $image.appendTo($tweet);

      // Tweet Message
      var $message = $('<p class="message"></p>');
      var message = tweet.message;
      $message.appendTo($tweet);

      // Tweet Username
      var $username = $('<div class="username"></div>');
      var username = '@' + tweet.user;
      $username.appendTo($tweet);

      // Tweet Time
      var $timestamp = $('<div class="timestamp"></div>');
      var timestamp = jQuery.timeago(tweet.created_at);
      $timestamp.appendTo($tweet);

      // Tweet Icons
      var $comment = $('<i class="comment fas fa-comment"></i>');
      $comment.appendTo($tweet);
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      $retweet.appendTo($tweet);
      var $like = $('<i class="like fas fa-heart"></i>');
      $like.appendTo($tweet);
      var $share = $('<i class="share fas fa-share"></i>');
      $share.appendTo($tweet);

      // Tweet Icon Color Change
      $comment.mouseover(hoverColor($comment));
      $retweet.mouseover(hoverColor($retweet));
      $like.mouseover(hoverColor($like));
      $share.mouseover(hoverColor($share));

      // View User Profile
      var handleUsernameClick = function () {
        $('#feed').empty();
        changeButtonName();
        var username = tweet.user;
        var userTweets = streams.users[username];
        var index = userTweets.length - 1;
        while(index >= 0){
          var tweetInfo = userTweets[index];
          getTweetInfo(tweetInfo);
          index -= 1;
        }
      };
      $username.on("click", handleUsernameClick);

      // Display Tweets
      $username.text(username);
      $message.text(message);
      $timestamp.text(timestamp);
      $tweet.appendTo($feed);
  };

  // Get Tweet Profile Photo
  var getImage = function (user) {
    if (user === 'douglascalhoun') return $('<img class="profile-photo" src="assets/img/douglascalhoun.png"></img>');
    if (user === 'mracus') return $('<img class="profile-photo" src="assets/img/mracus.png"></img>');
    if (user === 'sharksforcheap') return $('<img class="profile-photo" src="assets/img/sharksforcheap.png"></img>');
    if (user === 'shawndrost') return $('<img class="profile-photo" src="assets/img/shawndrost.png"></img>');
    if (user === 'visitor') return $('<img class="profile-photo" src="assets/img/visitor.png"></img>');
  };

  // Populate Feed
  var $feed = $('<div id="feed"></div>');
  var openFeed = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      getTweetInfo(tweet);
      index -= 1;
    }
  };
  openFeed();
  $feed.appendTo($app);
  window.isItBeautifulYet = true;
});