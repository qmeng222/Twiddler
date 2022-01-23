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

    for (var x = 0; x < iconClasses.length; x++){
      var $icon = $(`<img src='assets/icons/placeholder.png' class=${iconClasses[x]}></img>`);
      $icon.appendTo($icons);
    }
    $icons.appendTo($tweet);

    // $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($feed);

    $timestamp.text(tweet.created_at);
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
    console.log(streams.home.length);
    console.log($feed.children().length);

    index = streams.home.length - 1;
    while(index >= $feed.children().length) {
      tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $avi = $('<img class="profile-photo"></img>');
      var $timestamp = $('<div class="timestamp"></div>');

      var $icons = $('<div></div>');
      var iconClasses = ['comment', 'retweet', 'like', 'share'];

      for (var x = 0; x < iconClasses.length; x++){
        var $icon = $(`<img src='assets/icons/placeholder.png' class=${iconClasses[x]}></img>`);
        $icon.appendTo($icons);
      }
      $icons.appendTo($tweet);

      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.prependTo($feed);

      $timestamp.text(tweet.created_at);
      $timestamp.appendTo($tweet);

      $avi.attr('src', tweet.profilePhotoURL);
      $avi.appendTo($tweet);

      $username.text('@' + tweet.user);
      $username.appendTo($tweet);

      $message.text(tweet.message);
      $message.appendTo($tweet);
      index -= 1;
    }
  });



});