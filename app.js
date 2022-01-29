$(document).ready(function(){
  //selects elements with id app using css selector
  var $app = $('#app');
  //clears html
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page: ' + event.target.innerText);
  })

  var $button = $('<button id=update-feed>Update Feed</button>');
  $button.appendTo($app);

  var $feed = $('<div id=feed></div>');
  $feed.appendTo($app);

  $button.on('click', function(event) {
    console.log(event);
    // Remove all previously existing Tweets from the Feed
    $feed.html('');
    //index of last tweet in collection
    var index = streams.home.length - 1;
    //iterate backwards
    while(index >= 0){
      //most recent tweet
      var tweet = streams.home[index];
      //UI element, create new div with class tweet
      var $tweet = $('<div class="tweet"></div>');
      //text of above tweet
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      //take div and put it on app
      $tweet.appendTo($feed);
      //decrement i (move to next most recent tweet)
      index -= 1;
    }
  })

    //index of last tweet in collection
    var index = streams.home.length - 1;
    //iterate backwards
    while(index >= 0){
      //most recent tweet
      var tweet = streams.home[index];
      //UI element, create new div with class tweet
      var $tweet = $('<div class="tweet"></div>');
      //text of above tweet
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      //take div and put it on app
      $tweet.appendTo($app);
      //decrement i (move to next most recent tweet)
      index -= 1;
    }

});