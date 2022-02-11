$(document).ready(function(){
  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });
  var $app = $('#app');
  $app.html('');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

// refresh button and feed

  var $button = $('<button id=update-feed>Refresh Feed</button>');
  $button.appendTo($app);
  var $feed = $('<div id=feed></div>');
  $feed.appendTo($app);
  var refreshedIndex = 11;
$button.on('click', function() {
  for (refreshedIndex; refreshedIndex <= streams.home.length - 1; refreshedIndex++) {
    var tweet = streams.home[refreshedIndex];
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<p class="message"></p>');
    var $username = $('<span class="username"></span>');
    var $profilepic = $('<img src=' + tweet.profilePhotoURL + ' class="profile-photo"></img>');
    var $timestamp = $('<span class="timestamp timeago"></span>');
    var $comment = $('<img src="assets/icons/placeholder.png" class="icon comment"></img>');
    var $retweet = $('<img src="assets/icons/placeholder.png" class="icon retweet"></img>');
    var $like = $('<img src="assets/icons/placeholder.png" class="icon like"></img>');
    var $share = $('<img src="assets/icons/placeholder.png" class="icon share"></img>');
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $profilepic.appendTo($tweet);
    $username.text('@' + tweet.user + ': ');
    $message.text(tweet.message);
    $tweet.prependTo($feed);
    $message.appendTo($tweet);
    $username.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
  };
  refreshedIndex = streams.home.length ;
});

// first 10 tweets

  var index = streams.home.length - 1;
  while(index >= 0){

    var tweet    = streams.home[index];
    var $tweet   = $('<div class="tweet"></div>');
    var $message = $('<p class="message"></p>');
    var $username = $('<span class="username"></span>');
    var $profilepic = $('<img src=' + tweet.profilePhotoURL + ' class="profile-photo"></img>');
    var $timestamp = $('<span class="timestamp"></span>');
    var $comment = $('<img src="assets/icons/placeholder.png" class="icon comment"></img>');
    var $retweet = $('<img src="assets/icons/placeholder.png" class="icon retweet"></img>');
    var $like = $('<img src="assets/icons/placeholder.png" class="icon like"></img>');
    var $share = $('<img src="assets/icons/placeholder.png" class="icon share"></img>');
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $profilepic.appendTo($tweet);
    $username.text('@' + tweet.user + ': ');
    $message.text(tweet.message);
    $tweet.appendTo($feed);
    $message.appendTo($tweet);
    $username.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    index -= 1;
  }

});