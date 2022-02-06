$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Select already existing elements

  // Create new HTML elements

  var $title = $('<h1>twiddler<h1>');
  var $update_feed_btn = $('<button id="update-feed">update feed</button>');
  var $home_feed = $('<div id="feed"></div>');

  // Create event handler functions

  var handleTitleClick = function(event) {
    alert('The title of the page is: ' + event.target.innerText);
  };

  var renderFeed = function(event) {
    var oldFeedLength = $('div.tweet').length;
    var newFeedLength = streams.home.length;
    for (var i = oldFeedLength; i < newFeedLength; i++) {
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.prependTo($home_feed);
    }
  };
  renderFeed(); //create initial home feed

  // Set event listeners

  $title.on('click', handleTitleClick);
  $update_feed_btn.on('click', renderFeed);

  // Append new HTML elements to the DOM

  $title.appendTo($app);
  $app.append($update_feed_btn);
  $app.append($home_feed);


 /* // Adds twiddler page heading
  var $title = $('<h1>twiddler<h1>');
  $title.appendTo($app);

  // Click event for heading
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of the page is: ' + event.target.innerText);
  });

  // Adds update feed button
  var $update_feed_btn = $('<button id="update-feed">update feed</button>');
  $app.append($update_feed_btn);

  // Adds home feed division for tweets
  var $home_feed = $('<div id="feed"></div>');
  $app.append($home_feed);


  //
  var renderFeed = function(event) {
    var oldFeedLength = $('div.tweet').length;
    var newFeedLength = streams.home.length;
    for (var i = oldFeedLength; i < newFeedLength; i++) {
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.prependTo($home_feed);
    }
  };

  // Adds initial tweets to home feed
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($home_feed);
    index -= 1;
  }

  // Click event for update feed button
  $update_feed_btn.on('click', renderFeed);

*/});