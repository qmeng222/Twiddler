window.selectedUser = null;
$(document).ready(function(){
  var $app = $('#app');
  //$app.html('');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);

  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  $button.appendTo($app);
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  renderTweets();

  $button.on("click", function(event) {
    if (selectedUser !== null) {
      selectedUser = null;
      $button.text("Update Feed");
    }
    renderTweets();
  });
});

function renderTweets() {
  var $app = $('#app');
  var $feed = $('#feed');
  var collectionOfTweets = getTweetData();
  console.log(collectionOfTweets);
  var index = collectionOfTweets.length - 1;
  $feed.html('');
  while(index >= 0) {
    var tweet = collectionOfTweets[index];
    $tweet = createTweetUIComponent(tweet);
    $tweet.appendTo($feed);
    $feed.appendTo($app);
    index--;
  }
}

function createTweetUIComponent(tweet_obj) {
  var $tweet = $('<div class="tweet"></div>');
  var $username = usernameUIComponent(tweet_obj.user);
  var $message = $('<div class="message">' + tweet_obj.message + '</div>');
  var $profilePic = $('<img src="./assets/img/' + tweet_obj.user +
  '.png" class="profile-photo">');
  var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet_obj.created_at) + '</div>');
  var $iconBar = $('<div class="navBar"></div>');
  var $comment = $('<i class="icon comment far fa-comment fa-lg"></i>');
  $comment.appendTo($iconBar);
  var $retweet = $('<i class="icon retweet fas fa-retweet fa-lg"></i>');
  $retweet.appendTo($iconBar);
  var $like = $('<i class="icon like far fa-heart fa-lg"></i>');
  $like.appendTo($iconBar);
  var $share = $('<i class="icon share far fa-share-square fa-lg"></i>');
  $share.appendTo($iconBar);
  $profilePic.appendTo($tweet);
  $username.appendTo($tweet);
  $message.appendTo($tweet);
  $timestamp.appendTo($tweet);
  $iconBar.appendTo($tweet);
  return $tweet;
}

function usernameUIComponent(user_ID) {
  var $username = $('<div class="username">@' + user_ID + '</div>');
  $username.on("click", function(event) {
    selectedUser = user_ID;
    var $button = $('#update-feed');
    $button.text("Back");
    renderTweets();
  });
  return $username;
}

function getTweetData() {
  if (selectedUser === null) {
    return streams.home
  }
  else if (selectedUser === 'mracus') {
    return streams.users.mracus;
  }
  else if (selectedUser === 'shawndrost') {
    return streams.users.shawndrost;
  }
  else if (selectedUser === 'sharksforcheap') {
    return streams.users.sharksforcheap;
  }
  else if (selectedUser === 'douglascalhoun') {
    return streams.users.douglascalhoun;
  }
}
window.isItBeautifulYet = true;