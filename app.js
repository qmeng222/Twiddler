$(document).ready(function(){

  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
console.log(event);
alert('The title of this page is: ' + event.target.innerText);
});

var $updatebutton = $('<h2><button id="update-feed">Update Feed</button></h2>');
$updatebutton.appendTo($app);


var $friendslist = $('<ul></ul>')
$('<h3>Friend List:</h3>').appendTo($friendslist)
$('<li>@sharksforcheap</li>').appendTo($friendslist);
$('<li>@shawndrost</li>').appendTo($friendslist);
$('<li>@mracus</li>').appendTo($friendslist);
$('<li>@douglascalhoun</li>').appendTo($friendslist);
$friendslist.appendTo($app);

var $feed = $('<div id="feed"></div>');

var $tweet = $('<div class="tweet"></div>');

var $message = $('<div class="message"></div>');

var $username = $('<div class="username"></div>');

var $profilephoto = $('<img class="profile-photo"/>');

var $timestamp = $('<div class="timestamp"></div>');

var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $icon = $('<div class="icon"></div>');
    var $comment = $('<i class="comment fas fa-comments"></i>');
    var $retweet = $('<i class="retweet fas fa-retweet"></i>');
    var $like = $('<i class="like fas fa-thumbs-up"></i>');
    var $share = $('<i class="share fas fa-share"></i>');
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
    $timestamp.text(jQuery.timeago(tweet.created_at));
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



var userfeed = function(event) {
  var btn = document.getElementById("update-feed");
  btn.innerHTML = 'Back';

  if (event.target.innerText === '@sharksforcheap:') {
    $("#feed").empty();
    for(var index = 0; index <= streams.users.sharksforcheap.length - 1; index++){
      var tweet = streams.users.sharksforcheap[index];
      var $tweet = $('<div class="tweet"></div>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="comment fas fa-comments"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-thumbs-up"></i>');
      var $share = $('<i class="share fas fa-share"></i>');
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
      $timestamp.text(jQuery.timeago(tweet.created_at));
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

  } else if (event.target.innerText === '@shawndrost:') {
    $("#feed").empty();
    for(var index = 0; index <= streams.users.shawndrost.length - 1; index++){
      var tweet = streams.users.shawndrost[index];
      var $tweet = $('<div class="tweet"></div>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="comment fas fa-comments"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-thumbs-up"></i>');
      var $share = $('<i class="share fas fa-share"></i>');
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
      $timestamp.text(jQuery.timeago(tweet.created_at));
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
  } else if (event.target.innerText === '@mracus:') {
    $("#feed").empty();
    for(var index = 0; index <= streams.users.mracus.length - 1; index++){
      var tweet = streams.users.mracus[index];
      var $user = $('<div class="user"></div>');
      var $tweet = $('<div class="tweet"></div>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="comment fas fa-comments"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-thumbs-up"></i>');
      var $share = $('<i class="share fas fa-share"></i>');
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
      $timestamp.text(jQuery.timeago(tweet.created_at));
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

  } else if (event.target.innerText === '@douglascalhoun:') {
    $("#feed").empty();
    for(var index = 0; index <= streams.users.douglascalhoun.length - 1; index++){
      var tweet = streams.users.douglascalhoun[index];
      var $user = $('<div class="user"></div>');
      var $tweet = $('<div class="tweet"></div>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="comment fas fa-comments"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-thumbs-up"></i>');
      var $share = $('<i class="share fas fa-share"></i>');
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
      $timestamp.text(jQuery.timeago(tweet.created_at));
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
  };


function registerUserClickHandlers() {
  $(".username").on("click", userfeed);
}


var renderfeed = function(event) {
  var btn = document.getElementById("update-feed");
  btn.innerHTML = 'Update Feed';
  $("#feed").empty();
  for(var index = 0; index <= streams.home.length - 1; index++){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $icon = $('<div class="icon"></div>');
    var $comment = $('<i class="comment fas fa-comments"></i>');
    var $retweet = $('<i class="retweet fas fa-retweet"></i>');
    var $like = $('<i class="like fas fa-thumbs-up"></i>');
    var $share = $('<i class="share fas fa-share"></i>');
    var $message = $('<div class="message"></div>');
    var $username = $('<div class="username"></div>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $profilephoto = $('<img />', {
      class: 'profile-photo',
      src: './assets/img/' + tweet.user + '.png',
      alt: 'profile picture for this user'
   });
   $(".username").on("click", userfeed);
    $message.text(tweet.message);
    $username.text('@' + tweet.user + ': ');
    $timestamp.text(jQuery.timeago(tweet.created_at));
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
registerUserClickHandlers();

}

$updatebutton.on("click", renderfeed);
registerUserClickHandlers();


window.isItBeautifulYet = true

});