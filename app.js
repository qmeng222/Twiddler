$(document).ready(function(){
  //select already existing elements
  var $app = $('#app');
  $app.html('');


  //create new HTML elements
  var $title = $('<div class="twiddler-section"><h1>twiddler</h1></div>');
  var $updateFeedButton = $('<button id="update-feed">update feed</button>');
  var $feedSection = $('<div id="feed"></div>');
  var $addTweetButton = $('<button id="submit-tweet">submit</button>');
  var $newMessage = $('<input name="message" id="message"></input>');
  var $newUser = $('<input name="username" id="username">');
  //event handler functions

   var renderFeed = function() {
     //tweets on main page
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

  var renderFriendList = function() {
    var $friendListSection = $('<div class="friend-section"></div>')
    var $friendList = $('<ul id="friends-list"><p class="friend-title">friends list</p></ul>');
    var $shawndrost = $('<li class="friend">@shawndrost</li>');
    var $sharksforcheap = $('<li class="friend">@sharksforcheap</li>');
    var $douglascalhoun = $('<li class="friend">@douglascalhoun</li>');
    var $mracus = $('<li class="friend">@mracus</li>');
    $shawndrost.appendTo($friendList);
    $douglascalhoun.appendTo($friendList);
    $sharksforcheap.appendTo($friendList);
    $mracus.appendTo($friendList);
    $friendList.appendTo($friendListSection);
    $friendListSection.appendTo($title);
  }

  var renderTweetForm = function() {
    var $addTweetForm = $('<form id="new-tweet-form"></form>');
    var $newUserTitle = $('<label for="username" id="username-title">username:</label>')

    var $newMessageLabel = $('<label for="message" id="message">message:</label>')

    $newUserTitle.appendTo($addTweetForm);
    $newUser.appendTo($addTweetForm);
    $newMessageLabel.appendTo($addTweetForm);
    $newMessage.appendTo($addTweetForm);
    $addTweetButton.appendTo($addTweetForm);
    $addTweetForm.appendTo($title);
  }

  var renderSpecificUser = function(user, userToMatch) {
    $('.tweet').remove();
    streams.home.forEach(user => {
      if(user.user === userToMatch) {
        var $tweet = $('<div class="tweet"></div>');
        var $user = $('<div class="username"></div>');
        var $message = $('<div class="message"></div>');
        var $timeStamp = $('<div class="timestamp"></div>');
        var url = 'assets/img/' + user + '.png';
        if(user !== 'shawndrost' && user !== 'sharksforcheap' && user !== 'douglascalhoun' && user !== 'mracus') {
          url = 'assets/img/visitor.png';
        }
        var $image = $(`<img src=${url} class="profile-photo">`);
        var $commentIcon = $(`<i class="comment far fa-comment"></i>`);
        var $retweetIcon = $(`<i class="retweet fas fa-retweet"></i>`);
        var $likeIcon = $(`<i class="like far fa-thumbs-up"></i>`);
        var $shareIcon = $(`<i class="share fas fa-share"></i>`);
        //image, user, message, timestamp
        $image.appendTo($tweet);
        $user.text('@' + user.user);
        $message.text(user.message);
        $timeStamp.text(jQuery.timeago(user.created_at));
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
      $updateFeedButton.text('Back');


    })

  }

  jQuery("time.timeago").timeago();

  //event handlers
  $updateFeedButton.on('click', function(){
    $('.tweet').remove();
    renderFeed();
  });

  $updateFeedButton.on('click', function(e){
    e.preventDefault()
    $(this).text($(this).text() == 'Back' ? 'Update Feed' : 'Update Feed');
  });

  //event handlers to filter posts via user

  $(document).on('click', '.username', function(e) {
    streams.home.forEach(user => {
      if(user.user === e.target.innerHTML.substr(1)) {
        renderSpecificUser(user.user, e.target.innerHTML.substr(1));
      }
    })
  })

  $(document).on('click', '.friend', function(e) {
    streams.home.forEach(user => {
      if(user.user === e.target.innerHTML.substr(1)) {
        renderSpecificUser(user.user, e.target.innerHTML.substr(1));
      }
    })
  })

  $($addTweetButton).on('click', function(e) {
    e.preventDefault();
    console.log(streams.users)

    var visitor = {}
    visitor.user = $newUser.val()
    visitor.message = $newMessage.val()
    visitor.created_at = new Date()
    visitor.profilePhotoURL = './assets/img/visitor.png'
    if (!streams.users[visitor.user]) {
      streams.users[visitor.user] = [];
    }
    streams.users[visitor.user].push(visitor);
    streams.home.push(visitor);

    streams.home.forEach(user => {
      if(user.user === visitor.user) {
        var $tweet = $('<div class="tweet"></div>');
        var $user = $('<div class="username"></div>');
        var $message = $('<div class="message"></div>');
        var $timeStamp = $('<div class="timestamp"></div>');
        var $image = $(`<img src="assets/img/visitor.png"class="profile-photo">`);
        var $commentIcon = $(`<i class="comment far fa-comment"></i>`);
        var $retweetIcon = $(`<i class="retweet fas fa-retweet"></i>`);
        var $likeIcon = $(`<i class="like far fa-thumbs-up"></i>`);
        var $shareIcon = $(`<i class="share fas fa-share"></i>`);
        //image, user, message, timestamp
        $image.appendTo($tweet);
        $user.text('@' + user.user);
        $message.text(user.message);
        $timeStamp.text(jQuery.timeago(user.created_at));
        $user.appendTo($tweet);
        $user.addClass(user.user);
        $message.appendTo($tweet);
        $timeStamp.appendTo($tweet);
        //icons
        $commentIcon.appendTo($tweet);
        $retweetIcon.appendTo($tweet);
        $likeIcon.appendTo($tweet);
        $shareIcon.appendTo($tweet);
        $tweet.prependTo($feedSection);
      }
    })
  })

  //append new HTML elements to the DOM
  $title.appendTo($app);
  $updateFeedButton.appendTo($title);
  $feedSection.appendTo($app);

   //init
   renderTweetForm();
   renderFriendList();
   renderFeed();
});

window.isItBeautifulYet = true;