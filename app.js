$(document).ready(function(){
  // Select already existing elements
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var currentIndex = streams.home.length;

  // Create new HTML elements
  $app.html('');

  var $title = $('<h1 class="title">Twiddler<h1>');

  var $button = $('<button id="update-feed"</button>');
  $button.text('Update Feed');

  var $feed = $('<div id=feed></div<');



  // Create event handler functions
  function renderFeed(username, message) {
    var newIndex = streams.home.length-1;
    var $users = streams.users;
    $feed.html('');

    while(newIndex >= 0) {
      //NOTE FOR LATER: use on hover, show the filled in dark version of icons.
      var tweet = streams.home[newIndex];
      var $profilePhoto = $('<img class="profile-photo" />');
      var $username = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $commentIcon = $('<i class="far fa-comment-alt fa-2x icon comment"></i>');
      var $retweetIcon = $('<i class="fas fa-retweet fa-2x icon retweet"></i>');
      var $likeIcon = $('<i class="far fa-thumbs-up fa-2x icon like"></i>');
      var $shareIcon = $('<i class="far fa-share-square fa-2x icon share"></i>');
      var $tweet = $('<div class="tweet"></div>');

      //event handlers
      $retweetIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);
      $commentIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);
      $likeIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);
      $shareIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);


      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $timestamp.text(jQuery.timeago(tweet.created_at));
      // $tweet.text('@' + tweet.user + ': ' + tweet.message + ': ' + tweet.created_at + tweet.profilePhotoURL);
      $.each([$profilePhoto, $username, $message, $timestamp, $commentIcon, $retweetIcon, $likeIcon, $shareIcon],
        function(index,value) {
          value.appendTo($tweet);
      });
      $tweet.appendTo($feed);
      newIndex -= 1;
    }
  }

  function handleIconHover() {
    // var $empty = $myIcon.hasClass('far');
    // var colorMatch = {
    //   comment: 'blue',
    //   retweet: 'green',
    //   like: 'red',
    //   share: 'aquablue',
    // }
    // function matchColor() {
    //   for (var i = 0; i < iconSet.length; i++) {
    //     if ($myIcon.hasClass(iconSet[i])) {
    //       return colorMatch[iconSet[i]];
    //     }
    //   }
    // }
    $(this).toggleClass('highlight');
    // $myIcon.css('color') === $iconColor ? $myIcon.css('color', 'lightblue') : $myIcon.css('color', 'black');

  }

  // Set event listeners (providing appropriate handlers as input)
  $button.on('click', renderFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);



  renderFeed();
});


/*

function to create a tweet
  //we want:
  -profile picture (img with class profile-photo)
  -username (span with class username)
  -tweet (span, p, or div with class 'message)
  -date posted (span or div with class timestamp)
  -four images with the class 'icon' each with their own classes
--this will go inside a div with a class of tweet, which will be appended to feed.


 Include the appropriate data inside each child element:
 .profile-photo elements should have an src attribute set to the path of the appropriate user's photo .jpeg file (already in repo).
 .username elements should contain the current Tweet object's username, with format: "@username".
 .message elements should contain the current Tweet object's message.
 .timestamp elements should contain the current Tweet object's timestamp.
 .icon elements should have a src attribute set to the path of your repo's placeholder.png file.
*/