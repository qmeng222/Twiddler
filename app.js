"use strict";

$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');


  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed" class="button">Update Feed</button>');
  var $feed = $('<div class="container" id="feed"></div>')


  // Create event handler functions
  var $renderFeed = function() {
    $feed.empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };


  // Set event listeners
  $title.on("click", function(event) {
    console.log(event);
    alert('This is an event: ' + event.target.innerText);
  });
  $updateFeedButton.on("click", function () {
    $renderFeed();
  });


  // Append new HTML element to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);
  $renderFeed();

});
