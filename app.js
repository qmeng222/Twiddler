$(document).ready(function(){
  var $feed = $('#feed');
  $feed.html('');


  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<div class="message"></div>');
    var $username = $('<div class="username"></div>');
    var $avi = $('<img class="profile-photo"></img>');
    var $timestamp = $('<div class="timestamp"></div>');

    var $icons = $('<div></div>');
    var iconClasses = ['comment', 'retweet', 'like', 'share'];
    var faNames = ['comment', 'retweet', 'heart', 'share']

    for (var x = 0; x < iconClasses.length; x++){
      var $icon = $(`<i class="fas fa-${faNames[x]} ${iconClasses[x]}"></i>`);
      $icon.appendTo($icons);
    }
    $icons.appendTo($tweet);

    $tweet.appendTo($feed);

    $timestamp.text(jQuery.timeago(tweet.created_at));
    $timestamp.appendTo($tweet);

    $avi.attr('src', tweet.profilePhotoURL);
    $avi.appendTo($tweet);

    $username.text('@' + tweet.user);
    $username.appendTo($tweet);

    $message.text(tweet.message);
    $message.appendTo($tweet);
    index -= 1;
  }

  var $updateFeed = $('#update-feed');

  $updateFeed.click(function() {

    index = $feed.children().length;

    while(index <= streams.home.length - 1) {
      tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $avi = $('<img class="profile-photo"></img>');
      var $timestamp = $('<div class="timestamp"></div>');

      var $icons = $('<div></div>');
      var iconClasses = ['comment', 'retweet', 'like', 'share'];
      var faNames = ['comment', 'retweet', 'heart', 'share']

      for (var x = 0; x < iconClasses.length; x++){
        var $icon = $(`<i class="fas fa-${faNames[x]} ${iconClasses[x]}"></i>`);
        $icon.appendTo($icons);
      }
      $icons.appendTo($tweet);

      $tweet.prependTo($feed);

      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      $avi.attr('src', tweet.profilePhotoURL);
      $avi.appendTo($tweet);

      $username.text('@' + tweet.user);
      $username.appendTo($tweet);

      $message.text(tweet.message);
      $message.appendTo($tweet);
      index += 1;
    }
  });



});