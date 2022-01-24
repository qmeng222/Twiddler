$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

   // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div');

  // Create event handler functions
  var appendFeed = function(user) {
    var index = streams.home.length - 1;

    while(index >= 0){
      var tweet = streams.home[index];
      if (user !== "all" && user !== tweet.user) { index -= 1; continue; }
      var $tweet = $('<div class="tweet"></div>');
      var $photo = $('<img class="box profile-photo" src="assets/img/' + tweet.user + '.png" height=20></img>');
      var $username = $('<span class="box username"> @' + tweet.user + '</span>');
      var $message = $('<p class="message">' + tweet.message + '</p>');
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="icon comment fas fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like fas fa-heart"></i>');
      var $share = $('<i class="icon share fas fa-share"></i>');

      //$(".icon").attr("src", function () { return "assets/icons/placeholder.png"; });

      $photo.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);

      $username.on("click", {name: tweet.user}, renderFeed);
      if (user === "all") {
        $button.text("Update Feed");
      } else {
        $button.text("Back");
      }

      //$tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };



  var renderFeed = function(event) {
    $feed.empty();
    console.log(event.data.name);
    appendFeed(event.data.name);
  };

  // Set event listeners (providing appropriate handlers as input)
  $button.on("click", {name: "all"}, renderFeed);


  // Append new HTML elements to the DOM
  $app.html('');
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);
  appendFeed("all");

  // Set event listeners (providing appropriate handlers as input)

  //$(".username").trigger("click", $(this).text());

});

window.isItBeautifulYet = true