$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Title
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  // Helper function: refreshes the feed
  var renderFeed = function(event) {
    $feed.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  // Update feed button
  var $updateFeedButton = $('<button id="update feed">Update Feed</button>');
  $updateFeedButton.appendTo($app);
  $updateFeedButton.on("click", renderFeed);

  // Feed container
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  renderFeed();



});