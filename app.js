$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // create twiddler title
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);

  // create update feed button
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $btnSpan = $('<span id="btn-span"></span');
  $($btnSpan).append($updateFeed);
  $btnSpan.appendTo($app);

  // create feed container
  var $feed = $('<div id="feed"></div>')
  $feed.appendTo($app);

  // render feed utility function (event handler function)
  var renderFeed = function(user = 'home') {
    // remove tweets from feed
    $feed.html('');
    // for each tweet object in the stream array (in reverse order)
    var index;
    // create functionality for individual pages of tweets
    if (user === 'home') {
      index = streams[user].length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        var profilePic = tweet.profilePhotoURL;
        var $profilePhoto = $('<img class="profile-photo">');
        var $userName = $('<div class="username"></div>');
        var $header = $('<div id="tweetHeader"></div>');
        $profilePhoto.appendTo($header);
        $userName.appendTo($header)
        var $message = $('<p class="message"></p>');
        var $timeStamp = $('<div class="timestamp"></div>');
        var $comment = $('<i class="icon comment far fa-comment-alt"></i>')
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share far fa-share-square"></i>');
        var components = [$tweet, $header, $profilePhoto, $userName, $message, $timeStamp, $comment, $retweet, $like, $share];
        $($profilePhoto).attr('src', profilePic);
        $($userName).html('@' + tweet.user);
        $($message).html(tweet.message);
        $($timeStamp).html(jQuery.timeago(tweet.created_at));
        components.forEach(function(el, index) {
          $(el).appendTo($tweet);
        })
        //append the new Tweet UIC component to the feed
        $tweet.appendTo($feed);
        index -= 1;
      }
    }
    else {
      index = streams.users[user].length - 1;
      while(index >= 0){
        var tweet = streams.users[user][index];
        var $tweet = $('<div class="tweet"></div>');
        var profilePic = tweet.profilePhotoURL;
        var $profilePhoto = $('<img class="profile-photo">');
        var $userName = $('<div class="username"></div>');
        var $message = $('<p class="message"></p>');
        var $timeStamp = $('<div class="timestamp"></div>');
        var $comment = $('<i class="icon comment far fa-comment-alt"></i>')
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share far fa-share-square"></i>');
        var components = [$tweet, $profilePhoto, $userName, $message, $timeStamp, $comment, $retweet, $like, $share];
        $($profilePhoto).attr('src', profilePic);
        $($userName).html('@' + tweet.user);
        $($message).html(tweet.message);
        $($timeStamp).html(jQuery.timeago(tweet.created_at));
        components.forEach(function(el, index) {
          $(el).appendTo($tweet);
        })
        //append the new Tweet UIC component to the feed
        $tweet.appendTo($feed);
        index -= 1;
      }
    }
  }

  // helper function for username click
  var handleUsernameClick = function() {
    $updateFeed.text('Back');
    renderFeed(this.innerHTML.slice(1));
  }
  // update feed when button clicked
  $updateFeed.on("click", function() {
    $updateFeed.text('Update Feed');
    renderFeed('home');
  });

  // populate feed on page load
  renderFeed();

  // update to individual feed when username clicked
  $feed.on("click", 'div.username', handleUsernameClick);
});
