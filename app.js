$(document).ready(function(){
  var $app = $('#app');
  var $header = $('<header><h1>Twiddler</h1></header>');
  var $updateFeedButton = $('<button>Update</button>').on("click", function(event) {
    event.target.innerText === "Home" ? event.target.innerText = "Update" : function() {};
  });

  var $newTweetForm = $('<div id="new_tweet_form"</div>');
  var $feed = $('<div id="feed"></div>');
  var $friendsList = $('<div id="friends_list"></div>');


  var populatesFriends = function () {
    var index = 0;
    while (index < window.users.length) {
      var $userName = $('<div id=user_name><p><b>' + window.users[index] + '</b></p></div>').on("click", function(event) {
          populateTweets(event.target.innerText);
          $updateFeedButton.text("Home");
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
        var $tweet = $('<div class="tweet"></div>');
        var $user = $('<span id="user"> @'+ tweet.user + '</span>');
        $user.on("click", function(event) {
          $updateFeedButton.text("Home");
          populateTweets(tweet.user);

        });
        var $pic = $('<div id=user_image><img src='+tweet.profilePhotoURL+'></img></div>');
        var $time = $('<span id="tweet_time"><h3>' + 'Posted at ' + tweet.created_at.toLocaleTimeString() + '</h3></span>');
        var $message = $('<div><p id="message">' + tweet.message + '</p></div>');
        $pic.appendTo($tweet);
        $user.appendTo($tweet);
        $message.appendTo($tweet);
        $time.appendTo($tweet);



        var $placeholderIcon = $('<img src="./assets/icons/placeholder.png"></img>');
        var $commentIcon = $('<span class="tweet-icons"></span>').html("&#9998").hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });
        var $retweetIcon = $('<span class="tweet-icons"></span>').html("&#8634").hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });
        var $likeIcon = $('<span class="tweet-icons"></span>').html("&#9786").hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });
        var $shareIcon = $('<span class="tweet-icons"></span>').html("&#10155").hover(function(event) {
          $(event.target).css("color", "#2c3e50");
        },
        function(event) {
          $(event.target).css("color", "#f8f9f9");
        });

        var $tweetIcons = $('<div id="tweet_icons"></div>').append($commentIcon).append($retweetIcon).append($likeIcon).append($shareIcon);
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
    console.log(event);
    populateTweets();
  });

});