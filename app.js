
$(document).ready(function() {
  var $app = $('#app');
  $app.html('');

  var $title = $('<div id="title">Twiddler</div>');
  $title.appendTo($app);

  var $updateFreed = $('<button id="update-feed">Update Feed</button>');
  $updateFreed.appendTo($app);

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
  renderFeed($app);

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  var $tweets = $('.tweet');
  $tweets.appendTo($feed);

  // create an click event for update button
  $updateFreed.on("click", function(e) {
    // Remove all previously existing Tweets from the Feed
    $(".tweet").remove();
    // For each Tweet object in the stream array (in reverse order)
    renderFeed($feed);
  });
});




