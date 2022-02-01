$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // DELETE THIS CRAP:
  // var $title = $('<h1>Twiddler</h1>');
  // $title.appendTo($app);
  // $title.on('click', function(e) { console.log(e); });

  // Header
  var $header = $('<header></header>');
  $header.appendTo($app);
  var $logo = $('<div id="logo">Logo will go here</div>');
  $logo.appendTo($header);

  // Main Container
  var $mainContainer = $('<main></main>');
  $mainContainer.appendTo($app);
  // Sidebar
  var $sidebar = $('<div id="sidebar"></div>');
  $sidebar.appendTo($mainContainer);
  $sidebar.append('<p>Some sidebar content will go here.</p>')
  // Tweet Container
  var $tweetContainer = $('<div id="tweet-container"></div>');
  $tweetContainer.appendTo($mainContainer);
  // New Tweet
  var $newTweet = $('<div id="new-tweet"></div>');
  $newTweet.appendTo($tweetContainer);
  // Feed
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($tweetContainer);

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($feed);
    index -= 1;
  }

});