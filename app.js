$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var $header = $('<header><h1>Twiddler</h1></header>');
  var $updateFeedButton = $('<button id="update-feed">Update</button>');
  var $newTweetForm = $('<div id="new_tweet_form"</div>');
  var $feed = $('<div id="feed"></div>');
  var $friendsList = $('<div id="friends_list"></div>');

  // $app.html('');
  $updateFeedButton.appendTo($header);
  $header.appendTo($app)
  $newTweetForm.appendTo($app);
  $feed.appendTo($app);
  $friendsList.appendTo($app);

  var populatesFriends = function () {
    var index = 0;
    while (index < window.users.length) {
      var $userName = $('<div id=user_name><p><b>' + window.users[index] + '</b></p></div>').on("click", function(event) {
          populateTweets(event.target.innerText);
          $updateFeedButton.text("Back");
        });
        $userName.appendTo($friendsList);
        index += 1;
      };
  }

  var index = 0;

  var populateTweets = function(userName) {
    $updateFeedButton.text() === "Back" ? index = 0 : index = index;
    var userFlag;
    !userName ? userFlag = false : userFlag = true;
    var $iconHoverIn = function(event) {
      $(event.target).css("color", "#2c3e50");
    };
    var $iconHoverOut = function(event) {
      $(event.target).css("color", "#f8f9f9");
    };
    var createsTweetDivs = function() {
      var stream;
      !userFlag ? stream = streams.home : stream = streams.users[userName];
      !userFlag ? index = index : index = 0;
      userFlag ? $feed.html("") : function() {};
      while(index < stream.length){
        var tweet = stream[index];
        var $tweet = $('<div class="tweet" id="tweet"></div>');
        var $user = $('<span class="username" id="user"> @'+ tweet.user + '</span>');
        $user.on("click", function(event) {
          $updateFeedButton.text("Back");
          populateTweets(tweet.user);
        });
        var $pic = $('<div id="user_image"><img class="profile-photo" src='+tweet.profilePhotoURL+'></img></div>');
        var $time = $('<span id="tweet_time"><h3 class="timestamp">' + 'Posted ' + $.timeago(tweet.created_at) + '</h3></span>');
        var $message = $('<div class="message" id="message"><p>' + tweet.message + '</p></div>');
        var $commentIcon = $('<i class="far fa-comments tweet-icons comment"></i>').hover($iconHoverIn, $iconHoverOut);
        var $retweetIcon = $('<i class="fas fa-retweet tweet-icons retweet"></i>').hover($iconHoverIn, $iconHoverOut);
        var $likeIcon = $('<i class="far fa-thumbs-up tweet-icons like"></i>').hover($iconHoverIn, $iconHoverOut);
        var $shareIcon = $('<i class="fas fa-share tweet-icons share"></i>').hover($iconHoverIn, $iconHoverOut);
        var $tweetIcons = $('<div id="tweet_icons"></div>').append($commentIcon).append($retweetIcon).append($likeIcon).append($shareIcon);
        $pic.appendTo($tweet);
        $user.appendTo($tweet);
        $message.appendTo($tweet);
        $time.appendTo($tweet);
        $tweet.append($tweetIcons);
        $tweet.prependTo($feed);
        console.log(index);
        index += 1;
      }
    };
    return createsTweetDivs();
  }

  populateTweets();
  populatesFriends();

  $updateFeedButton.on("click", function(event) {
    $(event.target).text() === "Back" ? $feed.html("") : function() {};
    populateTweets();
    $(event.target).text() === "Back" ? $(event.target).text("Update") : function() {};
  });

  window.isItBeautifulYet = true // Sort of...
});