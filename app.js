$(document).ready(function(){
  // Select already existing elements
  var $updateFeedBtn = $('#update-feed');
  //var $icon = $('span.icon');

  // Create new HTML elements

  // Create event handler functions
  var handleUsernameClick = function(){
    var username = $(this).text();
    username = username.replace('@','');

    if($updateFeedBtn.text() !== 'Back'){
      $updateFeedBtn.text('Back');
    }

    renderFeed(username);
  };

  var updateFeedBtnClick = function(){
    if($updateFeedBtn.text() !== 'Update Feed'){
      $updateFeedBtn.text('Update Feed');
    }

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
    var $tweet = $('<div class="tweet"></div>');

    var $profilePhoto = $('<img class="profile-photo"' + ' src="' + tweet.profilePhotoURL + '">');
    var $username = $('<div class="username">@' + tweet.user + '</div>');
    var $message = $('<p class="message">' + tweet.message + '</p>');
    var $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
    var $commentIcon = $('<span class="comment icon"><i class="fa-solid fa-comment"></i></span>');
    var $retweetIcon = $('<span class="retweet icon"><i class="retweet icon fa-solid fa-retweet"></i></span>');
    var $likeIcon = $('<span class="like icon"><i class="like icon fa-solid fa-thumbs-up"></i></span>');
    var $shareIcon = $('<span class="share icon"><i class="share icon fa-solid fa-share"></i></span>');

    //$tweet.text('@' + tweet.user + ': ' + tweet.message);

    $profilePhoto.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $commentIcon.appendTo($tweet);
    $retweetIcon.appendTo($tweet);
    $likeIcon.appendTo($tweet);
    $shareIcon.appendTo($tweet);

    $tweet.appendTo($app);
    index -= 1;
  }
};

/*
$('.icon').on('click', function () {
  alert('an icon!');
});
*/
/*
$(document).on("click", ".username", function() {
  alert('username func called');
});
*/
