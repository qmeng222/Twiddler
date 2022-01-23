$(document).ready(function(){
  // Add timeago liab
  jQuery("time.timeago").timeago();

  // Select the div with the ID #app
  var $app = $('#app');
  //$app.html('');

  // Create new html elements
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');


  // Append elements to the DOM, nested inside of the #app div
  $title.appendTo($app);
  $feed.appendTo($app);
  $updateFeed.appendTo($app);


  // Create event handler
  var render = function () {
    var index = streams.home.length - 1;

    while(index >= 0){
      // Get the length of all the tweet array
      var tweet = streams.home[index];

      // Create a $tweet element with class of "tweet"
      var $tweet = $('<div class="tweet"></div>');


      // Contain a child with classes
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $profilePhoto = $('<img class="profile-photo"></img>');
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="fas fa-comment comment"</i>');
      var $retweet = $('<i class="fas fa-retweet retweet"></i>');
      var $like = $('<i class="fas fa-heart like"></i>');
      var $share = $('<i class="fas fa-share share"></i>');


      // Set the format of how to dispaly tweet, with username and message
     // $tweet.text('@' + username+ ': ' + tweet.message);
      // Contain the messgae in the child with a class of "message"/"username"
      $message.text(tweet.message);
      // Contain the username prefix by @, in the child with a class of "username"
      $username.text('@' + tweet.user);


      // Append childs to tweet
      $message.appendTo($tweet);
      $username.appendTo($tweet);
      $profilePhoto.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);

      // Append tweet to feed
      $tweet.appendTo($feed);

      // Displays Tweets in reverse chronological order (newest first)
      index -= 1;
    }
  };
  render();



  // Set event listners
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText)
  });

  $updateFeed.on('click', function(event) {
    // Remove all child nodes and content, so it won't dispaly duplicate tweets
    $feed.empty();
    // invoke render function to generate tweet
    render();
  });


});