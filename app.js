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
    $tweet.append(`<span class="username">@${tweet.user}:</span>`);
    $tweet.append(`<span class="timestamp">${jQuery.timeago(tweet.created_at)}</span>`);
    $tweet.append(`<p class="message">${tweet.message}</p>`);
    $tweet.append(`<i class="far fa-comment-dots comment"></i>
                   <i class="fas fa-retweet retweet"></i>
                   <i class="far fa-thumbs-up like"></i>
                   <i class="fas fa-share-square share"></i>` );
    pastTweets.push(`${tweet.user}, ${tweet.message}`);
    return $tweet
  }

  // Tweets
  var pastTweets = [];
  var index = streams.home.length - 1;
  while(index >= 0) {
    var $tweet = $(`<div class="tweet"></div>`);
    var tweet = streams.home[index];
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
      _.each(streams.home, function(tweet) {
        var $tweet = $(`<div class="tweet"></div>`);
        createTweet($tweet, tweet);
        $tweet.prependTo($tweetFeed);
      });
    } else {
        _.each(streams.home, function(tweet) {
          var $tweet = $(`<div class="tweet"></div>`);
          if (pastTweets.indexOf(`${tweet.user}, ${tweet.message}`) === -1) {
            createTweet($tweet, tweet);
            $tweet.prependTo($tweetFeed);
          }
        });
      }
  });

  // Username Tweet Selector
  $('div').on('click', 'span.username', function(event) {
    var target = this;
    $($updateFeedBtn).html('Back');
    $('.tweet').filter(function(userTweet) {
      if (!$(this).html().includes($(target).text())) {
        $(this).remove();
      }
    });
  });
  window.isItBeautifulYet = true;
});


