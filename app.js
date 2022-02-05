$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Adding twiddler page heading
  var $title = $('<h1>twiddler<h1>');
  $title.appendTo($app);

  // Click event for heading
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of the page is: ' + event.target.innerText);
  });

  // Adding update feed button
  var $update_feed_btn = $('<button id="update-feed">update feed</button>');
  $app.append($update_feed_btn);

  // Adding initial tweets to feed
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($app);
    index -= 1;
  }

  // Click event for update feed button
  $update_feed_btn.on('click', function(event) {
    var oldFeedLength = $('div.tweet').length;
    var newFeedLength = streams.home.length;
    for (var i = newFeedLength - 1; i > oldFeedLength - 1; i--) {
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($app);
    }
  });

});