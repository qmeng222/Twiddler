$(document).ready(function(){
  var $app = $('#app');

  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedBtn = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  var renderFeed = function() {
    $('#feed').empty();
    for (var i = streams.home.length - 1; i >= 0; i--) {
      var tweet = streams.home[i];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo('#feed');
    }
  };

  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $($updateFeedBtn).on('click', renderFeed);

  $app.html('');
  $title.appendTo($app);
  $updateFeedBtn.appendTo($app);
  $($feed).appendTo($app);

  renderFeed();

});