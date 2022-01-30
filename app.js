$(document).ready(function(){
  //Select already existing elements
  var $app = $('#app');
  //clears html in app
  $app.html('');

  //Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id=update-feed>Update Feed</button>');
  var $feed = $('<div id=feed></div>');


  //Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  //Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var renderFeed = function () {
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
      var $profilephoto = $('<img class="profile-photo" src="assets/img/"' + tweet.user + '".png">');
      $profilephoto.appendTo($tweet);
      // var $username = $('.tweet').append('<div class="username">'@' + tweet.user</div>');
      // var $message = $('.tweet').append('<div class="message"></div>')
      // var $timestamp = $('.tweet').append('<div class="timestamp"></div>')
      //take div and put it on app
      $tweet.appendTo($feed);
      //decrement i (move to next most recent tweet)
      index -= 1;
    }
  }

  //Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick)
  $button.on('click', renderFeed);

  renderFeed();

});