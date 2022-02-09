$(document).ready(function(){
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updatebutton = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $tweet = $('<div class="tweet"></div>');
  var $profilephoto = $('<img class="profile-photo" src="" alt="Profile Photo">');
  var $username = $('<span class="username"></span>');
  var $message = $('<p class="message"></p>');
  var $timestamp = $('<span class="timestamp"></span>');
  var $commenticon = $('<i class="icon comment fa-solid fa-comment"></i>');
  var $retweeticon = $('<i class="icon retweet fa-solid fa-retweet"></i>');
  var $likeicon = $('<i class="icon like fa-solid fa-heart"></i>');
  var $shareicon = $('<i class="icon share fa-solid fa-share"></i>');

  // Create event handler functions
  function renderFeed(user) {
    var path;
    if (user) {
      path = streams.users[user];
    } else {
      path = streams.home;
    }
    var index = path.length - 1;
    while(index >= 0){
      var tweet = path[index];
      $tweet = $('<div class="tweet"></div>');
      $profilephoto = $('<img class="profile-photo" src="./assets/img/' + tweet.user + '.png" alt="Profile Photo">');
      $username = $('<span class="username">@' + tweet.user + '</span>');
      $message = $('<p class="message">' + tweet.message + '</p>');
      $timestamp = $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>');
      $commenticon = $('<i class="icon comment fa-solid fa-comment"></i>');
      $retweeticon = $('<i class="icon retweet fa-solid fa-retweet"></i>');
      $likeicon = $('<i class="icon like fa-solid fa-heart"></i>');
      $shareicon = $('<i class="icon share fa-solid fa-share"></i>');

      $profilephoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $commenticon.appendTo($tweet);
      $retweeticon.appendTo($tweet);
      $likeicon.appendTo($tweet);
      $shareicon.appendTo($tweet);
      $tweet.appendTo($feed);
      $feed.appendTo($app);
      index -= 1;
    }
  };

  function handleUsernameClick(name) {
    if (window.users.includes(name)) {
      $("#update-feed").html("Back");
      renderFeed(name);
    } else {
      renderFeed();
    }
  }

  // Set event listeners (providing appropriate handlers as input)
  $feed.on("click", function(event) {
    console.log(event);
    var target = event.target.innerText.slice(1);
    $feed.html('');
    handleUsernameClick(target);
  })

  $updatebutton.on("click", function(event) {
    console.log(event);
    $feed.html('');
    $("#update-feed").html("Update Feed");
    renderFeed();
  });

  // Append new HTML elements to the DOM
  $app.html('');
  $title.appendTo($app);
  $updatebutton.appendTo($app);
  $feed.appendTo($app);

  // Need to render the feed to initially display
  renderFeed();

  window.isItBeautifulYet = true;

});