"use strict"
$(document).ready(function(){

  // SELECT ALREADY EXISTING ELEMENTS
  var $app = $('#app');

  // CREATE NEW HTML ELEMENTS
  var $twiddlerIcon = $('<i class="fas fa-user-astronaut" id="twiddlerIcon"></i>');
  var $title = $('<h1 id="header">Twiddler</h1>');
  var $subtitle = $('<h2 id="subtitle">Where the twiddlers be twiddlin\'</h2>');
  var $feed = $('<section class="container" id="feed"></section>');
  var $updateFeedButton = $('<button id="update-feed" class="button container">Update Feed</button>');
  var $friendsList = $('<ul class="container" id="friends-list"></ul>');
  var $newTweetForm = $('<form onsubmit="return false" class="container" id="new-tweet-form"></form>').append(
    $('<h3/>').text("Make a tweet!"),
    $('<label/ for="formUsername">').text("Username"),
    $('<input/ id="formUsername" name="username" type="text" class="form">'),
    $('<label/ for="formMessage">').text("Tweet"),
    $('<input/ name="message" type="text" class="form" id="formMessage">')
  );
  var $submitButton = $('<button id="makeTweet" class="button container">Post Tweet</button>')
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
      var $tweetHeader = $('<div class="header" id=tweetHeader></div>');
      var $tweetFooter = $('<div class="footer" id="tweetFooter"></div>');

      var $profilePhoto = $('<img class="profile-photo"></img>');
      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $profilePhoto.appendTo($tweetHeader);

      var $username = $('<div class="username"></div>');
      $username.text(`@${tweet.user}`);
      $username.appendTo($tweetHeader);

      var $message = $('<div class="message"></div>');
      $message.text(`${tweet.message}`);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var $comment = $('<i class="fas fa-comments fa-lg icon comment"></i>');
      var $like = $('<i class="fas fa-thumbs-up fa-lg icon like"></i>');
      var $share = $('<i class="fas fa-share fa-lg icon share"></i>');
      var $retweet = $('<i class="fas fa-retweet fa-lg icon retweet"></i>');
      $like.appendTo($tweetFooter);
      $comment.appendTo($tweetFooter);
      $retweet.appendTo($tweetFooter);
      $share.appendTo($tweetFooter);
      $timestamp.appendTo($tweetFooter);

      // todo: bind event listeners for renderfeed's lexical scope? place with other event listeners; syntax is confusing
      $('.icon').hover(hoverEnter, hoverExit);
      $username.hover(hoverEnter, hoverExit);
      $username.click(handleUsernameClick);

      $tweetHeader.appendTo($tweet);
      $message.appendTo($tweet);
      $tweetFooter.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }
  };

  var populatefriendsList = function() {
    $friendsList.empty();
    $('<h3 class="title"/>').text('Friends').appendTo($friendsList);
    for (var user in streams.users) {
      var $friend = $(`<li class="friend">@${user}</li>`);
      $friend.appendTo($friendsList);
    }
    // tode: same problem as with renderfeed/event listeners
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
  $title.on("click", handleTitleClick);
  $subtitle.on("click", handleTitleClick);
  $updateFeedButton.click(function() {
    renderFeed('home');
  });
  $submitButton.click(handleSubmitClick);

  // APPEND NEW HTML ELEMENTS TO THE DOM
  $twiddlerIcon.appendTo($app);
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $updateFeedButton.appendTo($app);
  $friendsList.appendTo($app);
  $newTweetForm.appendTo($app);
  $feed.appendTo($app);

  // POPULATE INITIAL PAGE
  populatefriendsList();
  renderFeed('home');

});

window.isItBeautifulYet = true;
