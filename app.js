$(document).ready(function(){

  // Globals
  //Tracking the latest tweet since page load or update feed
  var lastIndex = streams.home.length - 1;

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler!</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function(start, end, srcArr, appendTo) {
    while(start > end){
      var tweet = srcArr[start];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/'+tweet.user+'.png"></img>');
      var $username = $('<div class="username">@'+tweet.user+'</div>');
      var $message = $('<div class="message">'+tweet.message+'</div>');
      var $timestamp = $('<div class="timestamp">'+jQuery.timeago(new Date())+'</div>');
      var $iconSpan = $('<span class="icon"></span>');
      var $comment = $('<img class="comment" src="assets/icons/placeholder.png"></img>');
      var $retweet = $('<img class="retweet" src="assets/icons/placeholder.png"></img>');
      var $like = $('<img class="like" src="assets/icons/placeholder.png"></img>');
      var $share = $('<img class="share" src="assets/icons/placeholder.png"></img>');
      $tweet.append($profilePhoto);
      $tweet.append($username);
      $tweet.append($message);
      $tweet.append($timestamp);
      $iconSpan.append($comment);
      $iconSpan.append($retweet);
      $iconSpan.append($like);
      $iconSpan.append($share);
      $tweet.append($iconSpan);

      $tweet.appendTo(appendTo);
      start -= 1;
    }
  }

  var updateFeed = function() {
    //Save off where our latest tweet is
    var latestIndex = streams.home.length - 1;

    renderFeed(streams.home.length-1, lastIndex, streams.home, $('#feed'));

    //Update to where this update started
    lastIndex = latestIndex;
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

});