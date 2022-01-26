$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  function handleUsernameClick(event) {
    $updateFeed.text('Update Feed')
    var clickedUser = event.target.innerText;
    $feed.html('')
    var index = streams.home.length - 1;
    index = streams.home.length - 1;

    if (clickedUser === 'Update Feed' || clickedUser === undefined) {
      while(index >= 0) {
        renderFeed(index);
        index-= 1;
      }
    } else {
      $updateFeed.text('Back');
      while(index >= 0) {
        var currentUser = '@' + streams.home[index].user;
        if (currentUser !== clickedUser) {
          index-= 1;
          continue;
        } else {
          renderFeed(index);
          index-= 1;
        }
      }
    }
  };

  function firstRun() {
    var index = streams.home.length - 1;
    index = streams.home.length - 1;
    while(index >= 0) {
      renderFeed(index);
      index-= 1;
    }
  }

  function renderFeed(index) {
    var tweet = streams.home[index];
    var $image = $('<img class="profile-photo">');
    var $tweet = $('<div class="tweet"></div>');
    var $username = $('<span class="username"></span>');
    var $timestamp = $('<span class="timestamp"></span>');
    var $message = $('<p class="message"></p>');

    var $iconRow = $('<div class="iconRow"></div>');
    var $comment = $('<i class="comment fas fa-comment"></i>');
    var $retweet = $('<i class="retweet fas fa-retweet"></i>');
    var $like = $('<i class="like far fa-thumbs-up"></i>');
    var $share = $('<i class="share fas fa-share-square"></i>');

    $message.text(tweet.message);
    $image.attr('src', tweet.profilePhotoURL);
    $username.text('@' + tweet.user);
    $timestamp.text($.timeago(tweet.created_at));

    $tweet.appendTo($feed);
    $iconRow.append($comment, [$retweet, $like, $share]);
    $tweet.append($image, [$username, $timestamp, $message, $iconRow]);

  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  })



  // $updateFeed.on('click', renderFeed);
  $('#app').on('click', '#update-feed', event, handleUsernameClick);
  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);
  firstRun();

  $('#feed').on('click', 'span.username', event,  handleUsernameClick);
  window.isItBeautifulYet = true
});