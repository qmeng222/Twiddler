$(document).ready(function(){

  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>'); // create title h element
    $title.appendTo($app); // append title

  var $refreshFeed = $('<div id="update-feed">Update Feed</div>'); // create refresh button div
    $refreshFeed.appendTo($app); // append refresh button

  var $feed = $('<div class="feed"></div>'); // create feed div, class feed
    $feed.appendTo($app); // append feed element

  // streams.home holds array of tweet data objects
    // tweets added based on timing since last refresh
      // initially generates 10 tweets, generates a new tweet per second or so after page load
        // tweets should be more or less unique at time of generation

  // if tweets are pushed to streams.home over time, newest tweet are on the end of the array
    // if everything is un-appended on button click
      // re-append every tweet in reverse
  var streamArray = streams.home; // aliased array of tweet objects

  var tweetWriter = function() {

  for (var x = streamArray.length - 1; x >= 0; x--) {  // appending array objects backwards
    var tweetData = streamArray[x];  // individual tweet data
    var $tweet = $('<div class="tweet"></div>'); // represent parking spot for actual visual tweet data
    var message = $tweet.text('@' + tweetData.user + ': ' + tweetData.message); // assembled tweet
    message.appendTo($feed);
  }
  // console.log(window.streams, streams.home);

}
$refreshFeed.click(tweetWriter);
});