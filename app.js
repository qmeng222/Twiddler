$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

$("time.timeago").timeago();

//Title
var $title = $('<h1 id = title>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
});

//update-feed
var $updateFeed =$("<button id='update-feed'>Update Feed</button>");
  $updateFeed.appendTo($app);

$updateFeed.on("click",function(event){
  $feed.empty();
  $renderFeed();
  $updateFeed.text("Update Feed");
})

//feed
var $feed=$("<div id = 'feed'></div>");
  $feed.appendTo($app);

function handleUsernameClick(user){
  return function(event){
    $feed.empty();
    $renderFeed(user);
    $updateFeed.text("Back");
  };
}

var $renderFeed = function(user){
  var tStream = streams.home;
if(user !== undefined){
    tStream = streams.users[user];
}
  var index = tStream.length - 1;
  while(index >= 0){
    var tweet = tStream[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.appendTo($feed);

    var $profilePhoto = $("<img class ='profile-photo'></img>");
    $profilePhoto.attr("src",tweet.profilePhotoURL);
    $profilePhoto.appendTo($tweet);

    var $username = $("<div class = 'username'></div>")
    $username.text("@"+tweet.user);

    $username.on("click", handleUsernameClick(tweet.user));

    $username.appendTo($tweet);

    var $message = $("<div class = 'message'></div>");
    $message.text(tweet.message);
    $message.appendTo($tweet);

    var $timestamp = $("<div class = 'timestamp timeago'></div>");
    $timestamp.text($.timeago(tweet.created_at));
    $timestamp.appendTo($tweet);

    var $comment = $("<i class='fas fa-comment icon comment'></i>");
    $comment.appendTo($tweet);

    var $retweet = $("<i class='fas fa-retweet icon retweet'></i>");
    $retweet.appendTo($tweet);

    var $like = $("<i class='fas fa-thumbs-up icon like'></i>");
    $like.appendTo($tweet);

    var $share = $("<i class = 'fas fa-share icon share'></i>");
    $share.appendTo($tweet);


    index -= 1;
  }
}
$renderFeed();


window.isItBeautifulYet = true;
});
