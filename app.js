$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

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

  // Posts displayed on the feed when the page is ready
  renderFeed();

  // Posts added to the feed when the page is updated
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($app);
  $updateFeed.on("click", renderFeed);


});