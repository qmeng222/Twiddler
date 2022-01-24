$(document).ready(function () {
  jQuery("time.timeago").timeago();

  // new elements
  var $app = $('#app');
  var $header = $('<div class="header"></div>');
  var $title = $('<h1 class="title"><i class="fas fa-thumbs-up"></i>TWIDDLER<i class="flipped fas fa-thumbs-up"></i></h1>');
  var $subtitle = $('<h5 class="subtitle">UNFORGETTABLE EDITION</h5>');
  var $updateFeed = $('<button id="update-feed">UPDATE FEED</button>');
  var $feed = $('<div id="feed"></div>');

  // modify elements
  $app.html('');


  // utility functions
  var renderFeed = function (user) {
    var index = (user) ? streams.users[user].length - 1 : streams.home.length - 1;

    while (index >= 0) {
      // var tweet = streams.home[index];
      var tweet = (user) ? streams.users[user][index] : streams.home[index];

      // new elements
      var $tweet = $('<div class="tweet"></div>');
      var $userDataContainer = $('<div class="user-data-container"></div>');
      var $profilePhoto = $('<img class="profile-photo">');
      var $username = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<span class="timestamp"></span>');
      var $iconContainer = $('<div class="icon-container"></div>');
      var $comment = $('<i class="icon comment fas fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like fas fa-heart"></i>');
      var $share = $('<i class="icon share fas fa-share"></i>');

      // modify elements
      $profilePhoto.attr("src", "assets/img/" + tweet.user + ".png");
      $username.text('@' + tweet.user);
      $username.hover(handleHoverIn, handleHoverOut);
      $timestamp.text('• ' + jQuery.timeago(tweet.created_at));
      $message.text(tweet.message);

      // append elements to the DOM
      $tweet.appendTo($feed);
      $profilePhoto.appendTo($userDataContainer);
      $username.appendTo($userDataContainer);
      $timestamp.appendTo($userDataContainer);
      $userDataContainer.appendTo($tweet);
      $message.appendTo($tweet);
      $iconContainer.appendTo($tweet);
      $comment.appendTo($iconContainer);
      $retweet.appendTo($iconContainer);
      $like.appendTo($iconContainer);
      $share.appendTo($iconContainer);

      // event listeners
      $username.on("click", handleUsernameClick);
      $(".icon").hover(handleHoverIn, handleHoverOut);

      index -= 1;
    }
  }

  // event handlers
  var updateFeedHandler = function () {
    $feed.empty();
    renderFeed();

    if ($updateFeed.html() === 'BACK') {
      $updateFeed.html('UPDATE FEED');
    }
  };

  var titleClickHandler = function (event) {
    console.log(event.target);
    alert('The title of this page is: ' + event.target.innerText);
  }

  var subtitleClickHandler = function () {
    window.open('https://sansforgetica.rmit.edu.au/', '_blank');
  }

  var handleUsernameClick = function (event) {
    var user = event.target.innerText.slice(1);
    $feed.empty();
    renderFeed(user);

    if ($updateFeed.html() === 'UPDATE FEED') {
      $updateFeed.html('BACK');
    }
  }

  var handleHoverIn = function () {
    $(this).addClass("hover");
  }

  var handleHoverOut = function () {
    $(this).removeClass("hover");
  }

  // event listeners
  $title.on('click', titleClickHandler);
  $title.hover(handleHoverIn, handleHoverOut);
  $subtitle.on('click', subtitleClickHandler);
  $subtitle.hover(handleHoverIn, handleHoverOut);
  $updateFeed.on('click', updateFeedHandler);
  $updateFeed.hover(handleHoverIn, handleHoverOut);

  // append elements to the DOM
  $header.appendTo($app);
  $title.appendTo($header);
  $subtitle.appendTo($header);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  // onload
  renderFeed();
});