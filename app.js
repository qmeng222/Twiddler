$(document).ready(function(){

  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
console.log(event);
alert('The title of this page is: ' + event.target.innerText);
});

var $feed = $('<div id="feed"></div>');

var $tweet = $('<div class="tweet"></div>');

var $message = $('<div class="message"></div>');

var $username = $('<div class="username"></div>');

var $profilephoto = $('<img class="profile-photo"/>');

var $timestamp = $('<div class="timestamp"></div>');

var $updatebutton = $('<button id="update-feed">Update Feed</button>');
$updatebutton.appendTo($app);



var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $icon = $('<div class="icon"></div>');
    var $comment = $('<img />', {
      class: 'comment',
      src: './assets/icons/placeholder.png',
   });
    var $retweet = $('<img />', {
      class: 'retweet',
      src: './assets/icons/placeholder.png',
   });
    var $like = $('<img >', {
      class: 'like',
      src: './assets/icons/placeholder.png',
   });
    var $share = $('<img />', {
      class: 'share',
      src: './assets/icons/placeholder.png',
   });
    var $message = $('<div class="message"></div>');
    var $username = $('<div class="username"></div>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $profilephoto = $('<img />', {
      class: 'profile-photo',
      src: './assets/img/' + tweet.user + '.png',
      alt: 'profile picture for this user'
   });


    $message.text(tweet.message);
    $username.text('@' + tweet.user + ': ');
    $timestamp.text(tweet.created_at);
    $profilephoto.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($icon);
    $retweet.appendTo($icon);
    $like.appendTo($icon);
    $share.appendTo($icon);
    $icon.appendTo($tweet);
    $tweet.appendTo($feed);
    index -= 1;
  }
  $feed.appendTo($app);

var renderfeed = function(event) {
  $("#feed").empty();
  for(var index = 0; index <= streams.home.length - 1; index++){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $icon = $('<div class="icon"></div>');
    var $comment = $('<img />', {
      class: 'comment',
      src: './assets/icons/placeholder.png',
   });
    var $retweet = $('<img />', {
      class: 'retweet',
      src: './assets/icons/placeholder.png',
   });
    var $like = $('<img />', {
      class: 'like',
      src: './assets/icons/placeholder.png',
   });
    var $share = $('<img />', {
      class: 'share',
      src: './assets/icons/placeholder.png',
   });
    var $message = $('<div class="message"></div>');
    var $username = $('<div class="username"></div>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $profilephoto = $('<img />', {
      class: 'profile-photo',
      src: './assets/img/' + tweet.user + '.png',
      alt: 'profile picture for this user'
   });
    $message.text(tweet.message);
    $username.text('@' + tweet.user + ': ');
    $timestamp.text(tweet.created_at);
    $profilephoto.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($icon);
    $retweet.appendTo($icon);
    $like.appendTo($icon);
    $share.appendTo($icon);
    $icon.appendTo($tweet);
    $tweet.prependTo($feed);
    $feed.appendTo($app);
  }
}

$updatebutton.on("click", renderfeed);


});