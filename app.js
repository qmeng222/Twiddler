// .html('') clears body
// When our UI is complete, our users will be able to see:
// A Heading displaying the title of the application.
// An Update Feed Button
// Their Home Feed, with a list view displaying each of their friends' Tweets
// Tweet Components, each identical in structure, complete with a:
// Profile Photo
// Username, with the format "@username"
// Tweet Message
// Human Readable Timestamp", like "2 minutes ago"
// Set of Four Icons:
// Comment
// Retweet
// Like
// Share
// An Individual User Feed, with a list view of each Tweet made by that specific user.
// A Home Button, allowing the user to navigate back to the Home Feed.

$(document).ready(function(){
  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });

  var $app = $('#app');
  $app.html('');

// append followed by click events

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $update = $('<button id="update-feed">Update Feed</button>');
  $update.appendTo($app);

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  $update.on('click', function(event){
    $feed.html('');
    if ($update.html() === 'Back') {
      $update.html('Update Feed');
    }
    renderFeed();
  });

  function handleUsernameClick(event) {
  var $targetUser = $(event.target);
  var usernameOnly = $targetUser.html().slice(1);
   if ($update.html() === 'Update Feed'){
   $update.html('Back');
  }
    renderFeed(usernameOnly);
  }

  var renderFeed = function(userName) {
    $feed.html('');

    // user info is sorted by objects, call to info

  if (userName) {
    var streamType = streams.users[userName];
  } else {
    var streamType = streams.home;
  }
    for (var i = streamType.length - 1; i >= 0; i--){
      var tweet = streamType[i];
      var $tweet = ('<div class="tweet"></div>');
      var $username = $('<div class="username"></div>').text('@' + tweet.user).on("click", handleUsernameClick);
      var $message = $('<div class="message"></div>');
      var $timeStamp = $('<time class="timestamp"></time>');
      var $profilePhoto = $('<img src="./assets/img/' + tweet.user + '.png" class="profile-photo"></img>');
      var $commentIcon = $('<i class="icon comment fa-solid fa-comments"></i>');
      var $retweetIcon = $('<i class="icon retweet fa-solid fa-retweet"></i>');
      var $likeIcon = $('<i class="icon like fa-solid fa-thumbs-up"></i>');
      var $shareIcon = $('<i class="icon share fa-solid fa-share-from-square"></i>');
      var timeAgotimeStamp = $.timeago(tweet.created_at);
      // append all information that will fit on a post

      $message.text(tweet.message);
      $username.text('@' + tweet.user);
      $timeStamp.text(timeAgotimeStamp);var $tweet = $('<div class="tweet"></div>');
      $message.appendTo($tweet);
      $username.appendTo($tweet);
      $profilePhoto.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);
      $tweet.appendTo($feed);
      $feed.appendTo($app);
      }
    };
  renderFeed();
});
window.isItBeautifulYet = true;