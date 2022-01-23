$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1 id="title">Twiddler</h1>');
  var $updatefeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $myTweet = $('<input type="text" id="new-tweet-form" value="Enter Tweet...">');
  var $friends = $('<ul id="friends-list">Friends List</ul>');
  var $send = $('<button id="send">Send Tweet</button>');
  var list = ['shawndrost', 'douglascalhoun', 'mracus', 'sharksforcheap'];

  function update() {
    $('#update-feed').text('Update Feed');
    render();
  }
  function chirp() {
    if (!streams.users.user123456) {
      streams.users.user123456 = [];
    }
    var text = document.getElementById("new-tweet-form").value;
    document.getElementById("new-tweet-form").value = '';
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

  function renderFriends() {
    for (var i = 0; i < list.length; i++) {
      var $fl = $('<li class="friend">@' + list[i] + '</li>');
      $fl.appendTo($friends);
    }
  }

  function userClick(user) {
    $('#update-feed').text('Back');
    var $fl = $('<li class="friend">@' + user.data + '</li>');
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
      var $user = $('<div class="username">@' + tweet.user + '</div>');
      var $message = $('<div class="message"></div>');
      var $comment = $('<i id="icon" class="comment far fa-comments"></i>');
      var $retweet = $('<i id="icon" class="retweet fas fa-retweet"></i>');
      var $like = $('<i id="icon" class="like far fa-heart"></i>');
      var $share = $('<i id="icon" class="share far fa-share-square"></i>');
      var $time = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $profile = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '">');
      $message.text(tweet.message);
      // $user.text('@' + tweet.user);
      // $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($feed);
      $profile.appendTo($tweet);
      $user.appendTo($tweet);
      $time.appendTo($tweet);
      $message.appendTo($tweet);
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
  renderFriends();
  render();
  window.isItBeautifulYet = true;
});