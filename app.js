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
      //$tweet.text('@' + tweet.user + ': ' + tweet.message);

      var $profilephoto = $('<img class="profile-photo" src="assets/img/"' + tweet.user + '".png">');
      $profilephoto.appendTo($tweet);

      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);

      var $message = $('<div class="message"></div>')
      $message.text(tweet.message);
      $message.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>')
      $timestamp.text(Date());
      $timestamp.appendTo($tweet);

      var $comment = $('<img class="icon comment" src="assets/icons/placeholder.png">');
      $comment.appendTo($tweet);
      var $retweet = $('<img class="icon retweet" src="assets/icons/placeholder.png">');
      $retweet.appendTo($tweet);
      var $like = $('<img class="icon like" src="assets/icons/placeholder.png">');
      $like.appendTo($tweet);
      var $share = $('<img class="icon share" src="assets/icons/placeholder.png">');
      $share.appendTo($tweet);

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