$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');


  // Create new HTML elements
  var $feed = $('<div id="feed"></div>');
  var $title = $('<h1>TWIMBLEDON</h1>');
  var $UpdateFeed= $('<button id="update-feed" type="button">Update Feed</button>')
  var $tweet = $('<div class="tweet"></div>');


  // Create event handler functions
  var handleTitleClick = function(event) {
    console.log(event.target.innerText);
    alert('The title of this page is: ' + event.target.innerText)
  }

  var handleUsernameClick = function(event) {
    //to be finished in extra credit
  }



  var renderFeed = function(user) {
    $feed.html('');

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $msg = $('<div class="message">' + tweet.message + '</div>');
      var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
      var $img = $("<img src='assets/img/"+ tweet.user + ".png' class='profile-photo'>")
      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="icon comment fas fa-comment-dots"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like= $('<i class="icon like fas fa-heart"></i>');
      var $share = $('<i class="icon share fas fa-share"></i>');

      $tweet.appendTo($feed);
      $img.appendTo($tweet);
      $username.appendTo($tweet);
      $msg.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);

      index -= 1;

      if($UpdateFeed.text() === 'Back') {
        $UpdateFeed.text('Update Feed');
      }

      $username.on("click", function(event) {
        console.log(event.target.innerText.slice(1))
        $feed.html('');
        var person = event.target.innerText.slice(1);
        var index = streams.users[person].length - 1;
        while(index >= 0){
          var tweet = streams.users[person][index];
          var $tweet = $('<div class="tweet"></div>');
          var $msg = $('<div class="message">' + tweet.message + '</div>');
          var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
          var $img = $("<img src='assets/img/"+ tweet.user + ".png' class='profile-photo'>")
          var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
          var $comment = $('<i class="icon comment fas fa-comment-dots"></i>');
          var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
          var $like= $('<i class="icon like fas fa-heart"></i>');
          var $share = $('<i class="icon share fas fa-share"></i>');

          $tweet.appendTo($feed);
          $img.appendTo($tweet);
          $username.appendTo($tweet);
          $msg.appendTo($tweet);
          $timestamp.appendTo($tweet);
          $comment.appendTo($tweet);
          $retweet.appendTo($tweet);
          $like.appendTo($tweet);
          $share.appendTo($tweet);
          index -= 1;
        }
        if($UpdateFeed.text() === 'Update Feed') {
          $UpdateFeed.text('Back');
        }
      });
    }
  };


  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", handleTitleClick);

  $UpdateFeed.on("click", renderFeed);



  // Append new HTML elements to the DOM
  $app.html('');
  $title.appendTo($app);
  $UpdateFeed.appendTo($app);
  $feed.appendTo($app)


  //render feed on app load
  renderFeed();

});


window.isItBeautifulYet = true;




