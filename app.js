$(document).ready(function(){
  //Select already existing elements
  var $app = $('#app');
  //clears html in app
  $app.html('');

  $("time.timeago").timeago();


  //Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id=update-feed>Update Feed</button>');
  var $feed = $('<div id=feed></div>');
  //var $username = $('<div class=username></div>');




  //Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  //Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleUsernameClick = function (event) {
    console.log('this is the event: ' + event.target);
    //renderFeed(event.target.innerText);
    //toggle update feed button to 'Back' if button's text is 'Update Feed'
    if (($button).text() === "Update Feed") {
      ($button).text("Back");
      //re-renders feed with only clicked user's tweet
      //renderFeed(user);
      }
    };


  var renderFeed = function (user) {
    // Remove all previously existing Tweets from the Feed
    $feed.html('');
    if (user) {
      //index of last tweet in collection
      var index = streams.users[user].length - 1;
    } else {
      var index = streams.home.length - 1;
    }
    //iterate backwards
    while(index >= 0){
      if (user) {
      //most recent tweet
      var tweet = streams.users[user][index];
      } else {
        var tweet = streams.home[index];
      }
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

      var $timestamp = $('<div class="timestamp timeago"></div>');
      $timestamp.text($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);



      var $comment = $('<i class="far fa-comments icon comment"></i>');
      $comment.appendTo($tweet);
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      $retweet.appendTo($tweet);
      var $like = $('<i class="far fa-heart icon like"></i>');
      $like.appendTo($tweet);
      var $share = $('<i class="fas fa-share-square icon share"></i>');
      $share.appendTo($tweet);

      //take div and put it on app
      $tweet.appendTo($feed);
      //decrement i (move to next most recent tweet)
      index -= 1;
    }
  }

  //Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick)
  $button.on('click', function() {
    if (($button).text() === "Back") {
      ($button).text("Update Feed");
    }
    renderFeed()
  });


  //event delegation
  $('#feed').on('click', handleUsernameClick);

  renderFeed();


});

