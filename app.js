// adds tweets to feed once DOM has loaded
$(document).ready(function(){

  /*
  ========================================================================================
  Select already existing elements
  ========================================================================================
  */
  var $app = $('#app');

  /*
  ========================================================================================
  Create new HTML elements
  ========================================================================================
  */
  var $container13 = $('<section class="container-1-3"></section>');
    var $title = $('<h1>Twiddler</h1>');
    var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $container23 = $('<section class="container-2-3"></section>');
    var $feed = $('<div id="feed"></div>');
      // var $tweet = $('<div class="tweet"></div>');
      //   var $tweetContainer1 = $('<div class="tweetContainer1"></div>');
      //     var $profilePhoto = $('<div class="profile-photo"></div>');
      //     var $message = $('<div class="message"></div>');
      //   var $tweetContainer2 = $('<div class="tweetContainer2"></div>');
      //     var $tweetContainer21 = $('<div class="tweetContainer21"></div>');
      //     var $tweetContainer22 = $('<div class="tweetContainer22"></div>');



  /*
  ========================================================================================
  Create event handler functions
  ========================================================================================
  */

  // render the feed
  var renderFeed = function(usrnm) {
    var index = streams.home.length - 1;
    if (usrnm) {
      index = streams.users[usrnm].length - 1;
    }
    while(index >= 0){
      if (!usrnm) {
        // set reference variable to 'database'
        var tweet = streams.home[index];

        // Create new HTML elements
        var $tweet = $('<div class="tweet"></div>');
          var $tweetContainer1 = $('<div class="tweetContainer1"></div>');
            var $pfpContainer = $('<div class="pfpContainer"></div>');
              var $profilePhoto = $('<img class="profile-photo" src=' + tweet.profilePhotoURL +'>')
            var $message = $('<div class="message">' + tweet.message + '</div>');
          var $tweetContainer2 = $('<div class="tweetContainer2"></div>');
            var $tweetContainer2a = $('<div class="tweetContainer2a"></div>');
              var $commentIcon = $('<i class="comment fas fa-comments"></i>');
              var $retweetIcon = $('<i class="retweet fas fa-retweet"></i>');
              var $likeIcon = $('<i class="like fas fa-heart"></i>');
              var $shareIcon = $('<i class="share fas fa-share-alt"></i>');
            var $tweetContainer2b = $('<div class="tweetContainer2b"></div>');
              var $username = $('<span class="username">' + '@' + tweet.user + '</span>');
              var $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');

        // Append HTML elements
        $tweetContainer1.appendTo($tweet);
            $pfpContainer.appendTo($tweetContainer1);
              $profilePhoto.appendTo($pfpContainer);
            $message.appendTo($tweetContainer1);
        $tweetContainer2.appendTo($tweet);
          $tweetContainer2a.appendTo($tweetContainer2);
            $commentIcon.appendTo($tweetContainer2a);
            $retweetIcon.appendTo($tweetContainer2a);
            $likeIcon.appendTo($tweetContainer2a);
            $shareIcon.appendTo($tweetContainer2a);
          $tweetContainer2b.appendTo($tweetContainer2);
            $username.appendTo($tweetContainer2b);
            $timestamp.appendTo($tweetContainer2b);
        $tweet.appendTo($feed);
        index -= 1;
      } else {
        // set reference variable to 'database'
        var tweet = streams.users[usrnm][index];
        // Create new HTML elements
        var $tweet = $('<div class="tweet"></div>');
          var $tweetContainer1 = $('<div class="tweetContainer1"></div>');
            var $pfpContainer = $('<div class="pfpContainer"></div>');
              var $profilePhoto = $('<img class="profile-photo" src=' + tweet['profilePhotoURL'] +'>')
            var $message = $('<div class="message">' + tweet.message + '</div>');
          var $tweetContainer2 = $('<div class="tweetContainer2"></div>');
            var $tweetContainer2a = $('<div class="tweetContainer2a"></div>');
              var $commentIcon = $('<i class="comment fas fa-comments"></i>');
              var $retweetIcon = $('<i class="retweet fas fa-retweet"></i>');
              var $likeIcon = $('<i class="like fas fa-heart"></i>');
              var $shareIcon = $('<i class="share fas fa-share-alt"></i>');
            var $tweetContainer2b = $('<div class="tweetContainer2b"></div>');
              var $username = $('<span class="username">' + '@' + tweet.user + '</span>');
              var $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');

        // Append HTML elements
        $tweetContainer1.appendTo($tweet);
            $pfpContainer.appendTo($tweetContainer1);
              $profilePhoto.appendTo($pfpContainer);
            $message.appendTo($tweetContainer1);
        $tweetContainer2.appendTo($tweet);
          $tweetContainer2a.appendTo($tweetContainer2);
            $commentIcon.appendTo($tweetContainer2a);
            $retweetIcon.appendTo($tweetContainer2a);
            $likeIcon.appendTo($tweetContainer2a);
            $shareIcon.appendTo($tweetContainer2a);
          $tweetContainer2b.appendTo($tweetContainer2);
            $username.appendTo($tweetContainer2b);
            $timestamp.appendTo($tweetContainer2b);
        $tweet.appendTo($feed);
        index -= 1;
      }
    }
  }



  var handleUsernameClick = function(usrnm){
    // if updateButton text = Update Feed, change to "back"
    if ($('#update-feed').text() === "Update Feed") {
      $('#update-feed').text("Back");
    }
    renderFeed(usrnm);
  }

  /*
  ========================================================================================
  Set event listeners, providing appropriate handlers as input
  ========================================================================================
  */

  // updateButton: remove all previously existing tweets, then render feed
  $updateButton.on('click', function(){
    // if text is "back", change to update feed
    if ($('#update-feed').text() === "Back") {
      $('#update-feed').text("Update Feed");
    }
    $feed.html('');
    renderFeed();
  });

  // handleUsernameClick upon clicking
  $feed.on('click', 'span.username', function(){
    var text = ($(this).text()).slice(1);
    $feed.html('');
    handleUsernameClick(text);
  });


  /*
  ========================================================================================
  Append new HTML elements to the DOM
  ========================================================================================
  */
  $app.html('');
  $container13.appendTo($app);
    $title.appendTo($container13);
    $updateButton.appendTo($container13);
  $container23.appendTo($app);
    $feed.appendTo($container23);
      //$tweet.appendTo($feed);
        // $tweetContainer1.appendTo($tweet);
          // $profilePhoto.appendTo($tweetContainer1);
          // $message is appended in renderFeed
        // $tweetContainer2.appendTo($tweet);
          // $tweetContainer21.appendTo($tweetContainer2);
          // $tweetContainer22.appendTo($tweetContainer2);

  // render feed upon opening
  renderFeed();
  window.isItBeautifulYet = true;
});