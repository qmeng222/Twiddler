$(document).ready(function(){
  jQuery("time.timeago").timeago();

  //global variables //


  // Select already existing elements //

  var $app = $('#app');

  // Create new HTML elements //

  var $title = $('<h1 class ="title">Twiddler</h1>');

  var $homeFeed = $('<div id="feed"></div>')

  var $updateFeed = $('<button id="update-feed" type="button">Update Feed</button>');

  var $backButton = $('<button id="back-button" type="button>Back</button>');

  // Create event handler functions //

//rerenderFeed function
  var rerenderFeed = function(profile) {

    $('#feed').empty();

      if (profile) {

        var userArray = streams.users[profile];

        var index = userArray.length - 1;

      } else {

        var index = streams.home.length - 1;

      }

      while(index >= 0){

        if (profile) {

          var tweet = streams.users[profile][index];

        } else {

          var tweet = streams.home[index];
        }

      var $tweet = $('<div class="tweet"></div>');

      var username = tweet.user;

      var profileImgPath = 'src="assets/img/' + username + '.png"';

      var iconImgPath = 'src="assets/icons/placeholder.png"';

      var $profilePhoto = $('<img class="profile-photo "' + profileImgPath + ' alt="User Profile Photo">');

      $profilePhoto.appendTo($tweet);

      var $user = $('<div class="username ' + username + '">' + '@' +username + '</div>');

      $user.appendTo($tweet);

      $('div.douglascalhoun').on("click", function() {
        rerenderFeed('douglascalhoun');
        $('#update-feed').html('Back');
      });

      $('div.sharksforcheap').on("click", function() {
        rerenderFeed('sharksforcheap');
        $('#update-feed').html('Back');
      });

      $('div.mracus').on("click", function() {
        rerenderFeed('mracus');
        $('#update-feed').html('Back');
      });

      $('div.shawndrost').on("click", function() {
        rerenderFeed('shawndrost');
        $('#update-feed').html('Back');
      });

      var $message = $('<div class="message">' + tweet.message + '</div>');

      $message.appendTo($tweet);

      var $timestamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');

      $timestamp.appendTo($tweet);

      var $iconContainer = $('<div></div>');

      var $iconSpan = $('<span class="icons"></span>');

      var $commentIcon = $('<i class="comment fas fa-comment"></i>');

      $commentIcon.appendTo($iconSpan);

      var $retweetIcon = $('<i class="retweet fas fa-retweet"></i>');

      $retweetIcon.appendTo($iconSpan);

      var $likeIcon = $('<i class="like far fa-thumbs-up"></i>');

      $likeIcon.appendTo($iconSpan);

      var $shareIcon = $('<i class="share fas fa-share-square"></i>');

      $shareIcon.appendTo($iconSpan);

      $iconSpan.appendTo($iconContainer);

      $iconContainer.appendTo($tweet);

      $tweet.appendTo($homeFeed);

      index -= 1;

    }

  }

  // Set event listeners (providing appropriate handlers as input) //

  $title.on("click", function(event) {
    console.log(event);
    alert('<(\'.\'<)~Welcome to our Consumerist Data Mining Hellscape!~(>\'.\')>');
  });

  $updateFeed.on("click", function(event) {
    rerenderFeed();
    $('#update-feed').html('Update Feed');
  });

  // $user('.douglascalhoun').on("click", function() {
  //   rerenderFeed(douglascalhoun);
  // });

  // Append new HTML elements to the DOM //

  $title.appendTo($app);

  $homeFeed.appendTo($app);

  $updateFeed.appendTo($app);


rerenderFeed();

window.isItBeautifulYet = true;

});