$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');

  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

  // Set a click event listener on the h1 element
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  // Create an id of feed within app
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  // Making a new function here because I am going to have to use this at least twice and
  // I don't want to repeat myself (DRY)
  var renderMessages = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);

      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);

      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.appendTo($tweet);

      var $profilePhoto = $('<img src="'+tweet.profilePhotoURL+'" class="profile-photo"></img>');
      $profilePhoto.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>')
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $comment = $('<i class="fas fa-comment-dots comment"></i>');
      $comment.appendTo($tweet);
      var $retweet = $('<i class="fas fa-retweet retweet"></i>');
      $retweet.appendTo($tweet);
      var $like = $('<i class="fas fa-thumbs-up like"></i>');
      $like.appendTo($tweet);
      var $share = $('<i class="fas fa-share-square share"></i>');
      $share.appendTo($tweet);

      $comment.hover(function(){
        $(this).css('color', 'blue')
      }, function(){
        $(this).css('color', '')
      });
      $retweet.hover(function(){
        $(this).css('color', 'blue')
      }, function(){
        $(this).css('color', '')
      });
      $like.hover(function(){
        $(this).css('color', 'blue')
      }, function(){
        $(this).css('color', '')
      });
      $share.hover(function(){
        $(this).css('color', 'blue')
      }, function(){
        $(this).css('color', '')
      });

      $tweet.appendTo($feed);
      index -= 1;

      $username.on('click', function(event) {
        var array = [];
        var name = event.target.innerText.slice(1);
        for (var i = 0; i < streams.home.length; i++) {
          if (streams.home[i].user === name) {
            array.push(streams.home[i]);
          }
        }
        $feed.empty();
        $updateFeed.text('Back');

        var index2 = array.length - 1
        while(index2 >= 0){
          var tweet = array[index2];
          var $tweet = $('<div class="tweet"></div>');
          // $tweet.text('@' + tweet.user + ': ' + tweet.message);

          var $message = $('<div class="message"></div>');
          $message.text(tweet.message);
          $message.appendTo($tweet);

          var $username = $('<div class="username"></div>');
          $username.text('@' + tweet.user);
          $username.appendTo($tweet);

          var $profilePhoto = $('<img src="'+tweet.profilePhotoURL+'" class="profile-photo"></img>');
          $profilePhoto.appendTo($tweet);

          var $timestamp = $('<div class="timestamp"></div>')
          $timestamp.text(jQuery.timeago(tweet.created_at));
          $timestamp.appendTo($tweet);

          var $comment = $('<i class="fas fa-comment-dots comment"></i>');
          $comment.appendTo($tweet);
          var $retweet = $('<i class="fas fa-retweet retweet"></i>');
          $retweet.appendTo($tweet);
          var $like = $('<i class="fas fa-thumbs-up like"></i>');
          $like.appendTo($tweet);
          var $share = $('<i class="fas fa-share-square share"></i>');
          $share.appendTo($tweet);

          $comment.hover(function(){
            $(this).css('color', 'blue')
          }, function(){
            $(this).css('color', '')
          });
          $retweet.hover(function(){
            $(this).css('color', 'blue')
          }, function(){
            $(this).css('color', '')
          });
          $like.hover(function(){
            $(this).css('color', 'blue')
          }, function(){
            $(this).css('color', '')
          });
          $share.hover(function(){
            $(this).css('color', 'blue')
          }, function(){
            $(this).css('color', '')
          });

          $tweet.appendTo($feed);
          index2 -= 1;
        }
      })
    }
  }

  renderMessages();

  // Create a button to update the feed
  var $updateFeed = $('<button id="update-feed">Update</button>');
  $updateFeed.prependTo($app);

  // Functionality of the update button
  $updateFeed.on('click', function(event) {
    $feed.empty();
    renderMessages();
    $updateFeed.text('Update');
  })

});