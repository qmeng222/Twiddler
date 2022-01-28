$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $topBar = $('<div id="header"></div>');
  var $title = $('<h1 id="main-title" class="top-bar">Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed" class="top-bar">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function(user) {
    $feed.html('');
    var tweetStream = streams.home;

    if (typeof(user) === 'string') {
      clickedOnUsername = true;
      tweetStream = streams.users[user];
    }

    var index = tweetStream.length - 1;
    while (index >= 0) {
      var tweet = tweetStream[index];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message"></p>');
      var $username = $('<span class="username"></span>');
      var $profilePhoto = $('<img class="profile-photo">');
      var $timestamp = $('<span class="timestamp"></span>');
      var $actionIconDiv = $('<div class="action-icons"></div>');
      var $comment = $('<i class="icon comment fas fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like fas fa-heart"></i>');
      var $share = $('<i class="icon share fas fa-external-link-alt"></i>');

      $message.text(tweet.message);
      $username.text('@' + tweet.user);
      $profilePhoto.attr("src", tweet.profilePhotoURL);
      $timestamp.text($.timeago(tweet.created_at));

      $tweet.append($profilePhoto)
            .append($username)
            .append($timestamp)
            .append($message)
            .append($comment)
            .append($retweet)
            .append($like)
            .append($share)
            .addClass(tweet.user);
      $tweet.appendTo($feed);
      index--;
    }
    $feed.appendTo($app);

    if ($updateFeed.text() === 'Back') {
      $updateFeed.text('Update Feed');
    }
  }

  var handleUsernameClick = function(event) {
    var username = event.target.innerText.substring(1);
    renderFeed(username);
    $updateFeed.text('Back');
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', function() {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  $updateFeed.on('click', renderFeed);

  //
  //
  // why doesn't this work below? ---> $('.username').on('click', handleUsernameClick);
  //
  //
  $(document).on('click', '.username', handleUsernameClick);//function() {
  //   if (event !== undefined) {
  //     var username = event.target.innerText;
  //     handleUsernameClick(username);
  //   }
  // });
  //
  //
  //
  //

  // Append new HTML elements to the DOM
  $topBar.append($title).append($updateFeed);
  $topBar.appendTo($app);

  // Function to update feed and add to $app
  renderFeed();
});


// Assignment: Twiddler 2.0
// Issue: Cypress test suite is not passing the “clicking on a username in a Tweet” test, but it works perfectly in the browser.
// Cause: Not sure - the tweets aren’t hidden, they’re being filtered from the source.
// Actions Taken: To filter the tweets, I call renderFeed again with a user parameter being passed in:
// $(document).on('click', '.username', function() {
//   if (event !== undefined) {
//     var username = event.target.innerText;
//     renderFeed(username);
//   }
// });
// (Cypress was breaking if I didn’t check for an undefined event, even though I think it would always be defined anyways?)
// Then I check if the type of the parameter passed in is a string, and if so then I add that as a bool val to be able to toggle the button later.
// var renderFeed = function(user) {
//   $feed.html('');
//   var tweetStream = streams.home;
//   var clickedOnUsername = false;
//   var userWithoutAt;

//   if (typeof(user) === 'string') {
//     clickedOnUsername = true;
//     userWithoutAt = user.substring(1);
//     // update tweet stream that's being iterated through if
//     // a username was clicked on.
//     tweetStream = streams.users[userWithoutAt];
//   }

//   var index = tweetStream.length - 1;
//   while (index >= 0) {
//     var tweet = tweetStream[index];
//     var $tweet = $('<div class="tweet"></div>');
//     var $message = $('<p class="message"></p>');
//     var $username = $('<span class="username"></span>');
//     var $profilePhoto = $('<img class="profile-photo">');
//     var $timestamp = $('<span class="timestamp"></span>');
//     var $actionIconDiv = $('<div class="action-icons"></div>');
//     var $comment = $('<i class="icon comment fas fa-comment"></i>');
//     var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
//     var $like = $('<i class="icon like fas fa-heart"></i>');
//     var $share = $('<i class="icon share fas fa-external-link-alt"></i>');
//     userWithoutAt = tweet.user;

//     $message.text(tweet.message);
//     $username.text('@' + tweet.user);
//     $profilePhoto.attr("src", tweet.profilePhotoURL);
//     $timestamp.text($.timeago(tweet.created_at));

//     $tweet.append($profilePhoto)
//           .append($username)
//           .append($timestamp)
//           .append($message)
//           .append($comment)
//           .append($retweet)
//           .append($like)
//           .append($share)
//           .addClass(userWithoutAt);
//     $tweet.appendTo($feed);
//     index--;
//   }

//   if (clickedOnUsername) {
//     $updateFeed.text('Back');
//   } else {
//     $updateFeed.text('Update Feed');
//   }

//   $feed.appendTo($app);
// }

// Possible Solution: I’ve tried changing the order of things, but I have no idea what to do, since everything works just as expected on the site itself. It’s only the test suite that’s failing me.