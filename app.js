$(document).ready(function(){

  // ** Select already existing elements **
  var $app = $("#app");

  // ** Create new HTML elements **
  var $title = $("<h1>Twiddler</h1>");
  var $update = $("<button id='update-feed'>Update Feed</button>"); //remove hardcode at some point
  var $feed = $("<div id='feed'></div>");

  // ** Create event handler functions **
  var renderFeed = function(event) {
    $feed.html("");
    if (event !== undefined) {
      event.preventDefault();
    }

    // Loop, build and return all tweets, reverse chronological order
    var mostRecentIndex = streams.home.length - 1;
    for (var i = mostRecentIndex; i >= 0; i -= 1) {
      var tweet = streams.home[i];

      var $tweet = $("<div></div>");
      $tweet.attr("class", "tweet");

      var $profilePic = $("<img></img>");
      $profilePic.attr({
        class: "profile-photo",
        src: tweet.profilePhotoURL
      });

      var $username = $("<div></div>");
      $username.attr("class", "username");
      $username.text("@" + tweet.user);

      var $message = $("<div></div>");
      $message.attr("class", "message");
      $message.text(tweet.message);

      var $timestamp = $("<div></div>");
      $timestamp.attr("class", "timestamp");
      $timestamp.text(tweet.created_at);

      var $commentIcon = $("<img></img>");
      $commentIcon.attr("class", "comment icon");
      var $retweetIcon = $("<img></img>");
      $retweetIcon.attr("class", "retweet icon");
      var $likeIcon = $("<img></img>");
      $likeIcon.attr("class", "like icon");
      var $shareIcon = $("<img></img>");
      $shareIcon.attr("class", "share icon");

      var $icons = $(".icon");
      $icons.attr("src", "./assets/icons/placeholder.png");

      $profilePic.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);

      $tweet.appendTo($feed);
    }
  }

  // ** Set event listeners **
  $update.on("click", renderFeed);

  // ** Append new HTML elements to the DOM **
  $app.html("");
  $title.appendTo($app);
  $update.appendTo($app);
  $feed.appendTo($app);

  renderFeed();

});