
$(document).ready(function() {
  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  var $tweets = $('.tweet');

  // Create new HTML elements
  var $title = $('<div id="title">Twiddler</div>');
  var $updateFreed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var renderFeed = function(parent) {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo(parent);
      index -= 1;
    }
  }
  renderFeed($feed);

  // Set event listeners
  $updateFreed.on("click", function(e) {
    $(".tweet").remove();
    renderFeed($feed);
  });

 // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFreed.appendTo($app);
  $feed.appendTo($app);
  $feed.appendTo($app);
  $feed.appendTo($app);
  $tweets.appendTo($feed);
});






