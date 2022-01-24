$(document).ready(function(){
  // select the div with the ID #app
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $header = $('<header class="header"></header>');
  var $title = $('<h1>Twiddler</h1>');
  var $section = $('<section  class="section"></section>')
  var $updateFeedBtn = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id ="feed"></div>');


  function renderFeed(userName) {
    var tweets = [];
    // get user specific or all tweets
    var localStreams = window.users.indexOf(userName) === -1 ? streams.home : streams.users[userName];

    // generate tweets
    var len = localStreams.length;
    var index = 0;
    while(index < len){
      var tweet = localStreams[index];
      // ignore duplicate user and message
      if (!tweets.some(t => t.user === tweet.user && t.message === tweet.message )) {
        tweets.push(tweet);
      }
      index += 1;
    }

    // display tweets
    $feed.html('');
    index = tweets.length - 1;
    while(index >= 0) {
      var tweet = tweets[index];
      var $tweet = $('<div class="tweet"></div>');
      //$tweet.text('@' + tweet.user + ': ' + tweet.message);
      var $tweetHead = $('<div class="tweetHead"></div>');
      var $tweetHeadTop = $('<div class="tweetHeadTom"></div>');
      var $tweetHeadBottom = $('<div class="tweetHeadBottom"></div>');
      var $tweetMain = $('<div class="tweetMain"></div>');
      var $tweetSub = $('<div class="tweetSub"></div>');
      var $photo = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '" alt="Profile photo">');
      var $user = $('<span class="username">@' + tweet.user + '</span>');
      var $message = $('<p class="message">' + tweet.message + '</p>');
      var $timeStamp = $('<div class="timestamp">' + $.timeago(tweet.created_at) + '</div>');
      var $iconBatch = $('<div class="icon-batch"></div>')
      var $comment = $('<i class="icon comment fas fa-comments 2x"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like fas fa-thumbs-up"></i>') ;
      var $share = $('<i class="icon share far fa-share-square"></i>');

      $user.on('click', handleUsernameClick);

      // Append new HTML element to the Dom
      $iconBatch.append($comment, $retweet, $like, $share);
      $tweet.append($tweetHead, $tweetMain);
      $tweetHeadTop.append($user);
      $tweetHeadBottom.append($photo)
      $tweetHead.append( $tweetHeadTop, $tweetHeadBottom);
      $tweetMain.append( $message, $tweetSub);
      $tweetSub.append($iconBatch, $timeStamp);

      // add tweet to the feed
      $tweet.appendTo($feed);

      index -= 1;
    }
  }

  var handleUsernameClick = function(event) {
    // Update the update feed button text
    if ($updateFeedBtn.text() === 'Update Feed') {
      $updateFeedBtn.text('Back');
    }

    // get user name
    var userName = $(event.target).text().substring(1);
    renderFeed(userName);
  }

  // set a click event listener on the button
  $updateFeedBtn.on('click', function() {
    if ($updateFeedBtn.text() === 'Back') {
      $updateFeedBtn.text('Update Feed');
    }
    renderFeed();
  });

  // Append new HTML element to the Dom
  $header.append($title, $updateFeedBtn)
  $header.appendTo($app);
  $section.append( $feed)
  $section.appendTo($app);

  // Populate on page load
  renderFeed();
});