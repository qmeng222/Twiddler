$(document).ready(function() {
  jQuery("time.timeago").timeago();
  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  var $title = $('<h1 id="title">Twiddler</h1>');
  var $button = $('<button id="update-feed" type="button">Update Feed</button>');
  var $feed = $('<div id=feed></div>');


  // Create new HTML elements

  var buttonClickHandler = function(event) {
    renderFeed();
    $button.text('Update Feed');
  }
  var updateHandler = function(event) {
    $('.tweet').remove();
    renderFeed();
    $button.text('Update Feed');
  };

  var renderFeed = function(user) {
    $feed.empty();
    if (user) {
      var tweetArray = streams.users[user];
    } else {
      var tweetArray = streams.home;
    }

    var index = tweetArray.length - 1;

    while(index >= 0){
      var tweet = tweetArray[index];
      var $timestamp = $('<span class="timestamp"></span>');

      var $profile_photo = $('<img class="profile-photo"></img>');
      var $username = $('<span class="username"><span>');
      var $message = $('<p class="message"></p>');
      var $tweet = $('<div class="tweet"></div>').appendTo($feed)

      var $profile_photo = $('<img class="profile-photo"></img>').attr('src', 'assets/img/' + tweet.user + '.png').appendTo($tweet);
      var $comment = $('<i class="icon comment fas fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like far fa-thumbs-up"></i>');
      var $share = $('<i class="icon share far fa-share-square"></i>');


      $username.text("@" + tweet.user).appendTo($tweet);
      $message.text(tweet.message).appendTo($tweet);
      $timestamp.text(jQuery.timeago(new Date(tweet.created_at))).appendTo($tweet);

      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);

      var userClickHandler = function(event) {
        var username = $(this).text().slice(1);
        renderFeed(username);
        $button.text('Back');
      }

      $username.on("click", userClickHandler);

      index -= 1;
      }
    }


renderFeed();

  // Create event handler functions
  var titleClickHandler = $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });



  $button.on('click', updateHandler)
  $title.on('click', titleClickHandler)



  // Set event listeners (providing appropriate handlers as input)

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app)
  $feed.appendTo($app)

  window.isItBeautifulYet = true
});
