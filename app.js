$(document).ready(function(){
  //Select already existing elements
  var $app = $('#app');
  $app.html('');  //move?


  //Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $updateFeedBtn = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $header = $('<div class="header"></div>');
  var $main = $('<div class="main"></div>');
  var $sidebar = $('<div class="sidebar"></div');
  var $friendsContainer = $('<div class="friends-container"></div>');
  var $friendsHeader = $('<h3 class="friends-header">Friends List</h3>');
  var $friendsList = $('<ul id="friends-list"></ul>');

  //NEW TWEET FORM FORMAT:
  var $formContainer = $('<form id="new-tweet-form" class="form-container"></form>');
  var $formLeft = $('<div class="form-left"></div>');
  var $formPicture = $('<img class=form-image src="assets/img/bird.png" alt="new tweet image">');
  var $formRight = $('<div class="form-right"></div>');
  var $formUserLabel = $('<label for="name">Username</label>');
  var $formUserInput = $('<input type="text" class="user-input" id="name" name="username">');
  var $formMessageLabel = $('<label for="message">Message</label>');
  var $formMessageInput = $('<input type="text" class="message-input" id="name" name="message">');
  var $formSubmitBtn = $('<button class=form-submit>Send Twid</button>');

  $formContainer.append($formLeft, $formRight);
  $formLeft.append($formPicture);
  $formRight.append($formUserLabel, $formUserInput, $formMessageLabel, $formMessageInput, $formSubmitBtn);


  //Create event handler functions
  var populateFriendsList = function() {
    $friendsList.html('');
    window.users = Object.keys(streams.users);

    window.users.forEach(function(user) {
      var $currentLi = $('<li class="friend">' + '@' + user + '</li>');
      $currentLi.appendTo($friendsList);
    })
  }

  var renderFeed = function(user) {
    $feed.html('');
    var stream;

    //check if the passed in user parameter is stored already
    window.users.includes(user) ? stream = streams.users[user] : stream = streams.home;

    var index = stream.length - 1;
    while(index >= 0){
      //alias the current tweet
      var tweet = stream[index];


      // TWEET FORMAT:
      /*
      Tweet Container ($tweet with class .tweet)
      - tweetLeft ($tweetLeft with class .tweet-left)
      -img ($tweetProfilePhoto with class .profile-photo)
      - tweetRight ($tweetRight with class .tweet-right)
      -username
      -message
      -tweetInfo ($tweetInfo with class .tweet-info)
      -icon container ($tweetIconContainer with class .icon-container)
      -4 icons
      -timestamp ($tweetTimeStamp with class .timestamp)
      */

     //create new elements for tweet component
      var $tweet = $('<div class="tweet"></div>');

      var $tweetLeft = $('<div class="tweet-left"></div>');

      var tweetPictureUrl = tweet.profilePhotoURL || 'assets/img/visitor.png';

      var $tweetProfilePhoto = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '" alt="profile photo">');

      var $tweetRight = $('<div class="tweet-right"></div>');
      var $tweetUserName = $('<span class="username">' + '@' + tweet.user + '</span>');
      var $tweetMessage = $('<p class="message">' + tweet.message + '</p>');
      var $tweetInfo = $('<div class="tweet-info"></div>');
      var $tweetIconContainer = $('<div class="icon-container"></div>');
      var $tweetIconComment = $('<i class="icon comment fas fa-comments fa-sm"></i>');
      var $tweetIconRetweet = $('<i class="icon retweet fas fa-retweet fa-sm"></i>');
      var $tweetIconLike = $('<i class="icon like far fa-heart fa-sm"></i>');
      var $tweetIconShare = $('<i class="icon share fas fa-share fa-sm"></i>');
      var $tweetTimeStamp = $('<div class="timestamp">' + $.timeago(tweet.created_at) + '</div>');

      //give the username a click listener
      $tweetUserName.on('click', handleUsernameClick);

      //construct the container of tweetIcons
      $tweetIconContainer.append(
        $tweetIconComment,
        $tweetIconLike,
        $tweetIconRetweet,
        $tweetIconShare);

      //construct a tweet
      $tweet.append($tweetLeft, $tweetRight);
      $tweetLeft.append($tweetProfilePhoto);
      $tweetRight.append($tweetUserName, $tweetMessage, $tweetInfo);
      $tweetInfo.append($tweetIconContainer, $tweetTimeStamp);

      //add the tweet to the feed
      $tweet.appendTo($feed);
      index -= 1;
      }
  }

  var handleUsernameClick = function(e) {
    if($updateFeedBtn.text() === 'Update Feed') {
      $updateFeedBtn.text('Back');
    }

    //grab the text of the username element that was clicked, and remove the '@' symbol
    var user = $(e.target).text().slice(1);

    renderFeed(user);
  }

  var sendTwid = function(e) {
    e.preventDefault();
    var usernameInput = $formUserInput.val();
    var messageInput = $formMessageInput.val();

    $formUserInput.val('');
    $formMessageInput.val('');

    if (usernameInput[0] === '@') {
      usernameInput = usernameInput.slice(1);
    }

    writeTweet(messageInput);
    renderFeed();
    populateFriendsList();
    console.log(streams.users);
    console.log(window.users);
  }

  //Set up event listeners
  $updateFeedBtn.on('click', function() {
    if($updateFeedBtn.text() === 'Back') {
      $updateFeedBtn.text('Update Feed');
    }

    renderFeed();
  });

  $friendsList.on('click', "li", function(e) {
    var friendClicked = $(e.target).text().slice(1);

    if($updateFeedBtn.text() === 'Update Feed') {
      $updateFeedBtn.text('Back');
    }

    renderFeed(friendClicked);
  });

  $formSubmitBtn.on('click', sendTwid);


  //Append new HTML elements to the DOM
  $header.appendTo($app);
  $title.appendTo($header);
  $main.appendTo($app);
  $main.append($sidebar, $feed);
  $friendsContainer.append($friendsHeader, $friendsList);
  $sidebar.append($updateFeedBtn, $friendsContainer, $formContainer);


  //On load invocations
  renderFeed();
  populateFriendsList();

  window.isItBeautifulYet = true;
});