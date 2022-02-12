$(document).ready(function(){

  // EXISTING ELEMENTS
  var $app = $('#app');
  $app.html('');
  jQuery("time.timeago").timeago();


  // TWEETS
  var $icons  = $('<div class="icons"></div>');
  var $feed = $('<div id="feed"></div>');

  // LAYOUT
  var $header = $('<header id="header"></header>');
  var $title = $('<h1 class="title">Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');

  var $row = $('<div class="row"></div>');
  var $lcolumn = $('<div class="column" id="lColumn"></div>')
  var $mcolumn = $('<div class="column"id="mColumn"></div>')
  var $rcolumn = $('<div class="column" id="rColumn"></div>')


  $lcolumn.appendTo($row);
  $mcolumn.appendTo($row);
  $rcolumn.appendTo($row);




  // EVENT HANDLERS

  var titleClick = function(event) {
    console.log(event);

    alert('The title of this page is ' + event.target.innerText)
  }

  var handleBackButton = function(event) {
    console.log(event);

    if ($('#update-feed').text() === 'Back') {
      $('#update-feed').text('Update Feed');
    }
  }

  var handleUsernameClick = function(event) {
    console.log(event);

    var user = (event.target.innerText).slice(1);
    renderFeed(user);

    if ($('#update-feed').text() === 'Update Feed') {
      $('#update-feed').text('Back');
    }
  }

  var renderFeed = function(user) {
    $feed.empty();
    if (user === undefined) {
      var index = streams.home.length - 1;
      while(index >= 0) {
        // TWEET UI COMPONENTS
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        var $tweetIcons = $('<div class="tweetIcons"></div>');
        var $tweetFooter = $('<div class="tweetFooter"></div>');

        var $message = $('<p class="message"></p>');
        var $username = $('<span class="username"></span>');
        var $timestamp = $('<div class ="timestamp"></div>');
        var $profilePhoto = $('<img class="profile-photo">');

        // ICONS
        var $comment = $('<i class="icon comment far fa-comments"></i>');
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share fas fa-share"></i>');

        $profilePhoto.attr('src', tweet.profilePhotoURL)
        $username.text('@' + tweet.user);
        $message.text(tweet.message);
        $timestamp.text($.timeago(tweet.created_at));

        // APPEND TO DOM
        $profilePhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $tweetFooter.appendTo($tweet);

        $comment.appendTo($tweetIcons);
        $retweet.appendTo($tweetIcons);
        $like.appendTo($tweetIcons);
        $share.appendTo($tweetIcons);

        $tweetIcons.appendTo($tweetFooter);
        $timestamp.appendTo($tweetFooter);

        $tweet.appendTo($feed);
        index -= 1;
      }
    } else {

      var index = streams.users[user].length - 1;

      while(index >= 0) {
        // TWEET UI COMPONENTS
        var tweet = streams.users[user][index];
        var $tweet = $('<div class="tweet"></div>');
        var $tweetIcons = $('<div class="tweetIcons"></div>');
        var $tweetFooter = $('<div class="tweetFooter"></div>');

        var $message = $('<p class="message"></p>');
        var $username = $('<span class="username"></span>');
        var $profilePhoto = $('<img class="profile-photo">');
        var $timestamp = $('<span class ="timestamp"></span>');

        // ICONS
        var $comment = $('<i class="icon comment far fa-comments"></i>');
        var $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
        var $like = $('<i class="icon like far fa-heart"></i>');
        var $share = $('<i class="icon share fas fa-share"></i>');

        $profilePhoto.attr('src', tweet.profilePhotoURL)
        $username.text('@' + tweet.user);
        $message.text(tweet.message);
        $timestamp.text($.timeago(tweet.created_at));

        // APPEND TO DOM
        $profilePhoto.appendTo($tweet);
        $username.appendTo($tweet);
        $message.appendTo($tweet);
        $timestamp.appendTo($tweet);
        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);
        $tweetFooter.appendTo($tweet);

        $comment.appendTo($tweetIcons);
        $retweet.appendTo($tweetIcons);
        $like.appendTo($tweetIcons);
        $share.appendTo($tweetIcons);

        $timestamp.appendTo($tweetFooter);
        $tweetIcons.appendTo($tweetFooter);

        $tweet.appendTo($feed);

        index -= 1;
        $updateFeedButton.on("click", handleBackButton);
      }
    };
  };


  // EVENT LISTENERS
  $title.on("click", titleClick);

  $updateFeedButton.on("click", function(event) {
    renderFeed();
  });

  $feed.on("click", ".username", handleUsernameClick);
  $updateFeedButton.on("click", handleBackButton);

  // APPEND TO DOM
  $title.appendTo($header);
  $updateFeedButton.appendTo($header);
  $icons.appendTo($header);
  $header.appendTo($app)
  $feed.appendTo($mcolumn);

  $lcolumn.appendTo($row);
  $mcolumn.appendTo($row);
  $rcolumn.appendTo($row);
  $row.appendTo($app);

  renderFeed();
});