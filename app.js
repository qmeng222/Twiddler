$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  // Create new HTML elements
  var $titleUpdate = $('<div id="titleUpdate"></div>');
  var $title = $('<h1 id="title">Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button><br>');
  var $feed = $('<div id="feed"></div>');
  var $newPost = $('<div id="newPost"></div>');
  var listOfNames = {};
  var $leftDiv = $('<div id="leftDiv"></div>');
  var $nameLabel = $('<label id="userLabel">Username:</label><br>');
  var $nameInput = $('<input type="text" id="name"><br>');
  var $tweetLabel = $('<label id="tweetLabel">Message:</label><br>');
  var $tweetInput = $('<textarea id="post"></textarea><br><br>');
  var $postButton = $('<button id="postButton">Post</button>');
  var $friendsList = $('<div id="friendsList"></div>');
  var $friendListLabel = $('<label id="friendListLabel">Friends</label>')
  var $breakline = $('<hr>');

  // Create event handler functions

  var addFriendsList = function(object) {
      for (var name in object) {
      var $newFriend = $('<span class="newFriend"></span>');
      $newFriend.html(name);
      $newFriend.appendTo($friendsList);
      $('<br></br>').appendTo($friendsList);
    }
  }

  var createTweet = function(tweet) {
    var $tweet = $('<div class="tweet"></div>');
    var $image = $('<img class="profile-photo" alt="default" height="64px" width="64px">');
    var $user = $('<span class="username">Username</span>');
    var $message = $('<p class="message"></p>');
    var $userNTime = $('<div class="userNTime"></div>');
    var $timestamp = $('<span class="timestamp"></span>');
    var $icons = $('<div class = "icons"></div>');
    var $comment = $('<i class="far fa-comments fa-2x icon comment"></i>');
    var $retweet = $('<i class="far fa-retweet fa-2x icon retweet"></i>');
    var $like = $('<i class="far fa-thumbs-up fa-2x icon like"></i>');
    var $share = $('<i class="far fa-share fa-2x icon share"></i>');
    $image.attr('src', tweet.profilePhotoURL);
    $image.appendTo($tweet);
    $user.appendTo($userNTime);
    $timestamp.appendTo($userNTime);
    $userNTime.appendTo($tweet);
    $message.appendTo($tweet);
    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);
    $icons.appendTo($tweet);
    $user.text('@' + tweet.user);
    $message.text(tweet.message);
    $timestamp.text(jQuery.timeago(tweet['created_at']));
    return $tweet;
  }

  var renderFeed = function(user) {
    var user = (user === undefined) ? streams.home : streams.home.filter(stream => stream.user === user);
    $feed.html('');
    $('#friendsList').html('');
    var index = user.length - 1;
    while(index >= 0) {
      if (listOfNames[user[index].user] === undefined) {
        listOfNames[user[index].user] = '';
      }
      var tweet = user[index];
      var $tweet = createTweet(tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
    addFriendsList(listOfNames);
    $('.newFriend').on('click', function(event) {
      handleUsernameClick(event);
    });
    $('.username').on("click", function(event) {
      handleUsernameClick(event);
    });
    // $('.icon').hover(
    // function() {
    //   $(this).css('color', 'blue');
    // }, function() {
    //   $(this).css('color', 'black');
    //   }
    // );
  }
  var back = function() {
    $button.html('Update Feed');
    $button.on('click', function(event) {
      $feed.html('');
      renderFeed();
    });
    $newPost.show();
    $feed.html('');
    renderFeed();
  }
  renderFeed();
  var handleUsernameClick = function(event) {
    var name = event.target.innerText[0] === '@' ? event.target.innerText.slice(1) : event.target.innerText;
    $newPost.hide();
    $button.html('Back');
    $button.on('click', function(event) {
      back();
    });
    $feed.html('');
    renderFeed(name);
    $('.username').unbind();
  };
  var clickedSubmit = function(name, tweet) {
    streams.home.push({
      'user' : name,
      'message' : tweet,
      'created_at' : new Date(),
      'profilePhotoURL' : './assets/img/default-profile.png'
    });
    $('#name').val('');
    $('#post').val('');
    renderFeed();
  }

  // Set event listeners
  $button.on('click', function(event) {
    renderFeed();
  });
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $postButton.on('click', function(event) {
    clickedSubmit($('#name').val(), $('#post').val());
    console.log(streams.home);
  })

  // Append new HTML elements to the DOM
  $title.appendTo($titleUpdate);
  $button.appendTo($titleUpdate);
  $titleUpdate.appendTo($leftDiv);
  $nameLabel.appendTo($newPost);
  $nameInput.appendTo($newPost);
  $tweetLabel.appendTo($newPost);
  $tweetInput.appendTo($newPost);
  $postButton.appendTo($newPost);
  $newPost.appendTo($leftDiv);
  $friendListLabel.appendTo($leftDiv);
  $breakline.appendTo($leftDiv);
  $friendsList.appendTo($leftDiv);
  $leftDiv.appendTo($app);
  $feed.appendTo($app);

  // $('.icon').hover(
  //   function() {
  //     $(this).css('color', 'blue');
  //   }, function() {
  //     $(this).css('color', 'black');
  //   }
  // );

  $('.username').on("click", function(event) {
    handleUsernameClick(event);
  });
  $('.newFriend').on('click', function(event) {
    handleUsernameClick(event);
  });

  window.isItBeautifulYet = true;
});