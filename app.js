$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // create twiddler title
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  // create update feed button
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($app);

  // create feed container
  var $feed = $('<div id="feed"></div>')
  $feed.appendTo($app);

  // render feed utility function (event handler function)
  var renderFeed = function() {
    // prevent refresh
    event.preventDefault();
    // remove tweets from feed
    $feed.html('');
    // for each tweet object in the stream array (in reverse order)
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      //create a new Tweet UI component
      var $tweet = $('<div class="tweet"></div>');
      //WORK HERE NOW
      var profilePic = tweet.profilePhotoURL;
      var $profilePhoto = $('<img class="profile-photo">');
      $($profilePhoto).attr('src', profilePic);
      var $userName = $('<div class="username"></div>');
      $($userName).html('@' + tweet.user);
      var $message = $('<p class="message"></p>');
      $($message).html(tweet.message);
      var $timeStamp = $('<div class="timestamp"></div>');
      $($timeStamp).html(tweet.created_at);
      var $comment = $('<img class="icon comment" src="assets/icons/placeholder.png">')
      var $retweet = $('<img class="icon retweet" src="assets/icons/placeholder.png">');
      var $like = $('<img class="icon like" src="assets/icons/placeholder.png">');
      var $share = $('<img class="icon share" src="assets/icons/placeholder.png">');
      $profilePhoto.appendTo($tweet);
      $userName.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      //append the new Tweet UIC component to the feed
      $tweet.appendTo($feed);
      index -= 1;
    }
  }

  // update feed when button clicked
  $updateFeed.on("click", renderFeed);

  // populate feed on page load
  renderFeed();
});
