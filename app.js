
$(document).ready(function() {
  $("time.timeago").timeago();

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<div id="title">Twiddler</div>');
  var $updateFeedBtn = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $username;


  // Create event handler or helper functions
  var renderFeed = function(parent, user) {
    if (user === undefined) {
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        var $profilePic = $(`<img class="profile-photo" src="assets/img/${tweet.user}.png">`);
        var $username = $('<span class="username"></span>');
        var $message = $(`<p class="message">${tweet.message}</p>`);
        var $timestamp = $(`<span class="timestamp" >${jQuery.timeago(tweet.created_at)}</span>`);
        var $comment = $(`<i class="comment fas far fa-comments" src="assets/icons/placeholder.png"></i>`);
        var $retweet = $(`<i class="retweet fab fa-twitter-square" src="assets/icons/placeholder.png"></i>`);
        var $like = $(`<i class="like fab fa-gratipay" src="assets/icons/placeholder.png"></i>`);
        var $share = $(`<i class="share fas fa-share-alt-square" src="assets/icons/placeholder.png"></i>`);
        $username.text('@' + tweet.user);
        $tweet.appendTo(parent);
        $profilePic.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);
        index -= 1;
      }
    }else {
      var index = streams.users[user].length - 1;
      while(index >= 0) {
        var tweet = streams.users[user][index];
        var $tweet = $('<div class="tweet"></div>');
        var $profilePic = $(`<img class="profile-photo" src="assets/img/${tweet.user}.png">`);
        var $username = $(`<span class="username">@${tweet.user}</span>`);
        var $message = $(`<p class="message">${tweet.message}</p>`);
        var $timestamp = $(`<div class="timestamp" >${jQuery.timeago(tweet.created_at)}</div>`);
        var $comment = $(`<i class="comment fas far fa-comments" src="assets/icons/placeholder.png"></i>`);
        var $retweet = $(`<i class="retweet fab fa-twitter-square" src="assets/icons/placeholder.png"></i>`);
        var $like = $(`<i class="like fab fa-gratipay" src="assets/icons/placeholder.png"></i>`);
        var $share = $(`<i class="share fas fa-share-alt-square" src="assets/icons/placeholder.png"></i>`);
        $tweet.appendTo(parent);
        $profilePic.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);
        index -= 1;
      }
    }
  }
  renderFeed($feed);
  // var $username = $('.username');
  // console.log($username)


  // Set event listeners
  $updateFeedBtn.on("click", function(e) {
    if ($updateFeedBtn.text() === "Update Feed") {
      $(".tweet").remove();
      renderFeed($feed);
    } else {
      $(".tweet").remove();
      renderFeed($feed);
      $updateFeedBtn.text("Update Feed")
    }
  });

 // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedBtn.appendTo($app);
  $feed.appendTo($app);



  $username = $('.username');

  var handleUsernameClick = function(event) {
    var clickedName = event.target.textContent;
    var removeAt = clickedName.slice(1);
    $(".tweet").remove();
    renderFeed($feed, removeAt);
    $updateFeedBtn.text("Back");
  }

  $feed.on("click", "span", function(event) {
    handleUsernameClick(event)
  });
});






