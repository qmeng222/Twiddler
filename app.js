$(document).ready(function(){
//Select existing HTML elements

  var $app = $('#app');
  $app.html('');

//Create new HTML elements

  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $("<button id = 'update-feed' type = 'button'>Update Feed</button>");
  var $homeFeed = $("<div id = 'feed' class = 'feed'></div>");

//Event Handlers and helper functions;

  var renderTweet = function(tweet) {
    //initiate tweet components
    var $tweet = $('<div class="tweet"></div>');
    var $profilePic = $('<img class = "profile-photo"></img>').attr("src", tweet.profilePhotoURL);
    var $username = $('<div class = "username"></div>').text('@' + tweet.user);
    var $message = $('<p class = "message"></p>').text(tweet.message);
    var $timestamp = $('<div class = "timestamp"></div>').text(jQuery.timeago(tweet.created_at));
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

///Event listeners


  renderFeed(); //This one is special; it just runs every time the page is reloaded.

  //refresh home feed
  $updateFeedButton.on("click", function() {
    if ($(this).text() === "Back") {
      $(this).text("Update Feed");
    }
    renderFeed();
  });

  //toggle icons to blue when hovering over them
  $app.on("mouseenter", ".icon", makeThisColor("blue"));
  $app.on("mouseleave", ".icon", makeThisColor("yellow"));

  //render username feed
  $app.on("click", ".username", handleUserNameFeed);



///Append elements
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $homeFeed.appendTo($app);


});