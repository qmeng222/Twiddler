$(document).ready(function(){

jQuery("time.timeago").timeago();


var $app = $('#app');
//var app.html('');
var $title = $('<h1>Twiddler</h1>')
var $button = $('<button id="update-feed">Update Feed</button>');
var $feed = $('<div class= "feed" id="feed"><div>')
var $friendslist = $('<div class="friends-list"></div>');
var $friendsHeader = $('<h4>Studentlist</h4>');
var $mracus = $('<li>mracus</li>');
var $douglascalhoun = $('<li>douglascalhoun</li>');
var $shawndrost = $('<li>shawndrost</li>');
var $sharksforcheap = $('<li>sharksforcheap</li>');
var $leftside = $('<div class = "left"></div>');

$mracus.click(function(){
  button($(this).text());
})

$douglascalhoun.click(function(){
  button($(this).text());
})

$shawndrost.click(function(){
  button($(this).text());
})

$sharksforcheap.click(function(){
  button($(this).text());
})

$title.on("click", function(event) {
console.log (event)
alert('The title of this page is:' + event.target.innerText);

});


var UpdateFeedClick = function (event) {
  var index = streams.home.length - 1;
  renderFeed();
  $button.text('Update Feed');
  return false;
}
var handleUsernameClick = function (event) {
  var user = event.target.innerText.slice(1);
  renderFeed(user);
  $button.text('Back');
}

$mracus.appendTo($friendslist);
$douglascalhoun.appendTo($friendslist);
$shawndrost.appendTo($friendslist);
$sharksforcheap.appendTo($friendslist);

$friendslist.appendTo($leftside)
$friendsHeader.appendTo($leftside)

$title.appendTo($app);
$button.appendTo($app);
$feed.appendTo($app);

var renderFeed = function (user){
  $feed.html('');
  if(user===undefined){
    var index = streams.home.length - 1;
  } else{
    var index = streams.users[user].length - 1;
  }

  while(index >= 0){
    if (user=== undefined) {
      var tweet = streams.home[index];
    } else {
      var tweet = streams.users[user][index];
    }

  var $tweet = $('<div class="tweet"></div>');
  var $message = $('<div class="message"></div>');
  var $profileImg = $('<img class="profile-photo" src="./assets/img/' + tweet.user + '.png" alt="profile-photo"/>');
  var $username = $('<div class="username"></div>');
  var $timestamp = $('<div class= "timestamp"></div>');
  var $icons = $('<div id="icons"></div>');
  var $comment = $('<i class="comment fas fa-comment" alt="comment"></i>');
  var $retweet = $('<i class="retweet fas fa-retweet" alt="retweet"></i>');
  var $like = $('<i class="like fas fa-thumbs-up" alt="like"></i>');
  var $share =$('<i class="share fas fa-share" alt="share"></i>');


  $username.text('@'+tweet.user);
  $message.text(tweet.message);
  $timestamp.text(jQuery.timeago(tweet.created_at));
  $comment.appendTo($icons);
  $retweet.appendTo($icons);
  $like.appendTo($icons);
  $share.appendTo($icons);
  $profileImg.appendTo($tweet);
  $username.appendTo($tweet);
  $message.appendTo($tweet);
  $timestamp.appendTo($tweet);
  $icons.appendTo($tweet);
  $tweet.appendTo($feed)

//$tweet.text('@' + tweet.user + ': ' + tweet.message);

  $username.on('click', handleUsernameClick);


  index -= 1;
  }
}
$button.on('click', UpdateFeedClick);

renderFeed();


  });