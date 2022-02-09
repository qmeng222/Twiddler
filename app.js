
$(document).ready(function(){
  // selecting already existing elements
  var $app = $('#app');
  $app.html('');
  ("time.timeago").timeago();

  // new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>')

  // event handlers functions

  var renderFeed = function () {
    $feed.html('');
    (streams.home).forEach(function(tweet, index) {
      var tweet = streams.home[index]; // current tweet object
      var $tweet = $('<div class="tweet"></div>');
      var $img = $('<img src=' + tweet.profilePhotoURL +' alt="User Image" class="profile-photo">');
      var $user = $('<span class="username">@' + tweet.user + '</span>');
      var $message = $('<p class="message">' + tweet.message + '</p>');
      var $date = $('<span class="timestamp">' + tweet.created_at + '</span>');
      var iconClass = ["comment", "retweet", "like", "share"];
      var $timeStamp = timeago(tweet.created_at)
      console.log($timeStamp)


      ($img).appendTo($tweet);
      ($user).appendTo($tweet);
      ($message).appendTo($tweet);
      ($timeStamp).appendTo($tweet);

      (iconClass).forEach(function(element) {
        var $iconElement = $('<img src="./assets/icons/placeholder.png" class="icon, '+ element +'">');
        return $iconElement.appendTo($tweet)
      });

      $tweet.prependTo($feed);
    });

    return $feed;
  }

  var handleTitleClicks = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  };

  // event listeners
  $title.on('click', handleTitleClicks);
  $button.on('click', renderFeed);


  // append
  $title.appendTo($app);
  $button.appendTo($app);
  renderFeed();
  $feed.appendTo($app);

});



