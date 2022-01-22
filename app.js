$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  $("time.timeago").timeago();

  //renderFeed helper function
  var renderFeed = function renderFeed() {
    $feed.html('');
    if (arguments[0] !== undefined) {
      var user = arguments[0].slice(1, arguments[0].length);
      var index = streams.users[user].length - 1;
      var list = streams.users[user];
      $updater.text('Back');
    } else {
      var index = streams.home.length - 1;
      var list = streams.home;
      $updater.text('Update Feed');
    }
    while(index >= 0){
      var tweet = list[index];
      var $tweet = $('<div class="tweet"></div>');

      var $profilePic = $('<img class ="profile-photo"></img>');
      $profilePic.attr('src', tweet.profilePhotoURL);
      $profilePic.appendTo($tweet);

      //access to username
      var $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.on('click', function(event) {
        renderFeed(event.target.innerText);
      })
      $username.appendTo($tweet);

      //access to tweet message
      var $message = $('<div class="message"></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);

      //append timestamp
      var $timestamp = $('<time class="timestamp"></time>');
      $timestamp.text($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      //twiddler icons
      var $icons = $('<div class="icon"></div>');

      var $commentIcon = $('<i class="fas fa-comment comment"></i>');
      $commentIcon.attr('src', './assets/icons/placeholder.png');
      $commentIcon.appendTo($icons);

      var $retweetIcon = $('<i class="fas fa-retweet retweet"></i>');
      $retweetIcon.attr('src', './assets/icons/placeholder.png');
      $retweetIcon.appendTo($icons);

      var $likeIcon = $('<i class="fas fa-heart like"></i>');
      $likeIcon.attr('src', './assets/icons/placeholder.png');
      $likeIcon.appendTo($icons);

      var $shareIcon = $('<i class="fas fa-share-square share"></i>');
      $shareIcon.attr('src', './assets/icons/placeholder.png');
      $shareIcon.appendTo($icons);

      $icons.appendTo($tweet);

      $tweet.appendTo($feed);
      index -= 1;
    }
    $updater.appendTo($app);

    $feed.appendTo($app);
  };

  //generates title
  var $title = $('<h1 class="title">Twiddler</h1>');
  $title.appendTo($app);

  //create feed
  var $feed = $('<div id="feed"></div>');

  //generate update feed button
  var $updater = $('<button id="update-feed" class="shrink-border">Update Feed</button>');
  $updater.appendTo($app);

  $updater.on('click', function(event) {
    renderFeed();
  });

  //friends list
  var $friendsList = $('<ul class="friends-list">Friends List</ul>');
  for (key in streams.users) {
    var $friend = $('<li class="friend"></ul>');
    $friend.text(key);
    $friend.on('click', function(event) {
      var name = '@' + event.target.innerText;
      renderFeed(name);
    })
    $friendsList.append($friend);
  }
  $friendsList.appendTo($app);

  //generate initial feed
  renderFeed();

  window.isItBeautifulYet = true;
});