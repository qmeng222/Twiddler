
$(document).ready(function(){
  // var $app = $('#app');
  // $app.html('');

  // // The h1 element with text "Twiddler"
  // var $title = $('<h1>Twiddler</h1>');
  // // Appending the h1 element to the DOM, nest inside #app div
  // $title.appendTo($app);
  // // Set a click event listener on the h1 element
  // $title.on("click", function(event) {
  //   console.log(event);
  //   alert('The title of this page is: ' + event.target.innerText);
  // });

  // // Creating an Update Feed Button
  // var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  // $updateFeedButton.appendTo($app);
  // $updateFeedButton.on("click", function(event) {
  //   $feed.html('');
  //   renderFeed();
  // });

  // // Defining the Feed
  // var $feed = $('<div id="feed"></div>');
  // $feed.appendTo($app);

  // // This builds new tweets to put into my feed
  // var renderFeed = function() {
  //   var index = streams.home.length - 1;
  //   while(index >= 0){
  //     var tweet = streams.home[index];
  //     var $tweet = $('<div id= "feed" class="tweet"></div>');
  //     $tweet.text('@' + tweet.user + ': ' + tweet.message);
  //     $tweet.appendTo($feed);
  //     index -= 1;
  //   };
  // }
  // renderFeed();


  // FIRST THINGS. Already Existing Elements and Given Things
  var $app = $('#app');
  $app.html('');

  // HTML. Elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // FUNCTION. Event Handlers and Functions
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
    // This updates the Feed
  $updateFeedButton.on("click", function(event) {
    $feed.html('');
    renderFeed();
  });
    // This builds new tweets to put into my feed
  var renderFeed = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div id= "feed" class="tweet"></div>');
      var $profilePhoto = $('<img id="feed" class="profile-photo" src="' + tweet.profilePhotoURL + '">');
      var $userName = $('<div id="feed" class="username"></div>');
      var $message = $('<div id="feed" class="message"></div>');
      var $timeStamp = $('<div id="feed" class="timestamp"></div>');

      var $icon = $('<div id="feed"></div>');
      var $comment = $('<img id="feed" class="comment" src="./assets/icons/placeholder.png">');
      var $retweet = $('<img id="feed" class="retweet" src="./assets/icons/placeholder.png">');
      var $like = $('<img id="feed" class="like" src="./assets/icons/placeholder.png">');
      var $share = $('<img id="feed" class="share" src="./assets/icons/placeholder.png">');


      $profilePhoto.appendTo($tweet);
      $userName.text('@' + tweet.user).appendTo($tweet);
      $message.text(tweet.message).appendTo($tweet);
      $timeStamp.text(tweet.created_at).appendTo($tweet);

      $comment.appendTo($icon);
      $retweet.appendTo($icon);
      $like.appendTo($icon);
      $share.appendTo($icon);
      $icon.appendTo($tweet);


      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      // $profilePhoto.appendTo($feed);
      $tweet.appendTo($feed);
      index -= 1;
    };
  }
  renderFeed();

  // APPEND. Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);
});