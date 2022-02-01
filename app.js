$(document).ready(function(){
//Select existing HTML elements

  var $app = $('#app');
  $app.html('');

//Create new HTML elements

  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $("<button id = 'update-feed' type = 'button'>Update Feed</button>");
  var $homeFeed = $("<div id = 'feed' class = 'feed'></div>");

//Event Handlers

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

  var renderFeed = function() {
    $homeFeed.empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = renderTweet(tweet);
      $tweet.appendTo($homeFeed);
      index -= 1;
    }
  };
/*
  var makeBlue = function() {
    $this.css("color", "blue")
  };
*/
/*
  var renderFeed = function() {
    $homeFeed.empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.appendTo($homeFeed);
      index -= 1;
    }
  };
 */


///Event listeners


  renderFeed(); //This one is special; it just runs every time the page is reloaded.
  $updateFeedButton.on("click", renderFeed);
  $

///Append elements
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $homeFeed.appendTo($app);


});