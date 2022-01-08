"use strict";

$(document).ready(function(){
  var $app = $('#app');
  $app.html('');


  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('This is an event: ' + event.target.innerText);
  });

  var $updateFeedButton = $('<button id="update-feed" class="button">Update Feed</button>');
  $updateFeedButton.appendTo($app);
  $updateFeedButton.on("click", function () {
    $renderFeed();
  });

  var $feed = $('<div class="container" id="feed"></div>')
  $feed.appendTo($app);

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
  $renderFeed();



});
console.log('hello');
