$(document).ready(function(){

  // ** Select already existing elements **
  var $app = $("#app");
  $app.attr("class", "grid");

  // ** Create new HTML elements **
  var $header = $("<div></div>");
  $header.attr("class", "primary-header");

  var $leftBar = $("<div></div>");
  $leftBar.attr("class", "col-1-4");

  var $midBar = $("<div></div>");
  $midBar.attr("class", "col-1-2");

  var $rightBar = $("<div></div>");
  $rightBar.attr("class", "col-1-4");

  var $title = $("<h1></h1>");
  $title.attr("class", "title");
  $title.text("Twiddlarrr!");

  var $update = $("<button></button>");
  $update.attr("id", "update-feed");
  $update.text("Update Feed")

  var $feed = $("<div></div>");
  $feed.attr("id", "feed");


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

      // Tweet Header (Profile Pic, Username, Timestamp)
      var $tweetHeader = $("<header></header>");
      $tweetHeader.attr("class", "tweet-header");

      var $profilePic = $("<img></img>");
      $profilePic.attr({
        class: "profile-photo",
        src: tweet.profilePhotoURL
      });

      var $timestamp = $("<span></span>");
      $timestamp.attr("class", "timestamp");
      var $timeago = jQuery.timeago(tweet.created_at);
      $timestamp.text($timeago);

      var $username = $("<span></span>");
      $username.attr({
        class: "username",
        id: tweet.user
      });
      $username.text("@" + tweet.user);

      // Message Body
      var $message = $("<div></div>");
      $message.attr("class", "message");
      $message.text(tweet.message);


      // Tweet Footer (Icons)
      var $tweetFooter = $("<footer></footer>");
      $tweetFooter.attr("class", "tweet-footer");

      var $commentIcon = $("<i></i>");
      $commentIcon.attr("class", "comment icon far fa-comments");

      var $retweetIcon = $("<i></i>");
      $retweetIcon.attr("class", "retweet icon fas fa-retweet");

      var $likeIcon = $("<i></i>");
      $likeIcon.attr("class", "like icon far fa-thumbs-up");

      var $shareIcon = $("<i></i>");
      $shareIcon.attr("class", "share icon fas fa-share-square");

      // Append Element Groups
      $tweetHeader.append($profilePic, $timestamp, $username);
      $tweetFooter.append($commentIcon, $retweetIcon, $likeIcon, $shareIcon);

      $tweet.append($tweetHeader, $message, $tweetFooter);

      $feed.append($tweet);
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
  $app.append($leftBar, $midBar, $rightBar);

  $leftBar.append($title, $update);
  $midBar.append($feed);

  renderFeed();

  window.isItBeautifulYet = true;
});