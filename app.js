$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var $header = $('<header><h1>Twiddler</h1></header>');
  var $updateFeedButton = $('<button id="update-feed">Update</button>').on("click", function(event) {
    $(event.target).text() === "Back" ? $(event.target).text("Update") : function() {};
  });

  var $newTweetForm = $('<div id="new_tweet_form"</div>');
  var $feed = $('<div id="feed"></div>');
  var $friendsList = $('<div id="friends_list"></div>');


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

  $app.html('');
  $updateFeedButton.appendTo($header);
  $header.appendTo($app)
  $newTweetForm.appendTo($app);
  $feed.appendTo($app);
  $friendsList.appendTo($app);

  var populateTweets = function(userName) {
    $feed.html("");
    var userFlag = false;
    if (!!userName) {
      userFlag = true;
    }
    var index = 0;
    var createsTweetDivs = function() {
      var stream;
      !userFlag ? stream = streams.home : stream = streams.users[userName];
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
        $pic.appendTo($tweet);
        $user.appendTo($tweet);
        $message.appendTo($tweet);
        $time.appendTo($tweet);

        var $placeholderIcon = $('<img src="./assets/icons/placeholder.png"></img>');
        var $commentIcon = $('<i class="far fa-comments tweet-icons comment"></i>').hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });
        var $retweetIcon = $('<i class="fas fa-retweet tweet-icons retweet"></i>').hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });
        var $likeIcon = $('<i class="far fa-thumbs-up tweet-icons like"></i>').hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });
        var $shareIcon = $('<i class="fas fa-share tweet-icons share"></i>').hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });

        var $tweetIcons = $('<div id="tweet_icons"></div>').append($commentIcon).append($retweetIcon).append($likeIcon).append($shareIcon);
        $tweet.append($tweetIcons);
        $tweet.prependTo($feed);

        // console.log($tweet);
        index += 1;
      }
    };
    return createsTweetDivs();
  }
  populateTweets();
  populatesFriends();

  $updateFeedButton.on("click", function(event) {
    // console.log(event);
    $feed.html("");
    populateTweets();
  });
  window.isItBeautifulYet = true // Sort of...
});