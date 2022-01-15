$(document).ready(function(){
  // Select already existing elements
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var currentIndex = streams.home.length;

  // Create new HTML elements
  $app.html('');
  var $title = $('<h1 class="title">Twiddler</h1>');
  var $button = $('<button id="update-feed"></button>');
  $button.text('Update Feed');
  var $tweetButton = $('<button id="tweetButton">Tweet</button>');
  var $feed = $('<div id=feed></div>');
  var $sideNavContainer = $('<div class="navbar"></div>');
  var $tweetFormContainer = $('<div class="tweetForm"></div>');



  // Create event handler functions
  function handleUsernameClick() {
    var userClicked = $(this)[0].innerText.substring(1);
    renderFeed(userClicked);
  }

  function renderFriends() {
    var $friendsDiv = $('<div class="friendsContainer"></div>')
    var $friendsUl = $('<ul id="friends-list"></ul>');
    var $friendsTitle = $('<h3 id="friendsTitle">Friends <i class="fas fa-user-friends"></i></h3>')
    var friendsList = Object.keys(streams.users);

    friendsList.forEach(function(friend) {
      var $friend = $('<li class="friend"></li>');
      $friend.text('@' + friend);
      $friend.appendTo($friendsUl);
    });

    $button.appendTo($sideNavContainer);
    $tweetButton.appendTo($sideNavContainer);
    $friendsTitle.appendTo($friendsDiv);
    $friendsUl.appendTo($friendsDiv);
    $friendsDiv.appendTo($sideNavContainer);


    $("#friends-list").find('li').each(function(i,li) {
      $(li).on('click', function() {
          var user = $(this).html().replace('@','');
          renderFeed(user);
      });
    });
  }

  function renderForm() {
    var $tweetForm = $('<form id="new-tweet-form"></form>');
    var $submitButton = $('<button id="submit" text="Submit">Submit</button>');

    $tweetForm
      .html(`
        <label for="username">Username:</label><br>
        <input type="text" name="username" id="username"><br>
        <label for="message">Write Your Message:</label><br>
        <input type="text" id="message" name="message"><br>
        `);

    $submitButton.on('click', function(event){
      event.preventDefault();

      //check if both username and message field is filled in

      var $usernameInput = $('#username').val().toLowerCase();
      var $messageInput = $('#message').val();
      if($usernameInput && $messageInput) {
        //if it is, push the following data to streams.home (array of objects)
        if (!$usernameInput.toLowerCase()) {
          throw new Error('set the global $usernameInput.toLowerCase() property!');
        }
        if (!streams.users[$usernameInput]) {
          streams.users[$usernameInput] = [];
        }
        var tweet = {};
        tweet.user = $usernameInput;
        tweet.message = $messageInput;
        tweet.created_at = new Date();
        tweet.profilePhotoURL = './assets/img/visitor.png';
        addTweet(tweet);

        // var newUserObj = {
        //   user: $usernameInput,
        //   message: $messageInput,
        //   created_at: new Date(),
        //   profilePhotoURL: "./assets/img/myUser.png",
        // }

        // window.streams.users[$usernameInput.toLowerCase()] === undefined ?
        //   window.streams.users[$usernameInput.toLowerCase()] = [] : window.streams.users[$usernameInput.toLowerCase()];
        // window.streams.users[$usernameInput.toLowerCase()].push(newUserObj);
        // streams.home.push(newUserObj);


        // addTweet(newUserObj);
        //update feed with new user info??

        console.log(window.streams.users)
        $tweetFormContainer.removeClass('focus');
        renderFeed();
      }
    });

    //append form to app
    $tweetForm.appendTo($tweetFormContainer);
    $submitButton.appendTo($tweetForm)
    $tweetFormContainer.appendTo($app);
  }

  function renderFeed(user) {
    typeof user !== 'string' ? user = null : user = user.toLowerCase();
    var newIndex = user ? streams.users[user].length -1 : newIndex = streams.home.length-1;
    var $users = streams.users;
    user ? $button.html('Back') : $button.html('Update Feed');
    $feed.html('');

    while(newIndex >= 0) {
      var tweet = user ? streams.users[user][newIndex] : streams.home[newIndex];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $('<img class="profile-photo" />');
      var $username = $('<span class="username"></span>');
      var $message = $('<div class="message"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $iconsContainer = $('<div class="iconsContainer"></div>');
      var $commentIcon = $('<i class="far fa-comment-alt fa-2x icon comment"></i>');
      var $retweetIcon = $('<i class="fas fa-retweet fa-2x icon retweet"></i>');
      var $likeIcon = $('<i class="far fa-thumbs-up fa-2x icon like"></i>');
      var $shareIcon = $('<i class="far fa-share-square fa-2x icon share"></i>');

      //event handlers
      $retweetIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);
      $commentIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);
      $likeIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);
      $shareIcon.on('mouseover', handleIconHover).on('mouseleave', handleIconHover);

      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $.each([$commentIcon, $retweetIcon, $likeIcon, $shareIcon], function(i, val) {
        val.appendTo($iconsContainer);
      });
      $.each([$profilePhoto, $username, $message, $timestamp, $iconsContainer],
        function(index,value) {
          value.appendTo($tweet);
      });
      $tweet.appendTo($feed);
      newIndex -= 1;
    }

      //Additional EventHandlers
      $($feed).find('.username').on('click', handleUsernameClick);
  }

  function handleIconHover() {
    $(this).toggleClass('highlight');
  }

  function showTweetForm() {
    $tweetFormContainer.addClass('focus');
  }

  // Set event listeners (providing appropriate handlers as input)
  $button.on('click', renderFeed);
  $tweetButton.on('click', showTweetForm);
  $(document).mouseup(function(e) {
    if($tweetFormContainer.hasClass('focus')) {
      if (!$tweetFormContainer.is(e.target) && $tweetFormContainer.has(e.target).length === 0){
        $tweetFormContainer.removeClass('focus');
      }
    }
  });


  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $sideNavContainer.appendTo($app);
  $feed.appendTo($app);

  renderFriends();
  renderForm();
  renderFeed();
});

window.isItBeautifulYet = true;