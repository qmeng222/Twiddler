$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  /* Title */
  var $header = $('<div class="header"></div>');
  $header.appendTo($app);

  var $title = $('<h1 id="title">Twiddler</h1>');
  $title.appendTo($header);
  $title.on('click', function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  /* Button */
  var $nav = $('<div class="nav"></div>');
  $nav.appendTo($app);

  var $updateButton = $('<button id="update-feed"></button>');
  $updateButton.text('Update Feed');
  $updateButton.appendTo($nav);
  $updateButton.on('click', function(event) {
    if ($updateButton.text() === 'Back') {
      $updateButton.text('Update Feed');
    }
    $feed.empty();
    renderFeed();
  });

  /* Side Bar */
  var $aside = $('<div class="aside"></div>');
  $aside.appendTo($app);

  var $container = $('<div class="container"></div>');
  $container.appendTo($aside);

  var $newTweetForm = $(`<form id="new-tweet-form" method="post" type="submit"></form>`);
  $newTweetForm.appendTo($container);

  var newTweetForm = function() {
    $header = $('<h2 id="new-tweet"></h2>');
    $header.text('New Tweet');
    $header.appendTo($newTweetForm);

    $labelUser = $('<label id="new-tweet-user" for="user"></label>');
    $labelUser.text('Username');
    $inputUser = $('<input type="text" id="user" name="username" attribute="username" required>');

    $labelTweet = $('<label id="new-tweet-message" for="m"></label>');
    $labelTweet.text('Tweet');
    $inputTweet = $('<input type="text" id="m" name="message" attribute="message" required>');

    $labelUser.appendTo($newTweetForm);
    $inputUser.appendTo($newTweetForm);
    $labelTweet.appendTo($newTweetForm);
    $inputTweet.appendTo($newTweetForm);

    $buttonWrapper = $('<div id=new-tweet-wrapper></div>');
    $submit = $('<button id="new-tweet-button" type="submit" value="Post"></button>');
    $submit.text('Post');
    $submit.appendTo($buttonWrapper);
    $buttonWrapper.appendTo($newTweetForm);
  };

  newTweetForm();

  var $friendsList = $('<div id="friends-list-entries"></div>');
  $friendsList.appendTo($container);

  var populateFriendsList = function() {
    $friendsList.empty();
    $header = $('<h2 id="list"></h2>');
    $header.text('Friends List');
    $header.appendTo($friendsList);
    $list = $('<ul id="friends-list"></ul>');
    $list.appendTo($friendsList);

    for (var user in window.streams.users) {
      let u = user;
      $friend = $('<li class="friend"></li>');
      $friend.text(`@${u}`);
      $friend.appendTo($list);
      $friend.on('click', function() {
        renderFeed(u);
      });
    }
  };

  populateFriendsList();

  /* feed */
  var $feed = $('<div class="feed"></div>');

  $feed.appendTo($aside);

  $feed.on("click", '.username', function(event) {
    var username = event.target.innerText.slice(1);
    $feed.empty();
    renderFeed(username);
  });

  /* render function */
  var renderFeed = function(user) {
    if  (user === undefined) {
      var index = streams.home.length - 1;
      var stream = streams.home;
    }
    else {
      $updateButton.text('Back');
      var index = streams.users[user].length - 1;
      var stream = streams.users[user];
    }
      while(index >= 0){
        var tweet = stream[index];
        var messageContent = tweet.message;
        /* tweet format */
        var $tweet = $('<div class = "tweet"></div>');
        var $tweetHeader = $('<div class="tweetHeader"></div>');
        var $tweetBody = $('<div class="tweetBody"></div>');
        var $tweetFooter = $('<div class="tweetFooter"></div>');
        var $message = $('<div class = "message"></div>');
        /* tweet content */
        var $username = $('<div class = "username"></div>');
        var $image = $('<img class = "profile-photo" src = assets/img/'+ tweet.user +'.png>');
        var $timeStamp = $('<div class = "timestamp"></div>');
        var username = '@' + tweet.user;
        var timestamp = jQuery.timeago(tweet.created_at);
        var $comment = $('<i class = "comment fas fa-comments icons"></i>');
        var $retweet = $('<i class = "retweet fas fa-retweet icons"></i>');
        var $like = $('<i class = "like far fa-heart icons"></i>');
        var $share = $('<i class = "share fas fa-share icons"></i>');
        /* tweet format */
        $tweet.appendTo($feed);
        $tweetHeader.appendTo($tweet);
        $tweetBody.appendTo($tweet);
        $tweetFooter.appendTo($tweet);
        /* tweet content */
        $message.appendTo($tweetBody);
        $message.text(messageContent);
        $username.appendTo($tweetHeader);
        $username.text(username);
        $image.appendTo($tweetHeader);
        $timeStamp.appendTo($tweetFooter);
        $timeStamp.text(timestamp);
        $comment.appendTo($tweetFooter);
        $retweet.appendTo($tweetFooter);
        $like.appendTo($tweetFooter);
        $share.appendTo($tweetFooter);
      index -= 1;
    }
  };
  renderFeed();
});