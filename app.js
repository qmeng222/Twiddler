$(document).ready(function(){

  // ** Select already existing elements **
  var $app = $("#app");


  // ** Create new HTML elements **
  var $title = $("<h1>Twiddler</h1>");

  var $update = $("<button></button>");
  $update.attr("id", "update-feed");
  $update.text("Update Feed")

  var $feed = $("<div id='feed'></div>");


  // ** Create event handler functions **
  var renderFeed = function(user) {
    $feed.html("");

    var isUserDefined = user !== undefined;
    var index = isUserDefined ? streams.users[user].length - 1 : streams.home.length - 1;
    var stream = isUserDefined ? streams.users[user] : streams.home;

    for (var i = index; i >= 0; i -= 1) {
      var tweet = stream[i];

      var $tweet = $("<div></div>");
      $tweet.attr("class", "tweet");

      var $profilePic = $("<img></img>");
      $profilePic.attr({
        class: "profile-photo",
        src: tweet.profilePhotoURL
      });

      var $username = $("<div></div>");
      $username.attr({
        class: "username",
        id: tweet.user
      });
      $username.text("@" + tweet.user);

      var $message = $("<div></div>");
      $message.attr("class", "message");
      $message.text(tweet.message);

      var $timestamp = $("<div></div>");
      $timestamp.attr("class", "timestamp");
      var $timeago = jQuery.timeago(tweet.created_at);
      $timestamp.text($timeago);

      var $commentIcon = $("<i></i>");
      $commentIcon.attr("class", "comment icon far fa-comments");
      var $retweetIcon = $("<i></i>");
      $retweetIcon.attr("class", "retweet icon fas fa-retweet");
      var $likeIcon = $("<i></i>");
      $likeIcon.attr("class", "like icon far fa-thumbs-up");
      var $shareIcon = $("<i></i>");
      $shareIcon.attr("class", "share icon fas fa-share-square");

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

  var handleUsernameClick = function(event) {
    if ($update.text() === "Update Feed") {
      $update.text("Back");
    }
    renderFeed(event.target.id);
  };

  var handleUpdateClick = function(event) {
    if ($update.text() === "Back") {
      $update.text("Update Feed");
    }
    renderFeed();
  };


  // ** Set event listeners **
  $update.on("click", handleUpdateClick);
  $feed.on("click", ".username", handleUsernameClick);


  // ** Append new HTML elements to the DOM **
  $app.html("");
  $title.appendTo($app);
  $update.appendTo($app);
  $feed.appendTo($app);

  renderFeed();
});