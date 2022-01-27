$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Title
  var $title = $('<h1 class="title">Twiddler</h1>');
  $title.prependTo($app);

  // HomeFeed
  var $homeFeed = $('<div id="homeFeed"></div>');
  $homeFeed.appendTo($app);

  // TweetFeed
  var $tweetFeed = $('<div id="feed"></div>');
  $tweetFeed.appendTo($app);

  // Helper functions
    var createTweet = function ($tweet, tweet) {
      $tweet.prepend(`<img class="profile-photo" src="${tweet.profilePhotoURL}" />`);
      $tweet.append(`<span class="username ${tweet.user}">@${tweet.user}:</span>`);
      $tweet.append(`<p class="message">${tweet.message}</p>`);
      $tweet.append(`<span class="timestamp">${jQuery.timeago(tweet.created_at)}</span>`);
      $tweet.append(`<i class="far fa-comment-dots comment"></i>
      <i class="fas fa-retweet retweet"></i>
      <i class="far fa-thumbs-up like"></i>
      <i class="fas fa-share-square share"></i>` );
      previous.push(`${tweet.user}, ${tweet.message}`);
      return $tweet
    }

  var showUserTweets = function() {
    _.each(users, function(elements) {
    $(`.${elements}`).on('click', function(event) {
      $(`.tweet:not(.${elements})`).remove();
      $($updateFeedBtn).html('Back');
    });
  });
  }

  // Tweets
  var previous = [];
  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];
    var $tweet = $(`<div class="tweet ${tweet.user}"></div>`);
    createTweet($tweet, tweet);
    $tweet.appendTo($tweetFeed);
    index -= 1;
  }

  // Update TweetFeed BTN
  var $updateFeedBtn = $('<button type="button" id="update-feed">Update Feed</button>');
  $updateFeedBtn.prependTo($homeFeed);
  $updateFeedBtn.on('click', function(event) {
    if ($updateFeedBtn.html() === 'Back') {
      $($updateFeedBtn).html('Update Feed');
      $('.tweet').remove();
      for (var i = 0; i < streams.home.length; i++) {
        var tweet = streams.home[i];
        var $tweet = $(`<div class="tweet ${tweet.user}"></div>`);
        createTweet($tweet, tweet);
        $tweet.prependTo($tweetFeed);
      }
    } else {
      for (var i = 0; i < streams.home.length; i++) {
        var tweet = streams.home[i];
        var $tweet = $(`<div class="tweet ${tweet.user}"></div>`);
        if (previous.indexOf(`${tweet.user}, ${tweet.message}`) === -1) {
          createTweet($tweet, tweet);
          $tweet.prependTo($tweetFeed);
        }
      }
    }
    showUserTweets();
  });

showUserTweets();
// window.isItBeautifulYet = true;
});


