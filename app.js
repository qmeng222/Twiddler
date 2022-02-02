
$(document).ready(function(){

  // FIRST THINGS. Already Existing Elements and Given Things
  var $app = $('#app');
  $app.html('');

  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });

  // HTML. Elements
  var $titlebanner = $('<img class="title-banner">')
  var $title = $('<h1 class="banner">Twiddle Yo Self</h1>');
  // var $subtitle = $('<h2 class="banner">Parks and Rec Twiddler</h2>');
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $backButton = $('<button id="update-feed">Back</button>');


  // FUNCTION. Event Handlers and Functions
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  // This updates the Feed
  $updateFeedButton.on("click", function(event) {
    $feed.html('');
    renderFeed();
  });

    // This builds new tweets to put into my feed
  var renderFeed = function(user) {
    if (user === undefined) {
      var index = streams.home.length - 1;
      while(index >= 0) {
        var tweet = streams.home[index];
        var tweetArray = streams.home;
        var $tweet = $('<div id="feed" class="tweet"></div>');
        var $profilePhoto = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '">').appendTo($tweet);
        var $userName = $('<button class="username"></button>').text('@' + tweet.user).on("click", function(event) {
          var theUserName = event.target.innerText;
          theUserName = theUserName.replace('@','');
          renderFeed(theUserName);
        }).appendTo($tweet);
        var $message = $('<div class="message"></div>').text(tweet.message).appendTo($tweet);
        var $timeStamp = $('<div class="timestamp"></div>').text(jQuery.timeago(tweet.created_at)).appendTo($tweet);

        var $icon = $('<div></div>');
        var $comment = $('<i class="fas fa-comment-dots comment"></i>').appendTo($icon);
        var $retweet = $('<i class="fas fa-retweet retweet"></i>').appendTo($icon);
        var $like = $('<i class="far fa-heart like"></i>').appendTo($icon);
        var $share = $('<i class="fas fa-share-square share"></i>').appendTo($icon);

        $icon.appendTo($tweet);
        $tweet.appendTo($feed);
        index -= 1;
      };
    } else {
      $feed.html('');

      // UpdateFeed Button to Back Button Function
      $updateFeedButton.replaceWith($backButton);
      $backButton.on("click", function(event) {
        $feed.html('');
        renderFeed();

        $backButton.replaceWith($updateFeedButton);
      });

      var index = streams.users[user].length - 1;
      while(index >= 0) {
        var tweet = streams.users[user][index];
        var tweetArray = streams.users[user];
        var $tweet = $('<div id="feed" class="tweet"></div>');
        var $profilePhoto = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '">').appendTo($tweet);
        var $userName = $('<button class="username"></button>').text('@' + tweet.user).on("click", function(event) {
          var theUserName = event.target.innerText;
          theUserName = theUserName.replace('@','');
          renderFeed(theUserName);
        }).appendTo($tweet);
        var $message = $('<div class="message"></div>').text(tweet.message).appendTo($tweet);
        var $timeStamp = $('<div class="timestamp"></div>').text(jQuery.timeago(tweet.created_at)).appendTo($tweet);

        var $icon = $('<div class="all-icon"></div>');
        var $comment = $('<i class="fas fa-comment-dots comment"></i>').appendTo($icon);
        var $retweet = $('<i class="fas fa-retweet retweet"></i>').appendTo($icon);
        var $like = $('<i class="far fa-heart like"></i>').appendTo($icon);
        var $share = $('<i class="fas fa-share-square share"></i>').appendTo($icon);

        $icon.appendTo($tweet);
        $tweet.appendTo($feed);
        index -= 1;
      };
    }
  }
  renderFeed();

  // add hover function
  $(".comment").hover(function() {
    $(".comment").addClass("hovered-icon");
  })

  // APPEND. Append new HTML elements to the DOM
  $titlebanner.appendTo($app);
  $title.appendTo($app);
  // $subtitle.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);


  window.isItBeautifulYet = true
});
