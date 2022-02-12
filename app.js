$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  jQuery("time.timeago").timeago();

  // Create elements
var $title = $('<h1>Twiddler</h1>');
var $update = $('<button id="update-feed">Update Feed</button>');
var $feed = $('<div id="feed"></div>');
var $user = $('.username');


// Append elements to the DOM, nested inside of the #app div
$title.appendTo($app);
$update.appendTo($app);
$feed.appendTo($app);

// As a Twiddler User, upon clicking an "@username" in a Tweet inside the Home Feed:

// I'd like to see the Feed change so that it shows only the clicked user's full list of Tweets

//  I'd like to see the "Update Feed" button change into a "Back" button


// Set a click event listener
$title.on("click", function(event) {
console.log(event);
alert('The title of this page is: ' + event.target.innerText);
});

var loadTweets = function() {
  var index = streams.home.length - 1;
  while(index >= 0){

    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $photo = $('<img src="assets/img/' + tweet.user + '.png" class="profile-photo">');
    var $username = $('<div class="username ' + tweet.user + '">@' + tweet.user + '</div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $timestamp = $('<div class="timestamp"> ' + jQuery.timeago(tweet.created_at) + '</div>');
    var $comment = $('<i class="icon comment fa-solid fa-comment">');
    var $retweet = $('<i class="icon retweet fa-solid fa-retweet">');
    var $like = $('<i class="icon like fa-solid fa-thumbs-up">');
    var $share = $('<i class="icon share fa-solid fa-share-nodes">');

    $tweet.text();
    $photo.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $tweet.appendTo($feed);

    index -= 1;
  }
}

$(document).on('click', '.douglascalhoun', function () {
  // your function here

  var index = streams.users.douglascalhoun.length - 1;
  while(index >= 0){

    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $photo = $('<img src="assets/img/' + tweet.user + '.png" class="profile-photo">');
    var $username = $('<div class="username ' + tweet.user + '">@' + tweet.user + '</div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $timestamp = $('<div class="timestamp"> ' + jQuery.timeago(tweet.created_at) + '</div>');
    var $comment = $('<i class="icon comment fa-solid fa-comment">');
    var $retweet = $('<i class="icon retweet fa-solid fa-retweet">');
    var $like = $('<i class="icon like fa-solid fa-thumbs-up">');
    var $share = $('<i class="icon share fa-solid fa-share-nodes">');

    $tweet.text();
    $photo.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $tweet.appendTo($feed);

    index -= 1;
  }
});


$update.on('click', function(event) {


  $feed.html('');

  loadTweets();

});

 loadTweets();

});
