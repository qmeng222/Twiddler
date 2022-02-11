$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $header = $('<div class="header"></div>');
  var $title = $('<h1>Twiddler</h1>');
  var $updateBtn = $('<button id="update-feed">Update Feed</button>');
  $updateBtn.text('Update Feed');
  var $feed = $('<div id="feed"></div>');


  // Append new HTML elements to the DOM
  $header.appendTo($app);
  $title.appendTo($header);
  $updateBtn.appendTo($header);
  $feed.appendTo($app);
  $feed.addClass("container");



  // Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleRenderFeedClick = function(event) {
    if($updateBtn.text() === 'Back') {
      $updateBtn.text('Update Feed');
      event.preventDefault();
      renderFeed();
    }
    event.preventDefault();
    renderFeed();
  }

  var handleUsernameClick = function(event) {
    $updateBtn.text('Back');
    var user = $(this).text().slice(1);
    renderFeed(user);

  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", handleTitleClick);
  $updateBtn.on("click", handleRenderFeedClick);

  // Render Feed Fn loading tweets
  var renderFeed = function(user){
    $feed.html('');

    if (user) {
      var tweetStream = streams.users[user];
    } else {
      var tweetStream = streams.home;
    }


    var index = tweetStream.length - 1;
    while(index >= 0){

      var tweet = tweetStream[index];
      var $tweet = $('<div class="tweet"></div>');
      var $tweetTop = $('<div class="tweet-top" href="#"></div>');
      var $message = $('<div class="message" href="#"></div>');
      var $tweetTopUser = $('<div class="profile-user"></div>');
      var $userName = $('<div class="username"></div>');
      var $tweetBtn = $('<div class="btn" href="#"></div>');
      var $profilePhoto = $('<img class="profile-photo" src='+ tweet.profilePhotoURL +'>');
      var $timestamp = $('<time class="timeago timestamp"></time>');
      var $iconComment= $('<i class="icon comment fas fa-comment"></i>');
      var $iconRetweet= $('<i class="icon retweet fas fa-retweet"></i>');
      var $iconLike= $('<i class="icon like fas fa-heart"></i>');
      var $iconShare= $('<i class="icon share fas fa-share"></i>');

      $message.text(tweet.message);
      $userName.text('@' + tweet.user);
      $("time").attr( "datetime", tweet.created_at);
      $timestamp.text(tweet.created_at);
      $timestamp.text(jQuery.timeago(tweet.created_at));

      $userName.on("click", handleUsernameClick);

      // append elements to the DOM
      $tweetTopUser.append($profilePhoto);
      $tweetTopUser.append($userName);
      $tweetTop.append($tweetTopUser);
      $tweetTop.append($message);
      $tweetBtn.append($timestamp);
      $tweetBtn.append($iconComment);
      $tweetBtn.append($iconRetweet);
      $tweetBtn.append($iconLike);
      $tweetBtn.append($iconShare);
      $tweet.append($tweetTop);
      $tweet.append($tweetBtn);
      $tweet.appendTo($feed);
      index -= 1;
    }

  }


  renderFeed();


});

window.isItBeautifulYet = true