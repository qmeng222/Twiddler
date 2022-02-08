$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  jQuery("time.timeago").timeago();

  var renderFeed = function(user) {
    var index = streams.home.length - 1;
    $('.tweet').remove();
    while(index >= 0){
      var tweet = streams.home[index];
      if(tweet.user === user || user === undefined) {
        var $tweet = $('<div class="tweet"></div>');

        var $img = $(`<img class="profile-photo" src="assets/img/${tweet.user}.jpeg"></img>`);
        $img.appendTo($tweet);

        var $insideTweet = $('<div class="inside-tweet"></div>');

        $insideTweet.appendTo($tweet);

        var $userNameDate = $('<div class="user-date"></div>');
        $userNameDate.appendTo($insideTweet);

        var $username = $('<div class="username"></div>')
        var handleUsernameClick = (function(user) {
          return function() {
            renderFeed(user);
            $button.text('Back');
          }
        })(tweet.user);
        $username.on("click", handleUsernameClick);
        $username.text('@' + tweet.user);
        $username.appendTo($userNameDate);

        var $timestamp = $(`<div class="timestamp">${jQuery.timeago(tweet.created_at)};  </div>`);
        $timestamp.appendTo($userNameDate);

        var $message = $('<div class="message"></div>')
        $message.text(tweet.message);
        $message.appendTo($insideTweet);

        var $icons = $('<div class="icons"></div>')
        $icons.appendTo($insideTweet);

        var $comment = $('<i class="fas fa-comments comment icon" src="assets/icons/placeholder.png"></i>');
        $comment.appendTo($icons);

        var $retweet = $('<i class="fas fa-retweet retweet icon" src="assets/icons/placeholder.png"></i>');
        $retweet.appendTo($icons);

        var $like = $('<i class="fas fa-thumbs-up like icon" src="assets/icons/placeholder.png"></i>');
        $like.appendTo($icons);

        var $share = $('<i class="fas fa-share share icon" src="assets/icons/placeholder.png"></i>');
        $share.appendTo($icons);

        $tweet.appendTo($feed);
      }
      index -= 1;
    }
  }

  var $title = $('<h1>Twiddler</h1>');
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  };
  $title.on("click", handleTitleClick);
  $title.appendTo($app);

  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var handleButtonClick = function (event) {
    renderFeed();
    $button.text('Update Feed');
  };
  $button.on("click", handleButtonClick);
  $button.appendTo($app);

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  renderFeed();
  window.isItBeautifulYet = true;

});