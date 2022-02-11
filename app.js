$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler!</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function(start, end, srcArr, appendTo, user) {
    while(start > end){
      if (user === undefined){
        var $tweet = buildTweet(srcArr[start]);
        $tweet.appendTo(appendTo);
      } else if (user === srcArr[start].user){
        var $tweet = buildTweet(srcArr[start]);
        $tweet.appendTo(appendTo);
      }
      start -= 1;
    }
  }

  var buildTweet = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    var $profilePhoto = $('<img class="profile-photo" src="assets/img/'+tweet.user+'.png"></img>');
    var $username = $('<div class="username">@'+tweet.user+'</div>');
    var $message = $('<div class="message">'+tweet.message+'</div>');
    var $timestamp = $('<div class="timestamp">'+jQuery.timeago(tweet.created_at)+'</div>');
    var $iconSpan = $('<span class="icon"></span>');
    var $comment = $('<i class="fa-regular fa-comment comment"></i>');
    var $retweet = $('<i class="fa-solid fa-crow retweet"></i>');
    var $like = $('<i class="fa-regular fa-heart like"></i>');
    var $share = $('<i class="fa-solid fa-up-right-from-square share"></i>');
    $tweet.append($profilePhoto);
    $tweet.append($username);
    $tweet.append($message);
    $tweet.append($timestamp);
    $iconSpan.append($comment);
    $iconSpan.append($retweet);
    $iconSpan.append($like);
    $iconSpan.append($share);
    $tweet.append($iconSpan);

    return $tweet;
  }

  var updateFeed = function() {
    $("div.tweet").remove();
    renderFeed(streams.home.length - 1, -1, streams.home, $('#feed'));
    $("#update-feed").html("Update Feed");
  }

  var handleUsernameClick = function() {
    $("div.tweet").remove();
    var user = $(this).text().substring(1);
    renderFeed(streams.home.length-1, -1, streams.home, $('#feed'), user);
    $("button#update-feed").html("Back");
  }

  // Append new HTML elements to the DOM
  // Create Title, Update button and Feed container
  $($app).append($title);
  $app.append($updateButton);
  $app.append($feed);

  //Initial render of tweets at page load
  renderFeed(streams.home.length - 1, -1, streams.home, $('#feed'));

  // Set event listeners (providing appropriate handlers as input)
  $('button#update-feed').on('click', updateFeed);
  $('#feed').on('click', 'div.username',handleUsernameClick);
  $('#feed').on('mouseenter', 'div.username',function() {
    $('div.username').css("cursor", "pointer");
  });
  $('#feed').on('mouseleave', 'div.username',function() {
    $('div.username').css("cursor", "arrow");
  });
  $('#feed').on('mouseenter', 'i', function() {
    $(this).css("color", "orange");
  });
  $('#feed').on('mouseleave', 'i', function() {
    $(this).css("color", "black");
  });

});