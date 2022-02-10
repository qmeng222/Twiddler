
$(document).ready(function(){
  // selecting already existing elements
  var $app = $('#app');
  $app.html('');
  jQuery("time.timeago").timeago();

  // new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>')
  var user = 'shawndrost' // array of users generated
  // streams.users = objects of key= user; value= array of objects w/ user and messages


  // event handlers functions
  var renderFeed = function (user) {
    // user = tweet.user || 'undefined';
    $feed.html('');
    console.log('users: ', streams.users, 'shawndrost:', streams.users.shawndrost)
    if (user === 'undefined') {
      (streams.home).forEach(function(tweet, index) {
        var tweet = streams.home[index]; // current tweet object
        var $tweet = $('<div class="tweet"></div>');
        var $img = $('<img src=' + tweet.profilePhotoURL +' alt="User Image" class="profile-photo">');
        var $user = $('<span class="username">@' + tweet.user + '</span>');
        var $message = $('<p class="message">' + tweet.message + '</p>');
        var $timeStamp = $.timeago(tweet.created_at)
        var $date = $('<span class="timestamp">' + $timeStamp + '</span>');

        ($img).appendTo($tweet);
        ($user).appendTo($tweet);
        ($message).appendTo($tweet);
        ($date).appendTo($tweet);

        var iconClass = ["fa-solid fa-comment comment", "fa-solid fa-retweet retweet",
          "fa-solid fa-heart like", "fa-solid fa-share share"];

        (iconClass).forEach(function(element, index) {
          var $iconElement = $('<i class="' + element +' icon"></i>');
          $iconElement.appendTo($tweet)
        });

        $tweet.prependTo($feed);
      });
      return $feed;
    } else {
      (streams.users[user]).forEach(function(tweet, index) {
        var tweet = streams.users[user][index]; // current tweet object
        var $tweet = $('<div class="tweet"></div>');

        var $img = $('<img src=' + tweet.profilePhotoURL +' alt="User Image" class="profile-photo">');
        var $user = $('<span class="username">@' + tweet.user + '</span>');
        var $message = $('<p class="message">' + tweet.message + '</p>');
        var $timeStamp = $.timeago(tweet.created_at)
        var $date = $('<span class="timestamp">' + $timeStamp + '</span>');

        ($img).appendTo($tweet);
        ($user).appendTo($tweet);
        ($message).appendTo($tweet);
        ($date).appendTo($tweet);


        var iconClass = ["fa-solid fa-comment comment", "fa-solid fa-retweet retweet",
          "fa-solid fa-heart like", "fa-solid fa-share share"];

        (iconClass).forEach(function(element, index) {
          var $iconElement = $('<i class="' + element +' icon"></i>');
          $iconElement.appendTo($tweet)
        });

        $tweet.prependTo($feed);
      });

      return $feed;
    }

  }

  var handleTitleClicks = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  };

  // event listeners
  $title.on('click', handleTitleClicks);
  $button.on('click', renderFeed(user));

  // ($users).forEach(function(user, index) {
  //   user.on('click', renderFeed(user));
  // });

  // append
  $title.appendTo($app);
  $button.appendTo($app);
  renderFeed(user);
  $feed.appendTo($app);

});



