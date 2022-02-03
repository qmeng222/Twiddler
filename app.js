$(document).ready(function(){
//Select existing HTML elements

  var $app = $('#app');
  $app.html('');

//Create new HTML elements

  var $title = $('<h1 id = "title">Twiddler</h1>');

  var $appBody = $('<div id = "app-body"></div>');

  var $feedContainer = $("<div id = 'feed-container'></div>");
  var $updateFeedButton = $("<button id = 'update-feed' type = 'button'>Update Feed</button>");
  var $feedTitle = $("<h2 id = 'feed-title'>Your feed</h2>");
  var $homeFeed = $("<div id = 'feed' class = 'feed'></div>");

  var $sideBar = $("<div id = 'sidebar'></div>");
  var $tweetForm = $("<div id = 'tweet-form'>\
                        <h2>What's on your mind?</h2>\
                        <form>\
                          <label for='name'>Username:</label> <br>\
                          <input type = 'text' id = 'name' name = 'name'></input> <br>\
                          <label for='newmessage'>Message:</label> <br>\
                          <input type = 'text' id = 'newmessage' name = 'newmessage'></input> <br> <br>\
                         <input type = 'submit' value = 'Submit'></input>\
                        </form>\
                    </div>");
  var $friendsList = $("<ul id = 'friends-list'>Friends List</ul>");

//Event Handlers and helper functions;

  var renderTweet = function(tweet) {
    //initiate tweet components
    var $tweet = $('<div class="tweet"></div>');
    var $profilePic = $('<img class = "profile-photo"></img>').attr("src", tweet.profilePhotoURL);
    var $username = $('<span class = "username"></span>').text('@' + tweet.user);
    var $message = $('<p class = "message"></p>').text(tweet.message);
    var $timestamp = $('<span class = "timestamp"></span>').text(jQuery.timeago(tweet.created_at));
    var $comment = $('<i class = "icon comment fas fa-comment"></i>');
    var $retweet = $('<i class = "icon retweet fas fa-retweet"></i>');
    var $like = $('<i class = "icon like fas fa-heart"></i>');
    var $share = $('<i class = "icon share fas fa-share"></i>');

    //now combine them together
    $tweet.append($profilePic, $username, $message, $timestamp, $comment, $retweet, $like, $share);
    return $tweet;
  };

  var renderFeed = function(user) {
    $homeFeed.empty();
    if (user === undefined) {
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = renderTweet(tweet);
        $tweet.appendTo($homeFeed);
        index -= 1;
      }
    } else {
      var index = streams.users[user].length - 1;
      while(index >= 0){
        var tweet = streams.users[user][index];
        var $tweet = renderTweet(tweet);
        $tweet.appendTo($homeFeed);
        index -= 1;
      }

    }

  };

  var handleUserNameFeed = function () {
    if ($updateFeedButton.text() === "Update Feed") {
      $updateFeedButton.text('Back');
    }
    renderFeed($(this).text().substring(1));
  };

  var makeThisColor = function(color){
    var makeThisSpecificColor = function () {
      $(this).css("color", color);
    };
    return makeThisSpecificColor;
  };

  var updateFriendsList = function() {
    for (let i = 0; i < window.users.length; i++) {
      $friendsList.append($('<li class = "username"></li>').text("@" + window.users[i]));
    }
  };



///Event listeners


  renderFeed(); //This one is special; it just runs every time the page is reloaded.

  updateFriendsList();

  //refresh home feed
  $updateFeedButton.on("click", function() {
    if ($(this).text() === "Back") {
      $(this).text("Update Feed");
    }
    renderFeed();
  });

  //toggle icons to blue when hovering over them
  $app.on("mouseenter", ".icon", makeThisColor("white"));
  $app.on("mouseleave", ".icon", makeThisColor($app.css("color")));

  //render username feed
  $app.on("click", ".username", handleUserNameFeed);



///Append elements
  $title.appendTo($app);

  $feedTitle.appendTo($feedContainer);
  $updateFeedButton.appendTo($feedContainer);
  $homeFeed.appendTo($feedContainer);
  $feedContainer.appendTo($appBody);

  $tweetForm.appendTo($sideBar);
  $friendsList.appendTo($sideBar);
  $sideBar.appendTo($appBody);

  $appBody.appendTo($app);


});

window.isItBeautifulYet = true;