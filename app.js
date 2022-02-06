$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $handleUsernameClick = $('#feed .tweet .username');
  var $buttonDiv = $('<div class="container"></div>');
  var pickedUser = '';


  // Creat event listener functions
  $updateButton.on("click", function() {
    $updateButton.text('Update Feed');
    pickedUser = '';
    renderFeed();
  });

  $(document).on("click",'.username',function(){
    $updateButton.text('Back');
    pickedUser = $(this).text();
    renderFeed();
  });

  // Append new HTML elements to the DOM
  // $updateButton.appendTo($buttonDiv);

  var renderFeed = function () {
    $('#feed').empty();
    var index = streams.home.length - 1;
    var user = pickedUser;
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        var $message = $('<p class="message"></p>');
        var $userName = $('<span class="username" type="button"></span>');
        var $photo = $('<img class="profile-photo" src"">');
        var $timeStamp = $('<div class="timestamp"></div>');
        var timeConvert = jQuery.timeago(tweet.created_at);
        var $comment = $('<i class="icon comment far fa-comments"></i>');
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-thumbs-up"></i>');
        var $share = $('<i class="icon share far fa-share-square"></i>');

        if (user.length > 0) {
          if (user !== '@' + tweet.user){
            index -= 1
            continue;
          }
       }

        //$tweet.text('@' + tweet.user + ': ' + tweet.message); //This acted alik a direct descendant text node
        $photo.attr('src', tweet.profilePhotoURL);
        $photo.appendTo($tweet);
        $userName.text('@' + tweet.user );
        $userName.appendTo($tweet);
        $tweet.appendTo($feed);
        $message.text(tweet.message);
        $message.appendTo($tweet);

        $title.appendTo($app);
        $feed.appendTo($app);
        $($updateButton).insertBefore($feed);
        $updateButton.appendTo($buttonDiv);

        //$timeStamp.text($.now());
        $timeStamp.text(timeConvert);
        $timeStamp.appendTo($tweet);
        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);
        $buttonDiv.appendTo($app);

        index -= 1;
      }

    $feed.appendTo($app);
  }

  renderFeed();

  isItBeautifulYet=true;

});

