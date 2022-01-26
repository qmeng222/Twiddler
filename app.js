$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }
  var renderFeed = function() {
    var index = streams.home.length - 1;
    $feed.empty();
    while(index >= 0){
      var tweet = streams.home[index];
      console.log(tweet);
      var $tweet = $('<div class="tweet"></div>');
      // // create child element for profile pic <img> or <div>
      // $( ".tweet" ).append( "<img class=profile-photo></img>" );
      var $profilephoto = $("<img class=profile-photo></img>");
      $profilephoto.attr("src", './assets/img/' + tweet.user + '.png');
      $tweet.append($profilephoto);
      // $tweet.append("<img class=profile-photo></img>");
      // create child element username <span> or <div>
      var $username = $("<div class=username></div>")
      $username.text('@' + tweet.user)
      $tweet.append($username);
      // create child element message <span>, <p>, or <div>
      var $message = $("<div class=message></div>");
      $message.text(tweet.message);
      $tweet.append($message);
      // create child element timestamp <span> or <div>
      var $timestamp = $("<div class=timestamp></div>");
      $timestamp.text(tweet.created_at);
      $tweet.append($timestamp);
      // // create child element icon <img>
      $icon = $("<img class=icon></img>");
      $icon.attr("src", './assets/icons/placeholder.png');
      $tweet.append($icon);
      // // create child element comment <img>
      $comment = $("<img class=comment></img>");
      $comment.attr("src", './assets/icons/placeholder.png');
      $tweet.append($comment);
      // // create child element retweet <img>
      $retweet = $("<img class=retweet></img>");
      $retweet.attr("src", './assets/icons/placeholder.png');
      $tweet.append($retweet);
      // // create child element like <img>
      $like = $("<img class=like></img>");
      $like.attr("src", './assets/icons/placeholder.png');
      $tweet.append($like);
      // // create child element share <img>
      $share = $("<img class=share></img>");
      $share.attr("src", './assets/icons/placeholder.png');
      $tweet.append($share);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };
   renderFeed();

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', handleTitleClick);
  $button.on('click', function(event) {
    renderFeed();
  });

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

});
