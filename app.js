$(document).ready(function() {
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');

  var $refreshButtonSpace = $('<div class="button"></div>');

  var $refreshButton = $('<button id="update-feed">Update Feed</button>');

  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function(selectedUser) {
    if (selectedUser === undefined) {
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        // Create seperate element for each tweet
        var $tweet = $('<div class="tweet"></div>');

        // Add components to tweet
          // Profile Photo
          var $profilePhoto = $('<img class="profile-photo"></img>');
          $profilePhoto.attr("src", tweet.profilePhotoURL);
          $profilePhoto.appendTo($tweet);

          // UserName
          var $userName = $('<div class="username"></div>');
          $userName.text('@' + tweet.user);
          $userName.appendTo($tweet);

          // Message
          var $message = $('<p class="message"></p>');
          $message.text(tweet.message);
          $message.appendTo($tweet);

          // Timestamp
          var $timeStamp = $('<div class="timestamp"></div>');
          $timeStamp.text(jQuery.timeago(tweet.created_at));
          $timeStamp.appendTo($tweet);

          // Icons
          var $comment = $('<i class="icon comment fas fa-comment-dots"></i>');
          $comment.appendTo($tweet);

          var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
          $retweet.appendTo($tweet);

          var $like = $('<i class="icon like fa-solid fa-thumbs-up"></i>');
          $like.appendTo($tweet);

          var $share = $('<i class="icon share fa-solid fa-share"></i>');
          $share.appendTo($tweet);

        //Append to feed and loop
        $tweet.appendTo($feed);
        index -= 1;

      }
    } else { // Renders feed for clicked on user
      var index = streams.users[selectedUser].length - 1;
      while(index >= 0) {
        var tweet = streams.users[selectedUser][index];
        // Create seperate element for each tweet
        var $tweet = $('<div class="tweet"></div>');

        // Add components to tweet
          // Profile Photo
          var $profilePhoto = $('<img class="profile-photo"></img>');
          $profilePhoto.attr("src", tweet.profilePhotoURL);
          $profilePhoto.appendTo($tweet);

          // UserName
          var $userName = $('<div class="username"></div>');
          $userName.text('@' + tweet.user);
          $userName.appendTo($tweet);

          // Message
          var $message = $('<p class="message"></p>');
          $message.text(tweet.message);
          $message.appendTo($tweet);

          // Timestamp
          var $timeStamp = $('<div class="timestamp"></div>');
          $timeStamp.text(jQuery.timeago(tweet.created_at));
          $timeStamp.appendTo($tweet);

          // Icons
          var $comment = $('<i class="icon comment fas fa-comment-dots"></i>');
          $comment.appendTo($tweet);

          var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
          $retweet.appendTo($tweet);

          var $like = $('<i class="icon like fa-solid fa-thumbs-up"></i>');
          $like.appendTo($tweet);

          var $share = $('<i class="icon share fa-solid fa-share"></i>');
          $share.appendTo($tweet);

        //Append to feed and loop
        $tweet.appendTo($feed);
        index -= 1;
      }
    }
  };
  renderFeed();

  // Set event listeners (providing appropriate handlers as input)

  $refreshButton.on('click', function(event) {
    // Remove all previously existing Tweets from the Feed
    $('#feed').empty();
    $('#update-feed').html('Update Feed');
    // For each Tweet object in the stream array (in reverse order)
    // Create a new Tweet UI component
    // Append the new Tweet UI component to the Feed
    renderFeed();


  });

  $(document).on('click', '.username', function() {
    $('#feed').empty();
    $('#update-feed').html('Back');
    currentTag = $(this).text();
    currentUser = currentTag.substring(1);
    renderFeed(currentUser);
  });

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $refreshButton.appendTo($refreshButtonSpace);
  $refreshButtonSpace.appendTo($app);
  $feed.appendTo($app);

});

window.isItBeautifulYet = true;



