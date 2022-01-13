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

  function handleUsernameClick() {
    var userClicked = $(this)[0].innerText.substring(1);
    renderFeed(userClicked);
  }

  function renderFeed(user) {
    typeof user !== 'string' ? user = null : user = user;
    // user ? $button.text('Back') : $button.text('Update Feed')
    var newIndex = user ? streams.users[user].length -1 : newIndex = streams.home.length-1;
    var $users = streams.users;
    user ? $button.html('Back') : $button.html('Update Feed');
    $feed.html('');

    while(newIndex >= 0) {
      // var tweet = streams.home[newIndex];
      var tweet = user ? streams.users[user][newIndex] : streams.home[newIndex];
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
      $.each([$profilePhoto, $username, $message, $timestamp, $commentIcon, $retweetIcon, $likeIcon, $shareIcon],
        function(index,value) {
          value.appendTo($tweet);
      });
      $tweet.appendTo($feed);
      newIndex -= 1;
    }

      //Additional EventHandlers
      $($feed).find('.username').on('click', handleUsernameClick);
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

How to render user feed only.

//on click of a username (addEventListener for this)
  //traverse through the list of possible users(maybe by streams.user??)
  //if what we clicked matches one of the people in the streams.users
    //render instead, the user with:
      //profilePic, username, tweet, timestamp, icons + an icon to GO BACK to home stream.

*/