$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  $button.appendTo($app);
  $("#update-feed").on("click", function(event) {
    generateRandomTweet();
    var index = streams.home.length - 1;
    $( "#feed" ).empty();
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      index -= 1;
    }
  });

  var $feed = $('<div id="feed"></div>');;
  $feed.html('');
  $feed.appendTo($app);

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($feed);
    index -= 1;
  }

});