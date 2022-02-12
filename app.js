$(document).ready(function(){
  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });
  var $app = $('#app');
  $app.html('');
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

// refresh button and feed

  var $updatefeed = $('<button id=update-feed>Refresh Feed</button>');
  $updatefeed.appendTo($app);
  var $feed = $('<div id=feed></div>');
  $feed.appendTo($app);
  var refreshedIndex = 11;
  var refreshtweets = function() {
    console.log('length of array ' + (streams.home.length-1) + ' and index' + refreshedIndex);
    while (refreshedIndex < (streams.home.length - 1)) {
      console.log('ran');
      var tweet = streams.home[refreshedIndex];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message"></p>');
      var $username = $('<span class="username"></span>');
      var $profilepic = $('<img src=' + tweet.profilePhotoURL + ' class="profile-photo"></img>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $comment = $('<i class="fa-solid fa-comment icon comment"></i>');
      var $retweet = $('<i class="fa-solid fa-retweet icon retweet"></i>');
      var $like = $('<i class="fa-solid fa-baby-carriage icon like"></i>');
      var $share = $('<i class="fa-solid fa-bullhorn icon share"></i>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $profilepic.appendTo($tweet);
      $username.text('@' + tweet.user + ': ');
      $message.text(tweet.message);
      $tweet.prependTo($feed);
      $message.appendTo($tweet);
      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      refreshedIndex += 1;
    };
    console.log('ended run' + refreshedIndex);
  };
  $updatefeed.on('click', function() {
    if ($updatefeed.text() === 'Refresh Feed') {
      console.log('ran');
      refreshtweets();
    } else {
      $('.tweet').remove();
      $updatefeed.empty();
      $updatefeed.text('Refresh Feed');
      for (var i = 0; i <= refreshedIndex; i++) {
        var tweet = streams.home[i];
        var $tweet = $('<div class="tweet"></div>');
        var $message = $('<p class="message"></p>');
        var $username = $('<span class="username"></span>');
        var $profilepic = $('<img src=' + tweet.profilePhotoURL + ' class="profile-photo"></img>');
        var $timestamp = $('<div class="timestamp"></div>');
        var $comment = $('<i class="fa-solid fa-comment icon comment"></i>');
        var $retweet = $('<i class="fa-solid fa-retweet icon retweet"></i>');
        var $like = $('<i class="fa-solid fa-baby-carriage icon like"></i>');
        var $share = $('<i class="fa-solid fa-bullhorn icon share"></i>');
        $timestamp.text(jQuery.timeago(tweet.created_at));
        $profilepic.appendTo($tweet);
        $username.text('@' + tweet.user + ': ');
        $message.text(tweet.message);
        $tweet.prependTo($feed);
        $message.appendTo($tweet);
        $username.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);
      };
    }

  });
// first 11 tweets

  var index = streams.home.length - 1;
  while(index >= 0){


    var tweet    = streams.home[index];
    var $tweet   = $('<div class="tweet"></div>');
    var $message = $('<p class="message"></p>');
    var $username = $('<span class="username"></span>');
    var $profilepic = $('<img src=' + tweet.profilePhotoURL + ' class="profile-photo"></img>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $comment = $('<i class="fa-solid fa-comment icon comment"></i>');
    var $retweet = $('<i class="fa-solid fa-retweet icon retweet"></i>');
    var $like = $('<i class="fa-solid fa-baby-carriage icon like"></i>');
    var $share = $('<i class="fa-solid fa-bullhorn icon share"></i>');
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $profilepic.appendTo($tweet);
    $username.text('@' + tweet.user + ': ');
    $message.text(tweet.message);
    $tweet.appendTo($feed);
    $message.appendTo($tweet);
    $username.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    index -= 1;
  };

  //click user ui

  $(document).on('click', '.username', function(event) {
    $('.tweet').remove();
    $('#update-feed').empty();
    $updatefeed.text('Back');
    var currUser = (event.target.innerText).slice(1, (event.target.innerText.length - 2))

    for (var i = 0; i <= streams.users[currUser].length - 1; i++) {
      var tweet = streams.users[currUser][i];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message"></p>');
      var $username = $('<div class="username"></div>');
      var $profilepic = $('<img src=' + tweet.profilePhotoURL + ' class="profile-photo"></img>');
      var $timestamp = $('<span class="timestamp"></span>');
      var $comment = $('<i class="fa-solid fa-comment icon comment"></i>');
      var $retweet = $('<i class="fa-solid fa-retweet icon retweet"></i>');
      var $like = $('<i class="fa-solid fa-baby-carriage icon like"></i>');
      var $share = $('<i class="fa-solid fa-bullhorn icon share"></i>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $profilepic.appendTo($tweet);
      $username.text('@' + tweet.user + ': ');
      $message.text(tweet.message);
      $tweet.prependTo($feed);
      $message.appendTo($tweet);
      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
    };

  });

});

