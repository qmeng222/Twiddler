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


  var userTimeline = function(event) {
    generateFeed(event.data);
  };

  var showUserTimeline = function(user) {
    console.log("latest inside show user timeline", latest)
    $('.timeline').remove();
    // console.log(event.data);
    $updateFeed.text('Back')
    var $timeline = $('<h2 class=timeline>' + user + '\'s Timeline </h2>')
    $timeline.appendTo($app);
      var index = streams.users[user].length - 1;
      while (index >= 0) {
        renderTweet(streams.users[user][index], true);
        index--;
      }
    $("time.timestamp").timeago();
  }
  var twiddlerButton = function(event) {
    var isBack = 'Back' === $updateFeed.text();
    if (!isBack) {
      var index = streams.home.length - 1;
      console.log("this is latest ", latest)
      console.log("This is index ", index)

      while(index > latest){
        var tweet = streams.home[index]
        renderTweet(tweet, false);
        $("time.timestamp").timeago();
        index--
      }
      latest = streams.home.length - 1;
    } else {
      console.log("inside back, latest", latest)
      generateFeed();
      $('.timeline').hide();
    }
  }
  $updateFeed = $('<button id="update-feed" type="button">Update Feed</button>');
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

  $updateFeed.on("click", function(event) {
    twiddlerButton(event);
  });

  var $userFeed = $('<div id="userFeed"></div>')
  var $feed = $('<div id="feed"></div>');
  var timelineTweets = []
  var latest = streams.home.length - 1;

  var generateFeed = function(user) {
    $('#feed').remove();
    $feed = $('<div id="feed"></div>');
    if (!user) {
      $updateFeed.text('Update Feed')
      var index = streams.home.length - 1;
      latest = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index]
        renderTweet(tweet, true)
        index--
      }
    } else {
        showUserTimeline(user);
    }
    $feed.appendTo($app);
  }

  generateFeed();

  $userFeed.appendTo($app)
  $("time.timestamp").timeago();




});


