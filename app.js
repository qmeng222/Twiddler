
$(document).ready(function() {

  $("time.timeago").timeago();

  // *** select already existing elements
  var $body = $('body');

  // *** create new HTML elements
  var $app = $('#app'); // creates a div of id app
  // $app.html(''); //  forces us ot use jquery and not hard code in html
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">UpdateFeed</button>');
  var $feed = $('<div id="feed" ></div>');




  // *** create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var renderFeed = function(event) {
    // remove all previously existing Tweets from the Feed
    $feed.html('');
    var index = streams.home.length - 1; // index of last tweet
    // For each Tweet object in the stream array (in reverse order)
    while(index >= 0){
      var tweet = streams.home[index];  // an obj that contains user, message, timestamp and photo
      // Create a new Tweet UI component
      var $tweet = $('<div class="tweet"></div>');
      // inside each Tweet, we add ui comps for photo, user, message, timestamp and 4 icons
      var $profilePhoto = $('<img class="profile-photo" src=' + '"' + tweet.profilePhotoURL + '" >');

      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);

      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);

      var $timestamp = $('<time class="timestamp"> </time>');
      var formattedDate = $.timeago(tweet.created_at);
      $timestamp.text(formattedDate);

      var $comment = $('<i class="icon comment fas fa-solid fa-comment" ></i>');
      var $retweet = $('<i class="icon retweet fas fa-solid fa-retweet"></i>');
      var $like = $('<i class="icon like fas fa-solid fa-heart"></i>');
      var $share = $('<i class="icon share fas fa-solid fa-share"></i>');

      // Append the new Tweet UI component to the Feed
      $tweet.appendTo($feed);

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);

      $message.appendTo($tweet);

      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);

      index -= 1;
    }
  }

  // *** set event listeners (providing appropriate handlers and input)
  $title.on("click", handleTitleClick);
  $updateFeed.on("click", renderFeed);

  // *** Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);









// *** document ready closing
});