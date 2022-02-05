
$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  // add header: Twiddler
  // Create new HTML elements
  var $title = $('<h1> Twiddler</h1>')
  // Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }
  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  // Append new HTML elements to the DOM
  $title.appendTo($app);

  // Create new HTML elements
  var $button = $('<button id=update-feed>Update Feed</button>')
  // create an helper function for use in handler function
  var renderFeed = function () {
    var $feed = $('<div id=feed></div>')
    $feed.appendTo($app);
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class=tweet></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      // add users profile pic to each tweet;
      var $photoShawndrost = $('<img class=profile-photo src=assets/img/shawndrost.png />')
      var $photoMracus = $('<img class=profile-photo src=assets/img/mracus.png />')
      var $photoSharksforcheap = $('<img class=profile-photo src=assets/img/sharksforcheap.png />');
      var $photoDouglascalhoun = $('<img class=profile-photo src=assets/img/douglascalhoun.png />')

      if(tweet.user === 'shawndrost') {
        $photoShawndrost.prependTo($tweet)
      }
      if(tweet.user === 'mracus') {
        $photoMracus.prependTo($tweet)
      }
      if(tweet.user === 'sharksforcheap') {
        $photoSharksforcheap.prependTo($tweet)
      }
      if(tweet.user === 'douglascalhoun') {
        $photoDouglascalhoun.prependTo($tweet)
      }
      //add username
      var $username = $('<div class=username></div>')
      $username.text('@' + tweet.user)
      $username.on('click', handleUsernameClick);
      $username.appendTo($tweet)
      //add tweet message
      var $message= $('<div class=message></div>')
      $message.text(tweet.message)
      $message.appendTo($tweet)
      // add tweet timestamp
      var $timestamp= $('<div class=timestamp></div>')
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet)
      // add four img elements: comment, retweet, like, share
      var $comment = $('<i class="icon comment fas fa-comment"/>')
      $comment.appendTo($tweet)
      var $retweet = $('<i class="icon retweet fas fa-retweet"/>')
      $retweet.appendTo($tweet)
      var $like = $('<i class="icon like fas fa-thumbs-up"/>')
      $like.appendTo($tweet)
      var $share = $('<i class="icon share fas fa-share-alt"/>')
      $share.appendTo($tweet)
      // add icon hover action
      $('.icon').hover(function(){
        $(this).css("color","blue");
      }, function() {
        $(this).css("color","black");
      })
      // add tweet to the feed
      $tweet.appendTo($feed);
      index -= 1;
    }
  }

  var userFeed = function (username) {

    var $feed = $('<div id=feed></div>')
    $feed.appendTo($app);
    for (var key in streams.users) {
      if (key === username) {
        var index = streams.users[key].length - 1;
        while(index >= 0){
          var tweet = streams.users[key][index];
          var $tweet = $('<div class=tweet></div>');
          // $tweet.text('@' + tweet.user + ': ' + tweet.message);
          // add users profile pic to each tweet;
          var $photoShawndrost = $('<img class=profile-photo src=assets/img/shawndrost.png />')
          var $photoMracus = $('<img class=profile-photo src=assets/img/mracus.png />')
          var $photoSharksforcheap = $('<img class=profile-photo src=assets/img/sharksforcheap.png />');
          var $photoDouglascalhoun = $('<img class=profile-photo src=assets/img/douglascalhoun.png />')

          if(username === 'shawndrost') {
            $photoShawndrost.prependTo($tweet)
          }
          if(username === 'mracus') {
            $photoMracus.prependTo($tweet)
          }
          if(username === 'sharksforcheap') {
            $photoSharksforcheap.prependTo($tweet)
          }
          if(username === 'douglascalhoun') {
            $photoDouglascalhoun.prependTo($tweet)
          }
          //add username
          var $username = $('<div class=username></div>')
          $username.text('@' + tweet.user)
          $('.username').on('click', handleUsernameClick);
          $username.appendTo($tweet)
          //add tweet message
          var $message= $('<div class=message></div>')
          $message.text(tweet.message)
          $message.appendTo($tweet)
          // add tweet timestamp
          var $timestamp= $('<div class=timestamp></div>')
          $timestamp.text(jQuery.timeago(tweet.created_at));
          $timestamp.appendTo($tweet)
          // add four img elements: comment, retweet, like, share
          var $comment = $('<i class="icon comment fas fa-comment"/>')
          $comment.appendTo($tweet)
          var $retweet = $('<i class="icon retweet fas fa-retweet"/>')
          $retweet.appendTo($tweet)
          var $like = $('<i class="icon like fas fa-thumbs-up"/>')
          $like.appendTo($tweet)
          var $share = $('<i class="icon share fas fa-share-alt"/>')
          $share.appendTo($tweet)
          // add icon hover action
          $('.icon').hover(function(){
            $(this).css("color","blue");
          }, function() {
            $(this).css("color","black");
          })
          // add tweet to the feed
          $tweet.appendTo($feed);
          index -= 1;
        }
      }
   }
  }
// Append new HTML elements to the DOM
  $button.appendTo($app);
  renderFeed();
  // Create event handler functions
  var handleButtonClick = function() {
    $('#feed').remove();
    renderFeed();
    $button.text('Update Feed');
  }
  // Set event listeners (providing appropriate handlers as input
  $button.on('click', handleButtonClick);

  // Create event handler function for username
  var handleUsernameClick = function() {
    $('#feed').remove();
    $button.text('Back');
    var username = $(this).text().substring(1);
    userFeed(username);
  }

});

window.isItBeautifulYet = true;