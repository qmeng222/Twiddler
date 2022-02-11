$(document).ready(function(){


  window.isItBeautifulYet = true;

  // $("time.timeago").timeago();
  jQuery.timeago(tweet.created_at)

  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);

  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $feed = $('<div id="feed"></div>');

  var $updateFeed = $('<button id="update-feed">Update Feed</button>');

  $updateFeed.on("click", function(event) {
    $feed.html('');
    renderFeed();
  });

  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  renderFeed();

  function renderFeed(clickedUser) {

    $feed.html('');

    var currentStream;

    if (clickedUser) {
      console.log('click')
      currentStream = streams.users[clickedUser];

    } else {
      console.log('fffficuuccc')
      currentStream = streams.home;
      $updateFeed.text('Update Feed');

    }


    console.log(currentStream)


    var index = currentStream.length - 1;



    while(index >= 0) {

      var tweet = currentStream[index];

      var $tweet = $('<div class="tweet"></div>');

      var $profilePhoto = $('<img class="profile-photo"></img>');
      $profilePhoto.attr("src", tweet.profilePhotoURL);
      var $username = $('<div class="username">@' + tweet.user + '</div>');
      var $message = $('<div class="message">' + tweet.message + '</div>');
      var $timestamp = $('<div class="timestamp">' + $.timeago(tweet.created_at) + '</div>');
      var $icon = $('<i class="fas fa-align-justify"></i>');

      var $comment = $('<i class="comment fal fa-clipboard"></i>');
      var $retweet = $('<i class="retweet fas fa-at"></i>')
      var $like = $('<i class="like fas fa-ambulance"></i>');
      var $share = $('<i class="share fas fa-assistive-listening-systems"></i>');

      var $timeStamp = $("<div class='timestamp'>" + $.timeago(tweet.created_at) + "</div>");

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $icon.appendTo($tweet);
      $comment.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $retweet.appendTo($tweet);

      $tweet.appendTo($feed);

      $username.on("click", function(event) {

        var clickText = $(this).text();

        $updateFeed.text('Back');

        renderFeed(clickText.slice(1));

      });

      $('i').hover(function() {
        $(this).css('background-color', 'red');
      }, function() {
          $(this).removeAttr('style');
      });



      index -= 1;

    }
  };
});
