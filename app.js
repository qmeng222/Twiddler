$(document).ready(function(){
  var $app = $('#app');
  var $title = $('<h1>TWIDDLER</h1>');
      $title.appendTo($app);

  var $button = $('<button id="update-feed">Update Feed</button>');
      $button.appendTo($app);

  var updateFeedButtonClick = function(event) {
      $feed.html('');
      renderFeed();
    }

  var $feed = $('<div id="feed"></div>');
      $feed.appendTo($app);

  var userFeed = function(event) {
    $button.text('Back');
    $feed.html('');

    var userClicked = event.currentTarget.innerText.slice(1, event.currentTarget.innerText.length);

    var index = streams.home.length - 1;
    while(index >= 0){
      if (userClicked === streams.home[index].user) {
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        var $profilephoto = $('<img src="./assets/img/' + tweet.user + '.png" class="profile-photo"></img>');
            $profilephoto.appendTo($tweet);
        var $username = $('<span class="username"></span>');
            $username.text('@' + tweet.user);
            $username.appendTo($tweet);
        var $message = $('<span class="message"></span>');
            $message.text(': ' + tweet.message + " ");
            $message.appendTo($tweet);
        var $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
            $timestamp.appendTo($tweet);
        var $comment = $('<i class="comment fas fa-comment-dots"></i>');
            $comment.appendTo($tweet);
            $comment.hover(
              function() {
                $(this).addClass("hover");
              }, function() {
                $(this).removeClass("hover");
              }
            );
        var $retweet = $('<i class="retweet fas fa-retweet"></i>');
            $retweet.appendTo($tweet);
            $retweet.hover(
              function() {
                $(this).addClass("hover");
              }, function() {
                $(this).removeClass("hover");
              }
            );
        var $like = $('<i class="like fas fa-heart"></i>');
            $like.appendTo($tweet);
            $like.hover(
              function() {
                $(this).addClass("hover");
              }, function() {
                $(this).removeClass("hover");
              }
            );
        var $share = $('<i class="share fas fa-share"></i>');
            $share.appendTo($tweet);
            $share.hover(
              function() {
                $(this).addClass("hover");
              }, function() {
                $(this).removeClass("hover");
              }
            );
        $tweet.appendTo($feed);
        index -= 1;
      }
      index-= 1;
    }
  }

  $($button).click(updateFeedButtonClick);

  var renderFeed = function() {
    $button.text('Update Feed');
    $feed.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilephoto = $('<img src="./assets/img/' + tweet.user + '.png" class="profile-photo"></img>');
          $profilephoto.appendTo($tweet);
      var $username = $('<span class="username"></span>');
          $username.text('@' + tweet.user);
          $username.appendTo($tweet);
          $($username).click(userFeed);
      var $message = $('<span class="message"></span>');
          $message.text(': ' + tweet.message + " ");
          $message.appendTo($tweet);
      var $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
          $timestamp.appendTo($tweet);
      var $comment = $('<i class="comment fas fa-comment-dots"></i>');
          $comment.appendTo($tweet);
          $comment.hover(
            function() {
              $(this).addClass("hover");
            }, function() {
              $(this).removeClass("hover");
            }
          );
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
          $retweet.appendTo($tweet);
          $retweet.hover(
            function() {
              $(this).addClass("hover");
            }, function() {
              $(this).removeClass("hover");
            }
          );
      var $like = $('<i class="like fas fa-heart"></i>');
          $like.appendTo($tweet);
          $like.hover(
            function() {
              $(this).addClass("hover");
            }, function() {
              $(this).removeClass("hover");
            }
          );
      var $share = $('<i class="share fas fa-share"></i>');
          $share.appendTo($tweet);
          $share.hover(
            function() {
              $(this).addClass("hover");
            }, function() {
              $(this).removeClass("hover");
            }
          );
      $tweet.appendTo($feed);
      index -= 1;
    }
  }
  renderFeed();
  window.isItBeautifulYet = true;
});
