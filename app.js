$(document).ready(function(){




  // 1. Select already existing elements
  var $app = $('#app');




  // 2. Create new HTML elements
  $app.html('');

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');

  // Create an button with the text "Update Feed"
  var $update_feed_button = $('<button id="update-feed" type="button" >Update Feed</button>');

  // Create a special <div> to act as a container
  var $feeds = $('<div ID="feed"></div>');

  // 3. Create event handler functions

  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }

  // Generate Feeds Helper Function
  var renderFeed = function(user){
    $feeds.html('');

    var my_current_array = streams.home
    if (user !== undefined) {
      my_current_array = streams.users[user]
    }
    var index = my_current_array.length - 1;

    while(index >= 0){
      var tweet = my_current_array[index];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $profile_photo = $('<img class="profile-photo" >');
      var $timestamp = $('<div class="timestamp"></div>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="comment fas fa-comment"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet""></i>');
      var $like = $('<i class="like fas fa-heart"></i>');
      var $share = $('<i class="share fas fa-share"></i>');
      $tweet.appendTo($feeds);
      $profile_photo.attr('src',tweet.profilePhotoURL)
      $profile_photo.appendTo($tweet);
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);
      $message.text(tweet.message);
      $message.appendTo($tweet);
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);
      $icon.appendTo($tweet);
      $comment.appendTo($icon);
      $retweet.appendTo($icon);
      $like.appendTo($icon);
      $share.appendTo($icon);

      index -= 1;
    }
  };





  var UpdateFeedClick = function(event) {

    var index = streams.home.length - 1;
    renderFeed();
    $update_feed_button.text('Update Feed');
    return false;
  }

  // Hover

  var MouseoverComment = function(event) {
    $(event.target).css({
      color: "red"
    });
  }

  var MouseoutComment = function() {
    $(event.target).css({
      color: "yellow"
    });

  }


  var handleUsernameClick = function(event) {
    var user = event.target.innerText.slice(1);
    renderFeed(user);
    $update_feed_button.text('Back');


  }

  // 4. Set event listeners (providing appropriate handlers as input)




  // Set a click event listener on the updatefeed element
  $update_feed_button.on("click", UpdateFeedClick);



  // 5. Append new HTML elements to the DOM

  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

  // Set a click event listener on the h1 element
  $title.on("click", handleTitleClick) ;

  // Append the button to the DOM, nested inside of the #app div
  $update_feed_button.appendTo($app);

  // Append the container to the DOM, nested inside of the #app div
  $feeds.appendTo($app);


  // Call renderFeed Helper Function
  renderFeed();
  // Set a mouseover event listener on the Icons element
  $app.on("mouseover",".icon", MouseoverComment);
  $app.on("mouseout",".icon", MouseoutComment);



  // Set a mouseout event listener on the Icons element


  $app.on("click",".username",handleUsernameClick);
  window.isItBeautifulYet = true



















});