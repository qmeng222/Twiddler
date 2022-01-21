$(document).ready(function(){
  var $app = $('#app');
  var $title = $('<h1>Twiddler</h1>');
  $app.html('');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
});

function renderFeed(user) {
  //$feed.html(''); // .empty?
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
    var $img = $('<img class="profile-photo"></img>');
    var $timestamp = $('<div class="timestamp">' + tweet.created_at + '</div>');
    var $comment = $('<img class="comment" src="assets/icons/placeholder.png"></img>');
    var $retweet = $('<img class="retweet" src="assets/icons/placeholder.png"></img>');
    var $like = $('<img class="like" src="assets/icons/placeholder.png"></img>');
    var $share = $('<img class="share" src="assets/icons/placeholder.png"></img>');
    $message.appendTo($tweet);
    $username.appendTo($tweet);
    $img.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $tweet.appendTo($feed);// app
    index -= 1;
  } // link tweets to log 11
};

var $button = $('<button id="update-feed">Update Feed</button>');
$button.appendTo($app);
$button.click("#update-feed", function (event) {
  $feed.empty();
  renderFeed();

});


  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  renderFeed();

});

