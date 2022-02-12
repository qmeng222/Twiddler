$(document).ready(function(){
  // Select already existing elements
  var $updateFeedBtn = $('#update-feed');
  var $feedTitle = $('#feed-title');

  // Create new HTML elements

  // Create event handler functions
  var handleUsernameClick = function(){
    var username = $(this).text();
    username = username.replace('@','');

    if($updateFeedBtn.text() !== 'Back'){
      $updateFeedBtn.text('Back');
    }

    $feedTitle.text('Feed for user @' + username);
    renderFeed(username);
  };

  var updateFeedBtnClick = function(){
    if($updateFeedBtn.text() !== 'Update Feed'){
      $updateFeedBtn.text('Update Feed');
    }

    $feedTitle.text('Home Feed');
    renderFeed();
  }

  // Set event listeners (providing appropriate handlers as input)
  $updateFeedBtn.click(updateFeedBtnClick);
  $(this).on("click",'.username', handleUsernameClick);

  // Append new HTML elements to the DOM
  renderFeed();
});

var renderFeed = function(user){
  var $app = $('#feed');
  $app.html('');

  var index;
  var tweetStream = [];

  if(user){
    index = streams.users[user].length - 1;
    tweetStream = streams.users[user];

  }else{
    index = streams.home.length - 1;
    tweetStream = streams.home;
  }

  while(index >= 0){
    var tweet = tweetStream[index];
    var $tweet = $('<div class="tweet tweet-grid-wrapper"></div>');

    var $profilePhoto = $('<img class="profile-photo"' + ' src="' + tweet.profilePhotoURL + '">');
    var $username = $('<div class="username">@' + tweet.user + '</div>');
    var $message = $('<p class="message">' + tweet.message + '</p>');
    var $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
    var $commentIcon = $('<span class="comment icon"><i class="comment icon fa-solid fa-comment"></i></span>');
    var $retweetIcon = $('<span class="retweet icon"><i class="retweet icon fa-solid fa-retweet"></i></span>');
    var $likeIcon = $('<span class="like icon"><i class="like icon fa-solid fa-thumbs-up"></i></span>');
    var $shareIcon = $('<span class="share icon"><i class="share icon fa-solid fa-share"></i></span>');

    var $tweetGrid1 = $('<div class="tweet-grid-1">');
    var $tweetGrid2 = $('<div class="tweet-grid-2">');
    var $tweetGrid3= $('<div class="tweet-grid-3">');
    var $tweetGrid4 = $('<div class="tweet-grid-4">');

    $profilePhoto.appendTo($tweetGrid1);
    $tweetGrid1.appendTo($tweet);

    $message.appendTo($tweetGrid2);
    $tweetGrid2.appendTo($tweet);

    $username.appendTo($tweetGrid3);
    $tweetGrid3.appendTo($tweet);

    $timestamp.appendTo($tweetGrid4);
    $commentIcon.appendTo($tweetGrid4);
    $retweetIcon.appendTo($tweetGrid4);
    $likeIcon.appendTo($tweetGrid4);
    $shareIcon.appendTo($tweetGrid4);
    $tweetGrid4.appendTo($tweet);

    $tweet.appendTo($app);
    index -= 1;
  }
};

window.isItBeautifulYet = true;
