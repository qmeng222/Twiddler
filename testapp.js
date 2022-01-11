"use strict"
$(document).ready(function(){

  // SELECT ALREADY EXISTING ELEMENTS
  var $app = $('#app');
  $app.html('');

  // CREATE NEW HTML ELEMENTS
  var $header = $('<section class="container" id="header"></section').append(
    $('<h1/>').text("Twiddler"),
    $('<h2/>').text("Where the twiddlers be twiddlin\'")
  );


  //var $subtitle = $('<h2>Where the twiddlers be twiddlin\'</h2>');

  var $feed = $('<section class="container" id="feed"></section>');
  var $updateFeedButton = $('<button id="update-feed" class="button">Update Feed</button>');
  var $friendsList = $('<section class="container" id="friendsList"></section');
  var $newTweetForm = $('<section class="container" id="newTweetForm"></section').append(
    $('<h3/>').text("Make a tweet!"),
    $('<p/>').text("Username"),
    $('<form onsubmit="return false"></form>').append($('<input/ type="text" class="form" id="formUsername" >')),
    $('<p/>').text("Tweet"),
    $('<form onsubmit="return false"></form>').append($('<input/ type="text" class="form" id="formMessage">'))
  );
  // figure out how to bind event listner to a child element
  var $submitButton = $('<button id="makeTweet" class="button">Post Tweet</button>')
  $submitButton.appendTo($newTweetForm);

  // CREATE EVENT HANDLER FUNCTIONS
  var renderFeed = function(whichFeed, user) {
    $feed.empty();
    $updateFeedButton.text(user ? 'Back' : 'Update Feed');
    var specificStream = user ? streams[whichFeed][user] : streams[whichFeed];
    var index = specificStream.length - 1;
    while(index >= 0){
      var tweet = specificStream[index];
      var $tweet = $('<div class="tweet container"></div>');

      var $profilePhoto = $('<img class="profile-photo"></img>')
      $profilePhoto.attr('src', tweet.profilePhotoURL);

      var $username = $('<div class="username"></div>');
      $username.text(`@${tweet.user}`);

      var $message = $('<div class="message"></div>');
      $message.text(`${tweet.message}`);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var $comment = $('<i class="fas fa-comments fa-lg icon comment"></i>');
      var $like = $('<i class="fas fa-thumbs-up fa-lg icon like"></i>');
      var $share = $('<i class="fas fa-share fa-lg icon share"></i>');
      var $retweet = $('<i class="fas fa-retweet fa-lg icon retweet"></i>');

      // todo: bind event listeners for renderfeed's lexical scope and place with other eventlisteners; syntax is confusing
      $('.icon').hover(hoverEnter, hoverExit);
      $username.hover(hoverEnter, hoverExit);
      $username.click(handleUsernameClick);

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $like.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $share.appendTo($tweet);

      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  var populatefriendsList = function() {
    $friendsList.empty();
    $('<h3/>').text('Friends').appendTo($friendsList);
    for (var user in streams.users) {
      var $friend = $(`<ul class="friend">@${user}</ul>`);
      $friend.appendTo($friendsList);
    }
    // tode: same problem as with renderfeed
    $('.friend').hover(hoverEnter, hoverExit);
    $('.friend').click(handleUsernameClick);
  };

  var handleTitleClick = function(event) {
    console.log(event);
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert(`The ${titleType} of this page is: ${event.target.innerText}`);
  };

  var handleUsernameClick = function() {
    var clickName = $(this).text().slice(1);
    renderFeed('users', clickName);
  };

  var createNewTweet = function (user, message) {
    var tweet = {};
    tweet.user = user;
    tweet.message = message;
    tweet.created_at = new Date();
    tweet.profilePhotoURL = './assets/img/visitor.png';
    return tweet;
  };

  var handleSubmitClick = function () {
    var user = $('#formUsername').val();
    var message = $('#formMessage').val();
    var isNewUser = streams.users[user] ? false : true;
    var tweet = createNewTweet(user, message);
    addTweet(tweet);
    if (isNewUser) {
      populatefriendsList();
    }
    renderFeed('home');
  };

  var hoverEnter = function(event) {
      $(this).css('color', '#4CD2FA');
  };
  var hoverExit = function(event) {
    $(this).css('color', 'black')
  };

  // SET EVENT LISTNERS
  //$title.on("click", handleTitleClick);
  $subtitle.on("click", handleTitleClick);
  $updateFeedButton.click(function() {
    renderFeed('home');
  });
  $submitButton.click(handleSubmitClick);

  // APPEND NEW HTML ELEMENTS TO THE DOM
  //$title.appendTo($app);
  //$subtitle.appendTo($app);
  $header.appendto($app);
  $updateFeedButton.appendTo($app);
  $friendsList.appendTo($app);
  $newTweetForm.appendTo($app);
  $feed.appendTo($app);

  // POPULATE INITIAL PAGE
  populatefriendsList();
  renderFeed('home');


});