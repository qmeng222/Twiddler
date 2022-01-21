$(document).ready(function () {
  jQuery("time.timeago").timeago();

  // new elements
  var $app = $('#app');
  var $title = $('<h1 class="title">Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed"></button>');
  var $feed = $('<div id="feed"></div>');

  // modify elements
  $app.html('');
  $updateFeed.html('Update Feed');

  // event handler functions
  var renderFeed = function (user) {
    var index = (user) ? streams.users[user].length - 1 : streams.home.length - 1;

    while (index >= 0) {
      // var tweet = streams.home[index];
      var tweet = (user) ? streams.users[user][index] : streams.home[index];

      // new elements
      var $tweet = $('<div class="tweet"></div>');
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
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $message.text(tweet.message);

      // append elements to the DOM
      $tweet.appendTo($feed);
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $message.appendTo($tweet);
      $iconContainer.appendTo($tweet);
      $comment.appendTo($iconContainer);
      $retweet.appendTo($iconContainer);
      $like.appendTo($iconContainer);
      $share.appendTo($iconContainer);

      //event handlers


      // event listeners
      $username.on("click", handleUsernameClick);

      index -= 1;
    }
  }

  // event handlers
  var updateFeedHandler = function () {
    $feed.empty();
    renderFeed();

    if ($updateFeed.html() === 'Back') {
      $updateFeed.html('Update Feed');
    }
  };

  var titleClickHandler = function (event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleUsernameClick = function (event) {
    var user = event.target.innerText.slice(1);
    $feed.empty();
    renderFeed(user);

    if ($updateFeed.html() === 'Update Feed') {
      $updateFeed.html('Back');
    }
  }

  // event listeners
  $title.on('click', titleClickHandler);
  $updateFeed.on('click', updateFeedHandler);

  // append elements to the DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  // onload
  renderFeed();
});