"use strict";

$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');


  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2>Where the twiddlers be twiddlin\'</h2>')
  var $updateFeedButton = $('<button id="update-feed" class="button">Update Feed</button>');
  var $feed = $('<div class="container" id="feed"></div>')


  // Create event handler functions
  var $handleTitleClick = function(event) {
    console.log(event);
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert(`The ${titleType} of this page is: ${event.target.innerText}`);
  };
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
  $title.on("click", $handleTitleClick);
  $subtitle.on("click", $handleTitleClick);
  $updateFeedButton.on("click", $renderFeed);


  // Append new HTML element to the DOM
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);
  $renderFeed();

});
