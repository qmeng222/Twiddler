$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var $feed = $('#feed');

  var selectIcon = function(event) {
    var $icon = $(this);
    if ($icon.hasClass('far')) {
      $icon.removeClass('far');
      $icon.addClass('fas');
    }
  };

  var deselectIcon = function(event) {
    var $icon = $(this);
    if ($icon.hasClass('fas') && !($icon.hasClass('retweet'))) {
      $icon.removeClass('fas');
      $icon.addClass('far');
    }
  };

  var writeTweets = function() {
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');

      var $pfp = $('<img class="profile-photo" src="'+tweet.profilePhotoURL+'">');

      var $username = $('<h3 class="username"></h3');
      $username.text('@' + tweet.user);

      var $message = $('<p class="message"></p>');
      $message.text(tweet.message);

      var $infobar = $('<div class="infobar"></div>')

      var $timestamp = $('<time class="timestamp timeago"></time>');
      $timestamp.attr("datetime", tweet.created_at);
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var $comment = $('<i class="icon comment far fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like far fa-heart"></i>');
      var $share = $('<i class="icon share far fa-share-square"></i>');
      $infobar.append($timestamp, $comment, $retweet, $like, $share);

      $tweet.append($pfp, $username, $message, $infobar);
      $tweet.appendTo($feed);

      $('i.icon').hover(selectIcon, deselectIcon);

      index -= 1;
    }
  };
  writeTweets();

    var btnHandler = function(event) {
      $feed.empty();
      writeTweets();
    };

    $(':button,#update-feed').on('click', btnHandler);
});