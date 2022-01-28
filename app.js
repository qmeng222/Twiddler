$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var $feed = $('#feed');

  var displayTweets = function(stream) {
    $feed.empty();
    var index = stream.length - 1;
    while (index >= 0) {
      var tweet = stream[index];
      var $tweet = $('<div class="tweet"></div>');

      var $pfp = $('<img class="profile-photo" src="'+tweet.profilePhotoURL+'">');

      var $username = $('<h3 class="username"></h3');
      $username.text('@' + tweet.user);

      var $message = $('<p class="message"></p>');
      $message.text(tweet.message);

      var $infobar = $('<div class="infobar"></div>')

      var $timestamp = $('<time class="timestamp timeago"></time>');
      $timestamp.attr('datetime', tweet.created_at);
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var $comment = $('<i class="icon comment far fa-comment"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $like = $('<i class="icon like far fa-heart"></i>');
      var $share = $('<i class="icon share far fa-share-square"></i>');
      $infobar.append($timestamp, $comment, $retweet, $like, $share);

      $tweet.append($pfp, $username, $message, $infobar);
      $tweet.appendTo($feed);

      index -= 1;
    }
    $('i.icon').hover(hoverHandler);
    $('h3.username').on('click', displayUserTweets);
    $('div#feed').scrollTop(0);
  };

  var displayUserTweets = function(event) {
    $(':button#update-feed').text('Back');
    var username = $(this).text().slice(1);
    var stream = streams.users[username];
    displayTweets(stream);
  };

  var displayFriendsList = function() {
    var $list = $('#friends-list');
    for (var i = 0; i < users.length; i++) {
      var $username = '<li class="friend">@'+users[i]+'</li>';
      $list.append($username);
    }
    $('li.friend').on('click', displayUserTweets);
  };

  var hoverHandler = function(event) {
    var $icon = $(this);
    if (!$icon.hasClass('retweet')) {
      $icon.toggleClass('fas');
      $icon.toggleClass('far');
    }
  }

  var toggleWriteTweet = function() {
    var $btn = $(':button#write-tweet');
    if ($btn.text() === 'Write Tweet') {
      $btn.text('Cancel');
      $('#new-tweet-form').show();
    } else {
      $btn.text('Write Tweet');
      $('#new-tweet-form').hide();
      $('#input-message').val('');
    }
  };

  var submitTweet = function() {
    var user = $('#input-username').val().toString();
    var msg = $('#input-message').val().toString();

    window.visitor = user;
    writeTweet(msg);
  };

  $(':button#update-feed').on('click', function() {
    $(this).text('Update Feed');
    displayTweets(streams.home);
  });

  $(':button#write-tweet').on('click', toggleWriteTweet);

  $(':button#submit-tweet').on('click', function(event) {
    event.preventDefault();
    submitTweet();
    displayTweets(streams.home);
    toggleWriteTweet();
  });

  $('#new-tweet-form').hide();

  displayFriendsList();
  displayTweets(streams.home);
});

window.isItBeautifulYet = true;