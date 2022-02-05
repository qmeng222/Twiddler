$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed" type="button">Update Feed</button>');
  var $homeFeed = $('<div id="feed" class="feed"></div>');

//Appending feautures to $app
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $homeFeed.appendTo($app);


  var renderFeed = function() {
    $homeFeed.empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($homeFeed);
      index -= 1;
    }
  };

  renderFeed();
  $updateFeedButton.on('click', renderFeed);





});
