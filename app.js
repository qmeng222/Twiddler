$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  // Header
  var $header = $('<header></header>');
  $header.appendTo($app);
  var $logo = $('<div id="logo">Logo will go here</div>');
  $logo.appendTo($header);

  // Main Container
  var $mainContainer = $('<main></main>');
  $mainContainer.appendTo($app);
  // Sidebar
  var $sidebar = $('<div id="sidebar"></div>');
  $sidebar.appendTo($mainContainer);
  $sidebar.append('<p>Some sidebar content will go here.</p>')
  // Tweet Container
  var $tweetContainer = $('<div id="tweet-container"></div>');
  $tweetContainer.appendTo($mainContainer);
  // New Tweet
  var $newTweet = $('<div id="new-tweet"></div>');
  $newTweet.appendTo($tweetContainer);
  // Update Feed Button
  var $updateFeedButton = $('<button id="update-feed"></button>');
  $updateFeedButton.text('Update Feed')
  $updateFeedButton.appendTo($tweetContainer);
  $updateFeedButton.on('click', function(e) {
    $("#feed").empty();
    generateRandomTweet();
    displayHomeFeed();
  });
  // Feed
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($tweetContainer);

  var newTweetComponent = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    var $tweetHeader = $('<div class="tweet-header"></div>');
    $tweetHeader.appendTo($tweet);
    $tweetHeader.append(
      '<img class="profile-photo" src="'
      + tweet.profilePhotoURL
      + '" />');
    $tweetUser = $('<div class="username">@' + tweet.user + '</div>');
    $tweetUser.on('click', function(e) {
      $("#feed").empty();
      displayUserFeed(tweet.user);
    });
    $tweetHeader.append($tweetUser);
    // $tweetHeader.append('<div class="username">@' + tweet.user + '</div>');
    var $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $timestamp.appendTo($tweetHeader);
    var $tweetBody = $('<div class="tweet-body"></div>');
    $tweetBody.appendTo($tweet);
    $tweetBody.append('<div class="message">' + tweet.message + '</div>');
    var $tweetFooter = $('<div class="tweet-footer"></div>');
    $tweetFooter.appendTo($tweet);
    $tweetFooter.append('<div class="icon"><i class="comment fas fa-comment"></i></div>');
    $tweetFooter.append('<div class="icon"><i class="retweet fas fa-retweet"></i></div>');
    $tweetFooter.append('<div class="icon"><i class="like fas fa-heart"></i></div>');
    $tweetFooter.append('<div class="icon"><i class="share fas fa-share"></i></div>');

    return $tweet;
  }

  var displayHomeFeed = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      // var $tweet = $('<div class="tweet"></div>');
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      var $tweet = newTweetComponent(tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
    $updateFeedButton.text('Update Feed');
  };

  var displayUserFeed = function(username) {
    var index = streams.users[username].length - 1;
    while (index >= 0) {
      var tweet = streams.users[username][index];
      var $tweet = newTweetComponent(tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
    $updateFeedButton.text('Back');
  };

  displayHomeFeed();

  window.isItBeautifulYet = true;

});