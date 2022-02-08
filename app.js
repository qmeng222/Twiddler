$(document).ready(function(){
  // Select already existing app element
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id=update-feed>Update Feed</button>');
  var $twitterFeed = $('<div id=feed></div>');

  // Append static elements to the page (DOM)
  $title.appendTo($app);
  $button.appendTo($app);
  $twitterFeed.appendTo($app);

  // Create helper function for loading the feed
  var renderFeed = function(user) {
    if (user === undefined) {
      index = streams.home.length - 1;
    } else {
      index = streams.users[user].length - 1;
    }

    while (index >= 0) {
      if (user === undefined) {
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[user][index];
      }

      var $tweet = $('<div class=tweet></div>');

      $tweet.text('@' + tweet.user + ': ' + tweet.message);

      // Append elements to the page (DOM)
      $tweet.appendTo($twitterFeed);
      index -= 1;
    }
  };

  renderFeed();

  var handleBtnClick = function(event) {
    $twitterFeed.html('');
    renderFeed();
    $button.text('Update Feed');
  }

  $button.on('click', handleBtnClick);
});

