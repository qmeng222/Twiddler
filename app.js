$(document).ready(function(){

  //jQuery("time.timeago").timeago();
  //selectors for existing HTML elements
  var $app = $('#app');
  $app.html('');

  //create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $feed = $('<div id="feed" />');
  var $updateFeedButton = $('<button id="update-feed" type="button">Update Feed</button>');

  //Functions / event handlers

    //attaches eventlistener with username in the callback
  var addClickEvent = function ($element, callback, callbackParameter) {
    $element.on("click", function() {
      callback(callbackParameter);
      $updateFeedButton.text("Back");
    });
  }

  //updates the feed with new tweets
  var renderFeed = function (userFilter) {
    $feed.empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      if (userFilter === undefined || userFilter === streams.home[index].user) {

        var $tweetContainer = $('<div class="tweet" id=""/>');
        var tweet = streams.home[index];
        var $username = $('<p class="username">@' + tweet.user + '</p>');
        addClickEvent($username, renderFeed, tweet.user);
        var $message = $('<p class="message">' + tweet.message + '</p>');
        var $profilePhoto = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '" alt="Rick Roll" />'); // resume from here
        var $timeStamp = $('<p class="timestamp">' + jQuery.timeago(tweet.created_at) + '</p>');
        var $commentIcon = $('<i class="icon comment far fa-comment"></i>');
        var $retweetIcon = $('<i class="icon retweet fas fa-retweet"></i>');
        var $likeIcon = $('<i class="icon like far fa-heart"></i>');
        var $shareIcon = $('<i class=" icon share fas fa-share"></i>');

        $tweetContainer.appendTo($feed);
        $profilePhoto.appendTo($tweetContainer);
        $username.appendTo($tweetContainer);
        $message.appendTo($tweetContainer);
        $timeStamp.appendTo($tweetContainer);
        $commentIcon.appendTo($tweetContainer);
        $retweetIcon.appendTo($tweetContainer);
        $likeIcon.appendTo($tweetContainer);
        $shareIcon.appendTo($tweetContainer);
      }
      index -= 1;
    }
  }

  //event listeners
  $title.on("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

  $updateFeedButton.on("click", function(event) {
    renderFeed();
    $updateFeedButton.text("Update Feed");
  });



  //append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);

  //function calls
  renderFeed();
  window.isItBeautifulYet = true;
});