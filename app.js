$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var updateFeed = function() {
    $feed.html('');
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
    $feed.appendTo($app);
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", function() {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  })
  $updateFeed.on("click", updateFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);

  // Function to update feed and add to $app
  updateFeed();


});