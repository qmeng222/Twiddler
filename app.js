$(app.js).ready(function() {
  var $app = $('#app');
  $app.html('');
  //add timeago to Jquery
//HTML Elements
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  //button container
  var $buttonContainer = $('<div></div>').appendTo($app);
    //create feed
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);
  //create button
  var $updateFeed = $('<button id="update-feed">Update Feed</button>').appendTo($buttonContainer);
  //Helper Functions
  function colorChange(icon){
    icon.on('mouseover', function() {
      icon.attr('style', 'color:gray');
    });
    icon.on('mouseout', function() {
      icon.attr("style", "color: black");
    });
}
var $renderTweet = function(tweet){
  var $tweet = $('<div class="tweet"></div>');
  var imageString = 'assets/img/' + tweet.user + '.png';
  var $profilePhoto = $('<img src=' + imageString + ' class="profile-photo"></img>').appendTo($tweet);
  var $username = $('<div class="username"></div>');
    $username.text('@' + tweet.user).appendTo($tweet);
  var $message = $('<p class="message"></p>');
    $message.text(tweet.message).appendTo($tweet);;
 var time = jQuery.timeago(tweet.created_at.toISOString());
 var $timestamp = $('<div class="timestamp"></div>');
   $timestamp.text(time).appendTo($tweet);
  var $comment = $('<i class="fas fa-comments comment" style="color:black"></i>').appendTo($tweet);
  colorChange($comment);
  var $retweet = $('<i class="retweet fab fa-twitter"></i>').appendTo($tweet);
  colorChange($retweet);
  var $like = $('<i class="like fas fa-heart"></i>').appendTo($tweet);
  colorChange($like);
  var $share = $('<i class="share fas fa-share"></i>').appendTo($tweet);
  colorChange($share);
  return $tweet;
}
///////Event handlers
  $( "#update-feed" ).on("click", function() {
    $renderFeed();
  });
//User Feed
  $(document).on("click", ".username", function () {
    $("#feed").empty();
    var clickedUser = $(this).text().slice(1);
    for (var i = 0; i <= streams.home.length - 1; i++) {
      if(streams.home[i].user === clickedUser) {
        $renderTweet(streams.home[i]).prependTo($feed);
        $("#update-feed").html("Back");
      }
    }
  });
  //Change back button into Update Feed
  $(document).on("click", "#update-feed", function() {
    $("#update-feed").html("Update Feed");
  });
  var firstLoad = true;
  //Change icon colors
  // $(document).on("mouseover", 'i', function() {
  //   i.attr('style', 'color:gray');
  // });
  // icon.on('mouseover', function() {
  //   icon.attr('style', 'color:gray');
  // });
  // icon.on('mouseout', function() {
  //   icon.attr("style", "color: black");
  // });
  //Append new HTML elements to the DOM
  var $renderFeed = function() {
    $( "#feed" ).empty();
    for (var i = 0; i <= streams.home.length -1; i++) {
      $renderTweet(streams.home[i]).prependTo($feed);
    }
  }
$renderFeed();
  window.isItBeautifulYet = true;
});