$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $top = $('<div id ="top"></div>')
  var $feed = $('<div id="feed"></div>');
  var $title = $('<h1>Twiddler</h1>');



  //append elements
  $top.appendTo($app);
  $feed.appendTo($app);
  $title.appendTo($top);

  //Clickable title

  $title.on('click', function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  //Update Feed button

  var $update = $('<button id="update-feed">Update Feed</button>');
  $update.appendTo($top);

  //timeago

  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });

  //Change Update Feed button to Back button

  function findUser(user) {
    return function(event) {
      $clear();
      $renderFeed(user);
      $update.text('Back');
    };
  }
  //clear feed function

  var $clear = function(){
    for(var x = 0; x < streams.home.length; x++){
      var tweet = streams.home[x];
      var message = '@' + tweet.user + ': ' + tweet.message;
      $('div').remove('.tweet');
    }
  }

  //render feed function

var $renderFeed = function(user){
  if (user === undefined) {
    var stream = streams.home;
  } else {
    var stream = streams.users[user]
  }
  var index = stream.length - 1;
  while(index >= 0){
    var tweet = stream[index];
    var $tweet = $('<div class="tweet"></div>');
    var timeAgo = jQuery.timeago(new Date(tweet.created_at));
    $tweet.html("<p class='message'>" + tweet.message + "</p><div class='timestamp'>" + timeAgo + "</div>");
    var $profilePhoto = $("<img class='profile-photo'>");
    $profilePhoto.attr("src", tweet.profilePhotoURL);
    $profilePhoto.appendTo($tweet);
    $tweet.appendTo($feed);


    //clickable username

    var $usernameClick = $('<div class="username">' + "@" + tweet.user + '</div>');
    $usernameClick.appendTo($tweet);
    $usernameClick.on('click', findUser(tweet.user))

    var $comment = $('<i class="icon comment fas fa-comments"></i>');
    var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
    var $like = $('<i class="icon like far fa-thumbs-up"></i>');
    var $share = $('<i class="icon share fas fa-share"></i>');

    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    index -= 1;
  };
};
  $renderFeed();

  //Update Feed helper

  $update.on('click', function(event) {
    $update.text('Update Feed');
    $clear();
    $renderFeed();
  });
  window.isItBeautifulYet = true
});