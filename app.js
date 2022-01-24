$(document).ready(function(){
  // Select already exisiting elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $header = $('<header></header>')
  var $title = $('<h1>Twiddler</h1>');
  var $updatebutton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $sidebar = $('<div class="sidebar"></div>');
  var $friendslist = $('<ul id="friends-list"></ul>');
  var $friendstitle = $('<h3>Friends List</h3>');

  // Create event handler function
  var renderFeed = function(user) {
    var index;
    var stream;
    if (user === undefined) {
      index = streams.home.length - 1;
      stream = streams.home;
    } else {
      index = streams.users[user].length - 1;
      stream = streams.users[user];
    }
    while(index >= 0) {
      var tweet = stream[index];
      var $tweet = $('<div class="tweet"></div>');
      var $photo = $('<img class="profile-photo">');
      var $user = $('<div class="username"></div>');
      var $message = $('<p class="message"></p>');
      var $time = $('<span class="timestamp"></span>');
      var $icon = $('<div class="icon"></div>');
      var $comment = $('<i class="far fa-comment comment"></i>');
      var $retweet = $('<i class="fas fa-retweet retweet"></i>');
      var $like = $('<i class="far fa-heart like"></i>');
      var $share = $('<i class="fas fa-share share"></i>');

      $photo.attr('src', 'assets/img/' + tweet.user + '.png')
      $user.text('@' + tweet.user);
      $user.on('click', function(event) {
        handleUsernameClick(event.target.innerText.slice(1));
      })
      $message.text(tweet.message);
      $time.text(jQuery.timeago(tweet.created_at));

      $icon.append($comment, $retweet, $like, $share);
      $tweet.append($photo, $user, $message, $time, $icon);

      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  var handleUsernameClick = function(username) {
    $('div.tweet').remove();
    $updatebutton.text('Back');
    renderFeed(username);
  }

  var renderFriendsList = function() {
    for (var user in streams.users) {
      var $friend = $('<li class="friend"></li>');
      $friend.text('@' + user);
      $friend.on('click', function(event) {
        handleUsernameClick(event.target.innerText.slice(1));
      })
      $friend.appendTo($friendslist);
    }
  };

  // Set event listeners
  $updatebutton.on('click', function() {
    $('div.tweet').remove();
    $updatebutton.text('Update Feed');
    renderFeed();
  });

  // Call functions
  renderFeed();
  renderFriendsList();

  // Append new HTML elements to the DOM
  $title.appendTo($header);
  $updatebutton.appendTo($sidebar);
  $friendstitle.appendTo($sidebar);
  $friendslist.appendTo($sidebar);
  $sidebar.appendTo($app);
  $header.appendTo($app);
  $feed.appendTo($app);

  window.isItBeautifulYet = true;

});