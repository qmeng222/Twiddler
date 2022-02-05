$(document).ready(function(){

  var $app = $('#app');
  $app.html('');
  var latest = 0;

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $homeButton = $('<button id="home" type="button">Home</button>');
  $homeButton.hide();
  $homeButton.appendTo($app);
  $homeButton.on('click', function(event) {
    generateFeed();
    $('.userFeed').remove();
    $('.timeline').hide();
    $('div').show();
    $('.new').show();
    $($updateFeed).show();
    $homeButton.hide();
  });

  $homeButton.insertAfter($updateFeed).hide();

  var userTimeline = function(event) {
    generateFeed(event.data);
  };

  var showUserTimeline = function(user) {
    $('.timeline').remove();
    // console.log(event.data);
    var $timeline = $('<h2 class=timeline>' + user + '\'s Timeline </h2>')
    $timeline.appendTo($app);
      var index = streams.users[user].length - 1;
      while(index >= 0) {
        renderUserTweet(user, index);
        index--;
      }
        $userFeed.appendTo($app);
        $("time.timestamp").timeago();
    $($feed).hide();
    $($updateFeed).hide();
    $($homeButton).show();
    $($userFeed).show();
  }
  var $updateFeed = $('<button id="update-feed" type="button">Update Feed</button>');
  $updateFeed.appendTo($app);

  var renderTweet = function(tweet,isAppending) {
    var $tweet = $('<div class="tweet" ></div>');
    var $photo = $('<img class="profile-photo"></img>');
    var $username = $('<div class="username"></div>');
    $username.text('@' + tweet.user);
    var $message = $('<div class="message"></div>');
    $message.text(tweet.message);
    var $timestamp = $(`<time class="timestamp"></time>`);
    $timestamp.attr("datetime", tweet.created_at.toISOString())
    var $icons = $('<div class="icon"></div>');
    var $comment = $('<i class="comment far fa-comments"></i>');
    var $retweet = $('<i class="retweet fas fa-retweet"></i>');
    var $like = $('<i class="like far fa-heart"></i>');
    var $share = $('<i class="share far fa-share-square"></i>');
    $username.on("click", null, tweet.user, userTimeline);
    $photo.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);
    $icons.appendTo($tweet);
    if(isAppending) {
      $tweet.appendTo($feed);
    } else {
      $tweet.prependTo($feed);
    }
  }

  var renderUserTweet = function(tweetUser, index) {
    var $usertweet = $('<div class="tweet" ></div>');
          var $username = $('<div class="username"></div>');
          $username.text('@' + tweetUser);
          var $photo = $('<img class="profile-photo"></img>');
          var $message = $('<div class="message"></div>');
          $message.text(streams.users[tweetUser][index].message);
          var $timestamp = $(`<time class="timestamp"></time>`);
          $timestamp.attr("datetime", streams.users[tweetUser][index].created_at.toISOString());
          var $icons = $('<div class="icon"></div>');
          var $comment = $('<i class="comment far fa-comments"></i>');
          var $retweet = $('<i class="retweet fas fa-retweet"></i>');
          var $like = $('<i class="like far fa-heart"></i>');
          var $share = $('<i class="share far fa-share-square"></i>');

          $username.appendTo($usertweet);
          $message.appendTo($usertweet);
          $photo.appendTo($usertweet);
          $timestamp.appendTo($usertweet);
          $comment.appendTo($icons);
          $retweet.appendTo($icons);
          $like.appendTo($icons);
          $share.appendTo($icons);
          $icons.appendTo($usertweet);
          $usertweet.appendTo($userFeed);
  }

  $updateFeed.on("click", function(event) {
    var index = streams.home.length - 1;
    while(index >= latest){
      var newTweet = streams.home[latest];
      renderTweet(newTweet, false);
      latest++;
      $("time.timestamp").timeago();
    }
  });

  var $userFeed = $('<div id="userFeed"></div>')
  var $feed = $('<div id="feed"></div>');
  var latest = 0;
  var index = streams.home.length - 1;

  var generateFeed = function(user) {
    if (!user) {
      while(index >= 0){
        var tweet = streams.home[index];
        renderTweet(tweet, true);
        index--;
        latest++;
      }
    } else {
      showUserTimeline(user);
    }
  }

  generateFeed();

  $userFeed.appendTo($app)
  $feed.appendTo($app);
  $("time.timestamp").timeago();




});


