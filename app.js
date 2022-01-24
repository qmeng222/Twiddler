$(document).ready(function(){
  var $feed = $('#feed');
  $feed.html('');

  var $updateFeed = $('#update-feed');

  var index;


  var renderFeed = function(username) {
    $feed.empty();
    if (username !== undefined) {
      $updateFeed.text('Back')
      $updateFeed.click(function() {
        $updateFeed.text('Update Feed');
        renderFeed();
        $updateFeed.click(appendUpdateFeedFn);
      })
    }
    index = username === undefined ? streams.home.length - 1 : streams.users[username].length - 1;


    while(index >= 0){
      var tweet = username === undefined ? streams.home[index] : streams.users[username][index];
      // console.log(tweet);
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $avi = $('<img class="profile-photo"></img>');
      var $timestamp = $('<div class="timestamp"></div>');

      var $icons = $('<div class="icons"></div>');
      var iconClasses = ['comment', 'retweet', 'like', 'share'];
      var faNames = ['comment', 'retweet', 'heart', 'share']

      for (var x = 0; x < iconClasses.length; x++){
        var $icon = $(`<i class="fas fa-${faNames[x]} ${iconClasses[x]} icon"></i>`);
        $icon.appendTo($icons);
      }

      $tweet.appendTo($feed);

      $timestamp.text(jQuery.timeago(tweet.created_at));

      $avi.attr('src', tweet.profilePhotoURL);

      $username.text('@' + tweet.user);
      $username.click(function() {
        renderFeed(this.textContent.slice(1));
      })

      $message.text(tweet.message);

      $avi.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $icons.appendTo($tweet);
      index -= 1;
    }
  }

  var appendUpdateFeedFn = function () {
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
        $username.click(function() {
          renderFeed(this.textContent.slice(1));
        })
        $username.appendTo($tweet);

        $message.text(tweet.message);
        $message.appendTo($tweet);
        index += 1;
      }
    });
  }



  appendUpdateFeedFn();
  renderFeed();
});

window.isItBeautifulYet = true