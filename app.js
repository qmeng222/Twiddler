$(document).ready(function(){

  //select already existing elements
  var $app = $('#app');
  $app.html('');

  //create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedButton = $('<button id="update-feed">Update Feed</button>');
  var $feedSection = $('<div id="feed">');
  //event handler functions

   var renderFeed = function() {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<div class="username"></div>');
      var $message = $('<div class="message"></div>');
      var $timeStamp = $('<div class="timestamp"></div>');
      var url = 'assets/img/' + tweet.user + '.png';
      var $image = $(`<img src=${url} class="profile-photo">`);
      var $commentIcon = $(`<i class="comment far fa-comment"></i>`);
      var $retweetIcon = $(`<i class="retweet fas fa-retweet"></i>`);
      var $likeIcon = $(`<i class="like far fa-thumbs-up"></i>`);
      var $shareIcon = $(`<i class="share fas fa-share"></i>`);
      //image, user, message, timestamp
      $image.appendTo($tweet);
      $user.text('@' + tweet.user);
      $user.addClass(tweet.user);
      $message.text(tweet.message);
      $timeStamp.text(jQuery.timeago(tweet.created_at));
      $user.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      //icons
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);
      $tweet.appendTo($feedSection);
      index -= 1;
    }
  }

  var renderSpecificUser = function(user, userToMatch) {
    $('.tweet').empty();
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      if(user === userToMatch) {
      var $user = $('<div class="username"></div>');
      var $message = $('<div class="message"></div>');
      var $timeStamp = $('<div class="timestamp"></div>');
      var url = 'assets/img/' + user + '.png';
      var $image = $(`<img src=${url} class="profile-photo">`);
      var $commentIcon = $(`<i class="comment far fa-comment"></i>`);
      var $retweetIcon = $(`<i class="retweet fas fa-retweet"></i>`);
      var $likeIcon = $(`<i class="like far fa-thumbs-up"></i>`);
      var $shareIcon = $(`<i class="share fas fa-share"></i>`);
      //image, user, message, timestamp
      $image.appendTo($tweet);
      $user.text('@' + user);
      $message.text(tweet.message);
      $timeStamp.text(jQuery.timeago(tweet.created_at));
      $user.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      //icons
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);
      $tweet.appendTo($feedSection);
      }
      index -= 1;
    }
    $updateFeedButton.text('Back');
  }

  jQuery("time.timeago").timeago();


  //init
  renderFeed();

  //event handlers
  $updateFeedButton.on('click', function(){
    $('.tweet').remove();
    renderFeed();
  });

  $updateFeedButton.on('click', function(){
    $(this).text($(this).text() == 'Back' ? 'Update Feed' : 'Update Feed');
  });

  //event handlers to filter posts via user

  $(document).on('click', '.shawndrost', function(e){
      renderSpecificUser(e.target.innerHTML.substr(1), 'shawndrost')
  })

  $(document).on('click', '.douglascalhoun', function(e){
    renderSpecificUser(e.target.innerHTML.substr(1), 'douglascalhoun')
  })


  $(document).on('click', '.mracus', function(e){
    renderSpecificUser(e.target.innerHTML.substr(1), 'mracus')
  })

  $(document).on('click', '.sharksforcheap', function(e){
    renderSpecificUser(e.target.innerHTML.substr(1), 'sharksforcheap')
  })

  //append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($app);
  $feedSection.appendTo($app);
});

window.isItBeautifulYet = true;