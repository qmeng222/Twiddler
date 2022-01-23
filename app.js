$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1 id="title">Twiddler</h1>');
  var $updatefeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $myTweet = $('<input type="text" id="myTweet" value="Enter Tweet...">');
  var $friends = $('<div id="friends">Friends List</div>');
  var $send = $('<button id="send">Send Tweet</button>');
  var list = [];

  function update() {
    $('#update-feed').text('Update Feed');
    render();
  }
  function chirp() {
    if (!streams.users.user123456) {
      streams.users.user123456 = [];
    }
    var text = document.getElementById("myTweet").value;
    document.getElementById("myTweet").value = '';
    // dummy user
    var birbChirp = {
      user: 'user123456',
      message: text,
      created_at: new Date(),
      profilePhotoURL: './assets/img/douglascalhoun.png'
    };
    streams.home.push(birbChirp);
    streams.users.user123456.push(birbChirp);
    render();
  }

  function userClick(user) {
    $('#update-feed').text('Back');
    var $fl = $('<div class="indivFr">' + user.data + '</div>');
    var here = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i] === user.data) {
        here = true;
        break;
      }
    }
    if (!here) {
      $fl.appendTo($friends);
      list.push(user.data);
    }
    render(user.data);
  }

  function clickAdv($this) {
    $(this).toggleClass("far fas");
  }

  $updatefeed.on("click", update);
  $send.on("click", chirp)

  $title.appendTo($app);
  $updatefeed.appendTo($app);
  $friends.appendTo($app);
  $myTweet.appendTo($app);
  $send.appendTo($app);
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
      var tweet = data[index];
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<div class="user"></div>');
      var $msg = $('<div class="msg"></div>');
      var $comment = $('<i id="icon" class="far fa-comments"></i>');
      var $retweet = $('<i id="icon" class="fas fa-retweet"></i>');
      var $like = $('<i id="icon" class="far fa-heart"></i>');
      var $share = $('<i id="icon" class="far fa-share-square"></i>');
      var $time = $('<div class="time">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $profile = $('<img class="pfp" src="' + tweet.profilePhotoURL + '">');
      $msg.text(tweet.message);
      $user.text('@' + tweet.user);
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      $profile.appendTo($tweet);
      $user.appendTo($tweet);
      $time.appendTo($tweet);
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