$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $header = $('<div class="header"></div>');
  $header.appendTo($app);

  var $title = $('<h1 id="title">Twiddler</h1>')
  $title.appendTo($header);
  $title.on('click', function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);


  var index = streams.home.length - 1;
  var latest = 0;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<p class="message"></p>');
    $message.text(tweet.message).appendTo($tweet);

    var $user = $('<a class="username" data-value="' + tweet.user + '"></a>');
    $user.addClass(".username").text('@' + tweet.user + ': ');
    $user.prependTo($tweet);

    var $profilePhoto = $('<img class="profile-photo">');
    $($profilePhoto).attr("src",tweet.profilePhotoURL);
    $profilePhoto.prependTo($tweet);

    var $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(' ' + jQuery.timeago(tweet.created_at) + ' ');
    $timestamp.appendTo($tweet);

    var $comment = $('<i class="fas fa-comment icon comment"></i>');
    $comment.appendTo($tweet);
    var $like = $('<i class="fas fa-like icon like"></i>');
    $like.appendTo($tweet);
    var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
    $retweet.appendTo($tweet);
    var $share = $('<i class="fas fa-share icon share"></i>');
    $share.appendTo($tweet);

    $tweet.appendTo($feed);
    index -= 1;
    latest += 1;
  }

  var $updateBtn = $('<h3 id="update-feed">Update Feed</h3>');
  $updateBtn.appendTo($header);
  $updateBtn.on("click", function(event) {
    if ($updateBtn.text() === 'Back') {
      $updateBtn.text('Update Feed');
      latest = 0;
      $feed.empty();
    }
    index = streams.home.length-1;
    while(index >= latest) {
      var newTweet = streams.home[latest];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message"></p>');
      $message.text(newTweet.message).appendTo($tweet);

      var $user = $('<a class="username" data-value="' + newTweet.user + '"></a>');
      $user.addClass(".username").text('@' + newTweet.user + ': ');
      $user.prependTo($tweet);

      var $profilePhoto = $('<img class="profile-photo">');
      $($profilePhoto).attr("src",newTweet.profilePhotoURL);
      $profilePhoto.prependTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(' ' + jQuery.timeago(newTweet.created_at) + ' ');
      $timestamp.appendTo($tweet);

      var $comment = $('<i class="fas fa-comment icon comment"></i>');
      $comment.appendTo($tweet);
      var $like = $('<i class="fas fa-like icon like"></i>');
      $like.appendTo($tweet);
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      $retweet.appendTo($tweet);
      var $share = $('<i class="fas fa-share icon share"></i>');
      $share.appendTo($tweet);


      $tweet.prependTo($feed);
      latest++;
    }

  });
  var indexHolder = index;
  $(document).on("click", "a", function() {
    var username = $(this).data("value"); //"this" refers to <a> selector, data(key): get data named "value"
    $feed.empty();
    var $twiddUser = $('<header><h3>' + username +'</h3></header>');
    $twiddUser.appendTo($feed);
    $updateBtn.text('Back');
    var userIndex = streams.users[username].length - 1;
    while (userIndex >= 0) {
      var userTweet = streams.users[username][userIndex];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<p class="message"></p>');
      $message.text(userTweet.message).appendTo($tweet);

      var $user = $('<a class="username" data-value="' + userTweet.user + '"></a>');
      $user.addClass(".username").text('@' + userTweet.user + ': ');
      $user.prependTo($tweet);

      var $profilePhoto = $('<img class="profile-photo">');
      $($profilePhoto).attr("src",userTweet.profilePhotoURL);
      $profilePhoto.prependTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(' ' + jQuery.timeago(userTweet.created_at) + ' ');
      $timestamp.appendTo($tweet);

      var $comment = $('<i class="fas fa-comment icon comment"></i>');
      $comment.appendTo($tweet);
      var $like = $('<i class="fas fa-like icon like"></i>');
      $like.appendTo($tweet);
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      $retweet.appendTo($tweet);
      var $share = $('<i class="fas fa-share icon share"></i>');
      $share.appendTo($tweet);

      $tweet.appendTo($feed);
      userIndex -= 1;

      }
    });


    window.isItBeautifulYet = true;

});
