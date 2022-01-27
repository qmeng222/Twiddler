$(document).ready(function(){


  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $userfeed = $('<div id="user-feed"></div>');
  var $backbutton = $('<button type="button" id="back-button">Back</button>');

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
      var $tweet = $("<div class='tweet'></div>");
      var $profilephoto = $("<img class='profile-photo'></img>");
      $profilephoto.attr("src", './assets/img/' + tweet.user + '.png');
      $tweet.append($profilephoto);
      var $username = $("<div class='username';></div>")
      $username.text('@' + tweet.user)
      // $username.change(function() {
      //   $username.css("font-family", $(this).val('Fira Sans', sans-serif));
      // });
      $tweet.append($username);
      var $message = $("<div class='message'></div>");
      $message.text(tweet.message);
      $tweet.append($message);
      var $timestamp = $("<div class='timestamp'></div>");
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $tweet.append($timestamp);
      $icon = $("<i class='icon fas fa-icons'></i>");
      $tweet.append($icon);
      $comment = $("<i class='comment far fa-comment'></i>");
      $tweet.append($comment);
      $retweet = $("<i class='retweet fas fa-retweet'></i>");
      $tweet.append($retweet);
      $like = $("<i class='like far fa-heart'></i>");
      $tweet.append($like);
      $share = $("<i class='share fas fa-share-alt-square'></i>");
      $tweet.append($share);
      $tweet.appendTo($feed);
      index -= 1;
    }
  };
   renderFeed();

  // Set event listeners (providing appropriate handlers as input) // Note: research event delegation
  $title.on('click', handleTitleClick);
  $button.on('click', function(event) {
    renderFeed();
  });
  // $comment.on( "mouseover", function(event) {
  //   // $(this).css( "color", "red" );
  // });
  // $("i").hover(
  //   function() {
  //     $( this ).css("color", "red");
  //   },
  // );

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

});
