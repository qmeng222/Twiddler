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
    // remove tweets from feed
    $feed.html('');
    // console.log(event);
    // for each tweet object in the stream array (in reverse order)
    var index;
    // create functionality for individual pages of tweets
    if (event.target.outerText === 'Update Feed' || event.target.outerText === 'Back' || event.target === document) {
      $updateFeed.text('Update Feed');
      index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        // console.log(tweet);
        //create a new Tweet UI component
        var $tweet = $('<div class="tweet"></div>');
        var profilePic = tweet.profilePhotoURL;
        var $profilePhoto = $('<img class="profile-photo">');
        $($profilePhoto).attr('src', profilePic);
        var $userName = $('<div class="username"></div>');
        $($userName).html('@' + tweet.user);
        var $message = $('<p class="message"></p>');
        $($message).html(tweet.message);
        var $timeStamp = $('<div class="timestamp"></div>');
        $($timeStamp).html(jQuery.timeago(tweet.created_at));
        var $comment = $('<i class="icon comment far fa-comment-alt"></i>')
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share far fa-share-square"></i>');
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
    else {
      $updateFeed.text('Back');
      var user = event.target.innerHTML.slice(1);
      index = streams.users[user].length - 1;
      console.log(streams.users[user]);
      while(index >= 0){
        var tweet = streams.users[user][index];
        // console.log(tweet);
        //create a new Tweet UI component
        var $tweet = $('<div class="tweet"></div>');
        var profilePic = tweet.profilePhotoURL;
        var $profilePhoto = $('<img class="profile-photo">');
        $($profilePhoto).attr('src', profilePic);
        var $userName = $('<div class="username"></div>');
        $($userName).html('@' + tweet.user);
        var $message = $('<p class="message"></p>');
        $($message).html(tweet.message);
        var $timeStamp = $('<div class="timestamp"></div>');
        $($timeStamp).html(jQuery.timeago(tweet.created_at));
        var $comment = $('<i class="icon comment far fa-comment-alt"></i>')
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share far fa-share-square"></i>');
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
  }

  // update feed when button clicked
  $updateFeed.on("click", renderFeed);

  // populate feed on page load
  renderFeed();

  // update to individual feed when username clicked
  $feed.on("click", ".username", renderFeed);
});
