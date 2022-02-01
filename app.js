//Generating the list of 10 tweets to display
$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<div class="header"><h1>Twiddler</h1></div>');
  var $homeButton = $('<div class="button"><button id="home-feed">Home Feed</button></div>');
  var $updateButton = $('<div class = "button"><button id="update-feed">Update Feed</button></div>');
  var $feed = $('<div id="feed"></div>');

  $title.appendTo($app);
  $homeButton.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);

  // //populating the 10 tweets
  // var index = streams.home.length - 1;
  // while(index >= 0){
  //   var tweet = streams.home[index];
  //   var $tweet = $('<div class="tweet"></div>');
  //   $tweet.text('@' + tweet.user + ': ' + tweet.message);
  //   //adds it to the <div> once its complete
  //   $tweet.appendTo($app);
  //   index -= 1;
  // }


  window.isItBeautifulYet = true;
});
