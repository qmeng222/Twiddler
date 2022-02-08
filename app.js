$(document).ready(function(){

  $("time.timeago").timeago();

  var $app = $('#app'); //creates JQuery object variable
  $app.html(''); // clears div with ID app

  var $title = $('<h1>Twiddler</h1>'); // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);
  $title.on("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $container = $('<div id="container"></div>');
  $container.appendTo($app);

  var $sideBar = $('<div id="side-bar"></div>');
  $sideBar.appendTo($container);

  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($sideBar);

  var $friendsList = $('<div id="friends-list"></div>');
  $friendsList.appendTo($sideBar);

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($container);

  var $friendsTitle = $('<h3 id="friends-title">Friends List</h3>');
  $friendsTitle.appendTo($friendsList);



  function renderFeed(username) {
    $feed.empty();

    if (username === undefined) {
      var index = streams.home.length - 1;
      while(index >= 0) {
        var tweet = streams.home[index];
        var tweetImg = tweet.profilePhotoURL;
        var $iconContainer = $("<div class='icons'></div>");

        var $tweet = $('<div class="tweet"></div>');
        var $userName = $("<div class='username'></div>");
        var $message = $('<div class="message"><div/>');
        var $timeStamp = $('<div class="timestamp"><div/>');
        var $imgProfile = $('<img class="profile-photo">'); //Equivalent: $(document.createElement('img'))
        var $comment = $('<i class="comment far fa-comment"></i>')
        var $retweet = $('<i class="retweet fas fa-retweet"></i>')
        var $like = $('<i class="like far fa-heart"></i>')
        var $share = $('<i class="share fas fa-share-square"></i>')

        $imgProfile.attr('src', tweetImg);
        $userName.text('@' + tweet.user);
        $message.text(tweet.message);
        $timeStamp.text(jQuery.timeago(tweet.created_at));

        $imgProfile.appendTo($tweet);
        $userName.appendTo($tweet); // as compared to $userName.appendTo(".tweet") ???
        $message.appendTo($tweet);
        $timeStamp.appendTo($tweet);
        $comment.appendTo($iconContainer);
        $retweet.appendTo($iconContainer);
        $like.appendTo($iconContainer);
        $share.appendTo($iconContainer);
        $iconContainer.appendTo($tweet);

        $tweet.appendTo($feed);
        index -= 1;
      };

    } else {
        var index = streams.users[username].length - 1;
        while(index >= 0) {
          var userTweet = streams.users[username][index];
          var tweetImg = userTweet.profilePhotoURL;
          var $iconContainer = $("<div class='icons'></div>");


          var $tweet = $('<div class="tweet"></div>');
          var $userName = $("<div class='username'></div>");
          var $message = $('<div class="message"><div/>');
          var $timeStamp = $('<div class="timestamp"><div/>');
          var $imgProfile = $('<img class="profile-photo">'); //Equivalent: $(document.createElement('img'))
          var $comment = $('<i class="comment far fa-comment"></i>')
          var $retweet = $('<i class="retweet fas fa-retweet"></i>')
          var $like = $('<i class="like far fa-heart"></i>')
          var $share = $('<i class="share fas fa-share-square"></i>')

          $imgProfile.attr('src', tweetImg);
          $userName.text('@' + userTweet.user);
          $message.text(userTweet.message);
          $timeStamp.text(jQuery.timeago(userTweet.created_at));

          $imgProfile.appendTo($tweet);
          $userName.appendTo($tweet); // as compared to $userName.appendTo(".tweet") ???
          $message.appendTo($tweet);
          $timeStamp.appendTo($tweet);
          $comment.appendTo($iconContainer);
          $retweet.appendTo($iconContainer);
          $like.appendTo($iconContainer);
          $share.appendTo($iconContainer);
          $iconContainer.appendTo($tweet);

          $tweet.appendTo($feed);
          index -= 1;
        }
      }
    }

  renderFeed();

  $("body").on("click", ".username", function(event) {
    var fullUserName = event.target.innerText.slice(1);
    renderFeed(fullUserName);
    $updateFeed.text("Back");
  })

  $("body").on("mouseenter mouseleave", "i", function() {
    $(this).toggleClass('active');
  })


  $updateFeed.on("click", function() {
    if ($(this).text() === "Back") {
      $updateFeed.text("Update Feed")
      renderFeed();
    } else {
      renderFeed();
    }
  });

  function loadFriends() {
    var friends = streams.users;
    var $friends = $('<ul class="friends"</ul>')
    for (key in friends) {
      var $friend = $('<li class="friend"</li>')
      $friend.text(key);
      $friend.appendTo($friends);
    }
    $friends.appendTo($friendsList)
  }

  loadFriends();

  $("body").on("click", ".friend", function(event) {
    var fullUserName = event.target.innerText;
    renderFeed(fullUserName);
    $updateFeed.text("Back");
  })

  $("body").on("mouseenter mouseleave", ".friend", function() {
    $(this).toggleClass('active');
  })

  window.isItBeautifulYet = true
});