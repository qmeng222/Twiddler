"use strict"
$(document).ready(function(){

  // SELECT ALREADY EXISTING ELEMENTS
  var $app = $('#app');
  $app.html('');

  // CREATE NEW HTML ELEMENTS
  var $title = $('<h1>SomeName</h1>');
  var $subtitle = $('<h2>This is a Subtitle</h2>');
  var $feed = $('<section class="container" id="feed"></section>');
  var $updateFeedButton = $('<button id="update-feed" class="button">Update Feed</button>');

  // CREATE EVENT HANDLER FUNCTIONS
  var renderFeed = function() {
    $feed.empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');

      var $profilePhoto = $('<img class="profile-photo"></img>')
      $profilePhoto.attr('src', tweet.profilePhotoURL);

      var $username = $('<div class="username"></div>');
      $username.text(`@${tweet.user}:`);

      var $message = $('<div class="message"></div>');
      $message.text(`${tweet.message}`);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));

      var $comment = $('<i class="fas fa-comments fa-lg icon comment"></i>');
      var $like = $('<i class="fas fa-thumbs-up fa-lg icon like"></i>');
      var $share = $('<i class="fas fa-share fa-lg icon share"></i>');
      var $retweet = $('<i class="fas fa-retweet fa-lg icon retweet"></i>');

      // todo: refactor icon hover listener for renderfeed's lexical scope. syntax is confusing
      $(".icon").hover(hoverEnter, hoverExit);

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
  var handleTitleClick = function(event) {
    console.log(event);
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert(`The ${titleType} of this page is: ${event.target.innerText}`);
  };
  var hoverEnter = function(event) {
      $(this).css('color', '#4CD2FA');
  };
  var hoverExit = function(event) {
    $(this).css('color', 'black')
  }


  // SET EVENT LISTNERS
  $title.on("click", handleTitleClick);
  $subtitle.on("click", handleTitleClick);
  $updateFeedButton.on("click", renderFeed);




  // APPEND NEW HTML ELEMENTS TO THE DOM
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feed.appendTo($app);
  renderFeed();

});