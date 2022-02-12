$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedBtn = $('<btn id=\"update-feed\">Update Feed</btn>');
  var $feed = $('<div id=feed></div>');

    var icoHoverOn = function () {
      $(this).addClass('hovered');
    }

    var icoHoverOff = function () {
      $(this).removeClass('hovered');
    }

  var updateFeed = function(user = null) {
    if (user !== null) {
      $('#update-feed').text('Back');
    } else {
      $('#update-feed').text('Update Feed');
    }

    $('.tweet').remove();

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      if (user === null || user === ('@' + tweet.user)) {
        var $profilePic = $('<img class="profile-photo"></img>');
        var $username = $('<div class="username"></div>');
        var $timestamp = $('<div class="timestamp"></div');
        var $message = $('<p class="message"></div>');
        var $comment = $('<i></i>');
        var $retweet = $('<i></i>');
        var $like = $('<i></i>');
        var $share = $('<i></i>');

        var tweetArr = [$profilePic, $username, $timestamp, $message,
                        $comment, $retweet, $like, $share];

        $profilePic.attr('src', tweet.profilePhotoURL);


        var tempUser = tweet.user;
        $username.text('@' + tweet.user);
        $username.click(function () {
          updateFeed(this.innerText);
        });
        $username.hover(icoHoverOn, icoHoverOff);

        $message.text(tweet.message);
        $timestamp.text(jQuery.timeago(tweet.created_at));
        $comment.attr('class', 'icon comment fa-solid fa-message');
        $retweet.attr('class', 'icon retweet fa-solid fa-retweet');
        $like.attr('class', 'icon like fa-solid fa-thumbs-up');
        $share.attr('class', 'icon share fa-solid fa-share');

        $('.icon').hover(icoHoverOn, icoHoverOff);

        for (var i = 0; i < tweetArr.length; i++) {
          tweetArr[i].appendTo($tweet);
        }

        $tweet.appendTo('#feed');
      }
      index -= 1;
    }
  }

  $updateFeedBtn.click(function () { updateFeed(); });
  $updateFeedBtn.hover(icoHoverOn, icoHoverOff);

  $title.appendTo($app);
  $updateFeedBtn.appendTo($app);
  $feed.appendTo($app);

  updateFeed();

  window.isItBeautifulYet = true;
});