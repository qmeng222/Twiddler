$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Create HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  };
  var handleUpdateFeed = function() {
    $updateFeedButton.text('Update Feed');
    renderFeed();
  };
  var handleUsernameClick = function(event) {
    $updateFeedButton.text('Back');
    // console.log(event);
    var currentUser = event.target.innerText.substring(1);
    // console.log(streams.users[currentUser]);
    // console.log(currentUser);
    renderFeed(currentUser);
  };

  // Append elements to the DOM, nested inside of the #app div
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);

  // Click event listeners
  $title.on("click", handleTitleClick);
  $updateFeedButton.on('click', handleUpdateFeed);
  $feed.on('click', '.username', handleUsernameClick);

  // Create event handler functions
  var renderFeed = function(user) {
    $feed.empty();

    if (user === undefined) {
      var index = streams.home.length - 1;
    } else {
      var index = streams.users[user].length - 1;
    }

    while(index >= 0) {

      if (user === undefined) {
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[user][index];
      }

      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<span class="timestamp"></span>');
      var $profilePhoto = $('<img class="profile-photo">');
      var $comment = $('<i class="icon comment fa-solid fa-comment">');
      var $retweet = $('<i class="icon retweet fa-solid fa-retweet">');
      var $like = $('<i class="icon like fa-solid fa-heart">');
      var $share = $('<i class="icon share fa-solid fa-arrow-up-from-bracket">');

      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $timestamp.text($.timeago(tweet.created_at));
      $message.text(tweet.message);
      $username.text('@' + tweet.user);

      if (tweet.user === 'shawndrost') {
        $profilePhoto.attr('src', 'assets/img/shawndrost.png');
      } else if (tweet.user === 'sharksforcheap') {
        $profilePhoto.attr('src', 'assets/img/sharksforcheap.png');
      } else if (tweet.user === 'mracus') {
        $profilePhoto.attr('src', 'assets/img/mracus.png');
      } else if (tweet.user === 'douglascalhoun') {
        $profilePhoto.attr('src', 'assets/img/douglascalhoun.png');
      } else {
        $profilePhoto.attr('src', 'assets/img/visitor.png');
      }

      $tweet.appendTo($feed);
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $timestamp.appendTo($tweet);

      index -= 1;
    };
  };

  renderFeed();

  window.isItBeautifulYet = true;
});