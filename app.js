
$(document).ready(function(){
  var $feed = $('#feed');
  var $tweet = $('<div class="tweet"></div>');
  var $profile = $('<img alt="profile-name" class="profile-photo">');
  var $icon = $('<div class="icon-group"></div>');

  function iconPhoto(){
    $icon = $('<div class="icon-group"></div>');
    var $comment = $('<i class="icon comment fas fa-comments"></i>');
    var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
    var $like = $('<i class="icon like fas fa-heart"></i>');
    var $share = $('<i class="icon share fas fa-share-square"></i>');
    var arr = [$comment, $retweet, $like, $share];
    for (let x of arr) {
      x.appendTo($icon);
    }
    return $icon
  };
  function getUserName() {
    for (let x of window.users) {
      var $a = $('<div class="friendName"></div>');
      $a.text('@'+x);
      $a.appendTo($('#left-box'));
    }
  };
  getUserName();
  var renderFeed = function(user) {
    $feed.html('');
    var index = streams.home.length-1;

    while (index >= 0) {
      var tweet = streams.home[index];
      if (!user || tweet.user === user) {
        $profile = $('<img alt="profile-name" class="profile-photo">');
        $tweet = $('<div class="tweet"></div>');
        var $userName = $('<div class="username"></div>');
        var $message = $('<span class="message"></span><br>');
        var $timestamp = $('<span class="timestamp"></span>');
        $userName.text('@' + tweet.user);
        $message.text(tweet.message);
        $timestamp.text(jQuery.timeago(tweet.created_at));
        $profile.attr('src',profilePath(tweet.user)).appendTo($tweet);
        $userName.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        iconPhoto().appendTo($tweet);
        $tweet.appendTo($feed);
      }
      index--;
    }
    $('.username').on('click', handleUsernameClick);
    $('.friendName').on('click', handleUsernameClick);
  };

  function handleUsernameClick() {
    var username = $(this).text().slice(1);
    renderFeed(username);
    if ($('button').text() === 'Update Feed') {
      $('button').text('Back');
    }
  };

  renderFeed();

  $("#update-feed").on("click", function() {
    renderFeed();
    if ($(this).text() === 'Back') {
      $(this).text('Update Feed');
    }
  });

  function profilePath(name) {
    return 'assets/img/'+name+'.png';
  };
});
window.isItBeautifulYet=true;
