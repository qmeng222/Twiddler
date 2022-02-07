$(document).ready(function(){
  //Select existing elements
  var $app = $('#app');

  //Starts the page fresh
  $app.html('');

  //Creates new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed" type="button">Update Feed</button>');
  var $homeFeed = $('<div id="feed" class="feed"></div>');


//Creates event handler functions

  var handleTitleClick = function(event) {
    alert('The title of this page is : ' + event.target.innerText);
  };

  var handleUpdateClick = function(event) {
    $updateFeedButton.text('Update Feed');
    $('.tweet').remove();
    renderFeed();
  }

  var handleUsernameClick = function(event) {
    var name = event.target.innerText;
    var username = name.slice(1);
    $('.tweet').remove();
    $updateFeedButton.text('Back');
    renderFeed(username);
  }

  var renderFeed = function(username) {
    $homeFeed.empty();

    if (username) {
      var tweetArray = streams.users[username];
    } else {
      var tweetArray = streams.home;
    }

    var index = tweetArray.length - 1;

    while(index >= 0){
      var tweet = tweetArray[index];
      var $tweet = $('<div class="tweet"></div>');

      //Declaring all components of Tweet variables
      var $profile = $('<img class= "profile-photo" src="./assets/img/' + tweet.user + '.png"></img>');
      var $username = $('<div class= "username"></div>');
      var $message = $('<p class= "message"></p>');
      var $timestamp = $('<div class= "timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class= "icon comment fas fa-comment-alt"></i>');
      var $retweet = $('<i class= "icon retweet fas fa-retweet"></i>');
      var $like = $('<i class= "icon like fas fa-heart"></i>');
      var $share = $('<i class= "icon share fas fa-share"></i>');

      //Formating each element to fit requirement
      $message.text(tweet.message);
      $username.text('@' + tweet.user);
      $profile.attr(tweet.user);

      //Appending all elements to each Tweet
      $tweet.append($username);
      $tweet.append($profile);
      $tweet.append($message);
      $tweet.append($timestamp);
      $tweet.append($comment);
      $tweet.append($retweet);
      $tweet.append($like);
      $tweet.append($share);

      //Adding all Tweets to Home Feed
      $tweet.appendTo($homeFeed);
      index -= 1;

      $username.on('click', handleUsernameClick);
    }
  };

  renderFeed();


//Creates event listeners functions
$updateFeedButton.on('click', function () {
  $updateFeedButton.text() === "Back" ? $updateFeedButton.text('Update Feed') : null;
  renderFeed();
});


//Append new HTML elements to the DOM
$title.appendTo($app);
$updateFeedButton.appendTo($app);
$homeFeed.appendTo($app);





});