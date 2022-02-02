$(document).ready(function(){

  // Blanks out html body/div section
  var $app = $('#app');
  $app.html('');
  // Invoke timeago in preparation for timestamp display
  jQuery("time.timeago").timeago();
  // Home page title
  var $title = $('<h1>Twiddler v2.0</h1>');
  var $subtitle = $('<h2>Where Twiddlers be Twaddlin\'</h2>');
  $title.appendTo($app); // $('#app').append($title) does the same
  $subtitle.appendTo($app);

  //  Create "Update Feed" button
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($app);

  // Create "feed" area (div)
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  // Create helper function, renderTweet
  function composeTweet (tweet) { // returns UI tweet
    var $tweet = $('<div class="tweet"></div>');

    var $leftSection = $('<div class="left-section"></div>');
    $leftSection.appendTo($tweet);

    var leftTop = $('<div class="left-top"></div>');
    leftTop.appendTo($leftSection);

    var $user = $(`<div class="username ${tweet.user}"></div>`);
    $user.text('@' + tweet.user);
    $user.appendTo(leftTop);
    var $timestamp = $('<time class="timestamp timeago"></time>');
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $timestamp.appendTo(leftTop);

    var $msg = $('<div class="message"></div>');
    $msg.text(tweet.message);
    $msg.appendTo($leftSection);

    var $icons = $('<div class="icons"></div>');
    $icons.appendTo($leftSection);
    var $iconComment = $('<i class="comment far fa-comment"></i>');
    var $iconRetweet = $('<i class="retweet fas fa-retweet"></i>');
    var $iconLike = $('<i class="like far fa-thumbs-up"></i>');
    var $iconShare = $('<i class="share far fa-share-square"></i>');
    $iconComment.appendTo($icons);
    $iconRetweet.appendTo($icons);
    $iconLike.appendTo($icons);
    $iconShare.appendTo($icons);

    var $rightSection = $('<div class="right-section"></div>');
    $rightSection.appendTo($tweet);
    var $avatar = $('<img class="profile-photo"></img>');
    $avatar.attr('src', tweet.profilePhotoURL);
    $avatar.appendTo($rightSection);

    return $tweet;
  };

  // Create helper function, renderFeed
  function renderFeed(username) { // populates feed with rendered tweets
    $('.tweet').remove()
    // establish home or user twitter feed:
    var tweetArray;
    tweetArray = streams.users[username] || streams.home;
    var index = tweetArray.length - 1;
    while(index >= 0){
      var tweet = tweetArray[index];
      var $initTweet = composeTweet(tweet);
      $initTweet.appendTo($feed);
      index -= 1;
    };
    userTweets();
  };

  // start
  renderFeed(); // populates home page tweets

  // refresh home page tweets
  $('#update-feed').click( function ( event ) {
    renderFeed();
  });

  // Link to user's tweets when clicking handle (and go back to home page option)
  function userTweets() {
    $('.username').click( function(event) {
      var user = event.target.innerText.substr(1);
      renderFeed(user);
      // go back to home page button update
      $updateFeed.text('Back to Home');
      $updateFeed.click( function(event) {
        $updateFeed.text('Update Feed');
        renderFeed();
      });
    });
  };

  userTweets();

  window.isItBeautifulYet = true;
});