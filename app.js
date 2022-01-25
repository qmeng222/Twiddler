$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  $feed.html('');

  // Create event handler functions
  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }
  var renderFeed = function(event) {
    var index = streams.home.length - 1;
    $('#feed').html('');
    while(index >= 0){
     var tweet = streams.home[index];
     var $tweet = $('<div class="tweet"></div>');
     $tweet.text('@' + tweet.user + ': ' + tweet.message);
     $tweet.appendTo($feed);
     index -= 1;
    }
  };
   renderFeed();

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $button.on('click', renderFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

});
