$(document).ready(function(){

  //select already existing elements
  var $app = $('#app');
  $app.html('');

  //Home Feed button
  //create new html elements
  var $title = $('<div id="title">Twiddler</div>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $("<div id=\"feed\"></div>");


  //create event handler functions
  var renderFeed = function(user){
    var index = streams.home.length - 1;

    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<div class="username"></div>');
      var $photo = $('<div class="profile-photo"></div>');
      var $message = $('<div class="message"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $comment = $('<i class="icon i comment fas fa-atom"></i>');
      var $retweet = $('<i class="icon retweet fas fa-user-astronaut"></i>');
      var $like = $('<i class="icon like fas fa-robot"></i>');
      var $share = $('<i class="icon share fas fa-rocket"></i>');

      $photo.prepend('<img class="profile-photo" src=' + tweet.profilePhotoURL + ' />').appendTo($tweet);
      $username.text('@' + tweet.user).appendTo($tweet);
      $message.text(tweet.message).appendTo($tweet);
      $timestamp.text($.timeago(tweet.created_at)).appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;

      //user feed
      $username.click(user, function() {
        $($feed).empty();
        $($button).text(function() {
          if ($(this).text() === 'Update Feed') {
            $(this).text('Back');
          }
        });

        var clickedUser = $(this).text().substring(1);
        var findUser = streams.users[clickedUser];

         _.each(findUser, function(item){
          var $clickPhoto = $('<div class="profile-photo"></div>');
          var $clickUser = $('<div class="username"></div>');
          var $clickTweet = $('<div class="tweet"></div>');
          var $clickMessage = $('<div class="message"></div>');
          var $comment = $('<i class="i comment fas fa-atom"></i>');
          var $retweet = $('<i class="i retweet fas fa-user-astronaut"></i>');
          var $like = $('<i class="i like fas fa-robot"></i>');
          var $share = $('<i class="i share fas fa-rocket"></i>');

          $clickPhoto.prepend('<img class="profile-photo" src=' + tweet.profilePhotoURL + ' />').appendTo($clickTweet);
          $clickUser.text('@' + item.user).appendTo($clickTweet);
          $clickMessage.text(item.message).appendTo($clickTweet);
          $comment.appendTo($clickTweet);
          $retweet.appendTo($clickTweet);
          $like.appendTo($clickTweet);
          $share.appendTo($clickTweet);
          $clickTweet.appendTo($feed);
        });


      });
    };

  };



  //set event listeners
  renderFeed();
  $button.click(function() {
    $($feed).empty();
    renderFeed();
    if ($(this).text() === 'Back') {
      $(this).text('Update Feed');
    }
  });

  //append new HTML elements to the dom
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);







});
window.isItBeautifulYet = true



