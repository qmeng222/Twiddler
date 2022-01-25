$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="#Feed"></div>');

  function handleUsernameClick(input) {
    $updateFeed.text('Update Feed')
    $feed.html('')
    var clickedUser = event.path[0].innerText;
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


  function renderFeed(index) {
    var tweet = streams.home[index];
    var $image = $('<img class="profile-photo">');
    var $tweet = $('<div class="tweet"></div>');
    var $username = $('<span class="username"></span>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $message = $('<p class="message"></p>');

    var $iconRow = $('<div class="iconRow"></div>');
    var $comment = $('<i class="fas fa-comment"></i>');
    var $retweet = $('<i class="fas fa-retweet"></i>');
    var $like = $('<i class="far fa-thumbs-up"></i>');
    var $share = $('<i class="fas fa-share-square"></i>');

    $message.text(tweet.message);
    $image.attr('src', 'assets/img/' + tweet.user + '.png');
    $username.text('@' + tweet.user);
    $timestamp.text($.timeago(new Date()));

    $tweet.appendTo($feed);
    $iconRow.append($comment, [$retweet, $like, $share]);
    $tweet.append($image, [$username, $message, $timestamp, $iconRow]);
  };

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  })



  // $updateFeed.on('click', renderFeed);
  $(document).on('click', '#update-feed', handleUsernameClick);
  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);
  renderFeed();

  $(document).on('click', '.username', handleUsernameClick);
});