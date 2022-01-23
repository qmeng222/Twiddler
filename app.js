$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');

  // Create event handler functions
  $title.on("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  var renderFeed = function() {
    $($feed).html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text(`@${tweet.user}: ${tweet.message}`);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  // Set event listeners (providing appropriate handlers as input)
  renderFeed();
  $updateFeed.on("click", renderFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $feed.appendTo($app);
  $updateFeed.appendTo($app);

});