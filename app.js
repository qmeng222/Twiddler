$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
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
  var titleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", titleClick);
  $updateFeedButton.on("click", renderFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);

  renderFeed();

});