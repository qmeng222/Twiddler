$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  // $app.html('');

  // Create new HTML elements
  $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed" type="button">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  // Create event handler functions
  var titleClickHandler = function (event) {
    alert('The title of this page is: ' + event.target.innerText)
  };

  var buttonClickHandler = function (event) {
    rerender();
    $button.text("Update Feed");
  }

  var rerender = function (user) {
    $feed.empty();

    if (user) {
      var tweetArray = streams.users[user];
    } else {
      var tweetArray = streams.home;
    }

    var index = tweetArray.length - 1;

    while(index >= 0){
      var tweet = tweetArray[index];
      var $tweet = $('<div class="tweet"></div>').appendTo($feed);


      var $profilePhoto = $('<img class="profile-photo" alt="profile photo">').attr("src", tweet.profilePhotoURL).appendTo($tweet);
      var $username = $('<div class="username"></div>').text('@' + tweet.user).appendTo($tweet);
      var $tweetMessage = $('<div class="message"></div>').text(tweet.message).appendTo($tweet);
      var $timestamp = $('<div class="timestamp"></div>').text(jQuery.timeago(tweet.created_at)).appendTo($tweet);

      var $comment = $('<i class="fas fa-comment-alt icon comment"></i>').appendTo($icons);
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>').appendTo($icons);
      var $like = $('<i class="far fa-heart icon like"></i>').appendTo($icons);
      var $share = $('<i class="far fa-share-square icon share"></i>').appendTo($icons);

      var $icons = $('<div class="icons"></div>').appendTo($tweet);

      var userClickHandler = function (event) {
        var currentUser = $(this).text().slice(1);
        rerender(currentUser);
        $button.text('Back');
      }

      $username.on("click", userClickHandler);

      index -= 1;
    }

  }
  rerender();

  // Set event listeners (providing appropriate handlers as input)
  $button.on("click", buttonClickHandler);
  $title.on("click", titleClickHandler);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  window.isItBeautifulYet = true;
});