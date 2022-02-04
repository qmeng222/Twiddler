$(document).ready(function(){
  var $app = $('#app');
  //$app.html('');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  // $title.on("click", function(event) {
  //   console.log(event);
  //   alert('The title of this page is: ' + event.target.innerText);
  // });

  var $feed = $('<div id="feed"></div>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');

  var set = new Set();

  $button.appendTo($app);
  $button.on("click", function(event) {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<div class="username">@' + tweet.user + '</div>');
      var $message = $('<div class="message">' + tweet.message + '</div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      if (!set.has(tweet.message)) {
        set.add(tweet.message);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $tweet.prependTo($feed);
        index -= 1;
        $feed.appendTo($app);
      } else {
        index -= 1;
      }
    }
  });

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $username = $('<div class="username">@' + tweet.user + '</div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    // $tweet.text('@' + tweet.user + ': ' + tweet.message);
    set.add(tweet.message);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $tweet.appendTo($feed);
    index -= 1;
    $feed.appendTo($app);
  }
});

// function loadTweets() {
//   if (latestIndex === 0) {
//     tweets.html("");
//     while (index >= 0) {
//       var tweet = streams.home[index];
//       var $username = $('<div class="username">@' + tweet.user + '</div>');
//       var $tweet = $('<div class="message">' + tweet.message + '</div>');
//       $username.appendTo($users);
//       $tweet.appendTo($tweets);
//       $users.appendTo($feed);
//       $tweets.appendTo($feed);
//       $feed.appendTo($app);
//       index--;
//       latestIndex++;
//   } else {
//     while (latestIndex !== index) {
//       var tweet = streams.home[index];
//       var $username = $('<div class="username">@' + tweet.user + '</div>');
//       var $tweet = $('<div class="message">' + tweet.message + '</div>');
//       $username.prependTo($users);
//       $tweet.prependTo($tweets);
//       $users.prependTo($feed);
//       $tweets.prependTo($feed);
//       $feed.prependTo($app);
//       latestIndex++;
//     }
//   }
// }