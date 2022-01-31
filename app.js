$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed">Feed</div>');
  $feed.appendTo($app);


  // Create event handler functions
  $title.on('click', function(event) {
    alert('The title of this page is: ' + event.target.innerText);

  // Append new HTML elements to the DOM
    $title.appendTo($app);
  });

  //timeago

  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });

  //clear feed function

  // var $clear = function() {
  //   $('.tweet').empty();
  // };

  // update feed button

  var $update = $('<button id="update-feed">Update Feed</button>');
  $update.appendTo($app);
  $update.on('click', function() {
    $('.feed').html('')
    $renderFeed();
  });

  // var index = streams.home.length - 1;
  // while(index >= 0){
  //   var tweet = streams.home[index];
  //   var $tweet = $('<div class="tweet"></div>');
  //   var timeAgo = jQuery.timeago(new Date(tweet.created_at));
  //   $tweet.html("<img class='profile-photo' src='tweet.profilePhotoURL'><p class='message'>" + tweet.message + "</p><div class='timestamp'>" + timeAgo + "</div>");
  //   $tweet.appendTo($app);
  //   $tweet.hide();
  //   index -= 1;

  //render feed function

var $renderFeed = function(element){
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var timeAgo = jQuery.timeago(new Date(tweet.created_at));
    $tweet.html("<p class='message'>" + tweet.message + "</p><div class='timestamp'>" + timeAgo + "</div>");
    var $profilePhoto = $("<img class='profile-photo'>");
    $profilePhoto.attr("src", tweet.profilePhotoURL);
    $profilePhoto.appendTo($tweet);
    $tweet.appendTo($feed);
    index -= 1;


    //clickable username

    var $usernameClick = $('<span class="username">' + "@" + tweet.user + '</span>');
    $usernameClick.appendTo($tweet);
    $usernameClick.on('click', 'span', function() {
    })

    //icons

      var $icons = $("<img class='icon'>");

    var $comment = $('<i class="fa-solid fa-address-card"></i>');
    var $retweet = $("<i class='retweet fa-solid fa-arrows-rotate'></i>");
    var $like = $("<i class='like fa-solid fa-up-from-line'></i>");
    var $share = $("<i class='share fa-solid fa-arrow-up-right-from-square'></i>");

    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);
    $icons.appendTo($tweet);
  };
};

  // clear feed
  // var $clear = function() {
  //   $feed.html('')
  // }

$renderFeed();
});