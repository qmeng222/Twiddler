$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1 id="title">Twiddler</h1>');
  var $updatefeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  function update() {
    $('#update-feed').text('Update Feed');
    render();
  }

  function userClick(user) {
    // console.log('inside here');
    $('#update-feed').text('Back');
    render(user.data);
  }

  function clickAdv($this) {
    // console.log(this);
    $(this).toggleClass("far fas");
  }

  $updatefeed.on("click", update);

  $title.appendTo($app);
  $updatefeed.appendTo($app);
  $feed.appendTo($app);

  var render = function(user) {
    $feed.empty();
    var data = [];
    if (user) {
      data = streams.users[user];
    } else {
      data = streams.home;
    }
    var index = data.length - 1;
    while(index >= 0){
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<div class="user"></div>');
      var $msg = $('<div class="msg"></div>');
      var $comment = $('<i id="com" class="far fa-comments"></i>');
      var $retweet = $('<i class="fas fa-retweet"></i>');
      var $like = $('<i class="far fa-heart"></i>');
      var $share = $('<i class="far fa-share-square"></i>');
      var tweet = data[index];
      $msg.text(tweet.message);
      $user.text('@' + tweet.user);
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      $user.appendTo($tweet);
      $msg.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $user.click(tweet.user, userClick);
      $comment.click(clickAdv);
      $like.click(clickAdv);
      $share.click(clickAdv);
      index -= 1;
    }
  }
  render();
});