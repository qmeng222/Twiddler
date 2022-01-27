
$(document).ready(function() {

  $("time.timeago").timeago();

  // *** select already existing elements

  // *** create new HTML elements
  // ** container - app
  var $app = $('#app'); // creates a div of id app
  $('#app').addClass("container");
  $app.html(''); //  forces us ot use jquery and not hard code in html

  // first row - title
  var $titleRow = $('<div class="row"></div>');
  var $title = $('<h1 class="display-1">Twiddler</h1>');

  // second row - actual content
  var $contentRow = $('<div id="content-row" class="row"></div>');

  // inside content row there are 2 cols: aside and main
  var $aside = $('<div id="aside" class="col-4"></div>');
  var $main = $('<div id="main" class="col-8"></div>');

  // inside main, 2 rows: buttons and feed
  var $buttonsRow = $('<div id="buttons-row" class="row"></div');
  var $buttonsColHome = $('<div id="buttons-col-home" class="col"></div');
  var $buttonsColUpdate = $('<div id="buttons-col-update" class="col"></div');
  var $home = $('<button id="home" class="btn btn-light">Home</button>');
  var $updateFeed = $('<button id="update-feed" class="btn btn-light">Update Feed</button>');

  var $feed = $('<div id="feed" class="row" ></div>');

  // in aside, the new tweet form
  var $newTweetRow = $('<div class="row"></div');
  var $newTweetForm = $('<div id="new-tweet-form" class="form-group"></div>');
  var $labelUser = $('<span class="form-label">Username</span>');
  var $inputUser = $('<input type="text" class="form-control" placeholder="Username">');
  var $labelMessage = $('<span class="form-label">Message</span>');
  var $inputMessage = $('<input type="text" class="form-control" placeholder="Your message">');
  var $submitNewTweet = $('<button type="submit" class="btn btn-light">Submit</button>');

  // in aside, the friends list
  var $friendsList = $('<div id="friends-list" class="row">Friends List</div>');


  // *** create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  }

  var handleUsernameClick = function(event){
    // toggles button text 'Update Feed' to 'Back'
    $updateFeed.text('Back');
    var nameClicked = $(this).text().slice(1);
    // console.log('inside handle - name:', nameClicked);
    // re-renders the Feed with only the clicked user's tweet
    renderFeed(event, nameClicked);
  }

  // generates tweets feed
  var renderFeed = function(event, user) {

    // remove all previously existing Tweets from the Feed
    $feed.html('');

    // if no user is passed
    if(user === undefined){
      var index = streams.home.length - 1; // index of last tweet
      $updateFeed.text('Update Feed');
    } else {
      var index = streams.users[user].length - 1;
    }
    // For each Tweet object in the stream array (in reverse order)
    while(index >= 0){

      var tweet;
      if(user === undefined){
        tweet = streams.home[index];
      } else {
        tweet = streams.users[user][index];
      }

      // Create a new Tweet UI component
      var $tweet = $('<div class="tweet row"></div>');
      var $tweetcolPic = $('<div class="col-2"></div>');
      var $tweetcolData = $('<div class="col-10"></div>');

      var $messageRow = $('<div class="row"></div>');
      var $iconsRow = $('<div class="row"></div>');
      var $commentCol = $('<div class="col"></div>');
      var $retweetCol = $('<div class="col"></div>');
      var $likeCol = $('<div class="col"></div>');
      var $shareCol = $('<div class="col"></div>');

      // inside each Tweet, we add ui comps for photo, user, message, timestamp and 4 icons
      var $profilePhoto = $('<img class="profile-photo" src=' + '"' + tweet.profilePhotoURL + '" >');

      var $username = $('<div class="username col-sm-6 col-sm-6"></div>');
      $username.text('@' + tweet.user);

      var $message = $('<div class="message lead"></div>');
      $message.text(tweet.message);

      var $timestamp = $('<div class="timestamp col-sm-6 col-sm-6"></div>');
      var formattedDate = $.timeago(tweet.created_at);
      $timestamp.text(formattedDate);

      var $userTimeRow = $('<div id="user-time-row" class="row"></div>');

      var $comment = $('<i class="icon comment fas fa-solid fa-comment col-sm-2 col-sm-2" ></i>');
      var $retweet = $('<i class="icon retweet fas fa-solid fa-retweet col-sm-2 col-sm-2" ></i>');
      var $like =    $('<i class="icon like    fas fa-solid fa-heart col-sm-2 col-sm-2"   ></i>');
      var $share =   $('<i class="icon share   fas fa-solid fa-share col-sm-2 col-sm-2"   ></i>');

      // Append the new Tweet UI component to the Feed
      $tweet.appendTo($feed);
      // Append all other components to a $tweet (div class tweet)
      $tweetcolPic.appendTo($tweet);
      $tweetcolData.appendTo($tweet);
      $userTimeRow.appendTo($tweetcolData);
      $messageRow.appendTo($tweetcolData);
      $iconsRow.appendTo($tweetcolData);

      $profilePhoto.appendTo($tweetcolPic);
      $username.appendTo($userTimeRow);
      $timestamp.appendTo($userTimeRow);

      $message.appendTo($messageRow);

      $comment.appendTo($iconsRow);
      $retweet.appendTo($iconsRow);
      $like.appendTo($iconsRow);
      $share.appendTo($iconsRow);


      index -= 1;
    }
  }

  // populates friends list
  var populateFriendsList = function() {
    var $list = $('<ul></ul>');
    for (var i = 0; i < window.users.length; i++) {
      var friend = window.users[i];
      // console.log(friend);
      var $friend = $('<li class="friend">@' + friend + '</li>');
      $friend.appendTo($list)
    }
    $list.appendTo($friendsList);
    // console.log(window.users);
  }

  populateFriendsList();

  // *** set event listeners (providing appropriate handlers and input)
  renderFeed(); // updates the feed as soon as DOM is ready
  $title.on("click", handleTitleClick);
  $updateFeed.on("click", renderFeed);

  // *** Append new HTML elements to the DOM
  // first row
  $titleRow.appendTo($app);
  $title.appendTo($titleRow);

  // second row
  $contentRow.appendTo($app);


  //  aside, new tweet form and friends list
  $aside.appendTo($contentRow);

  $newTweetRow.appendTo($aside);
  $newTweetForm.appendTo($newTweetRow);
  $labelUser.appendTo($newTweetForm);
  $inputUser.appendTo($newTweetForm);
  $labelMessage.appendTo($newTweetForm);
  $inputMessage.appendTo($newTweetForm);
  $submitNewTweet.appendTo($newTweetForm);

  $friendsList.appendTo($aside);

 // main
 $main.appendTo($contentRow);
 $buttonsRow.appendTo($main);
 $buttonsColHome.appendTo($buttonsRow);
 $buttonsColUpdate.appendTo($buttonsRow)
 $updateFeed.appendTo($buttonsColUpdate);
 $home.appendTo($buttonsColHome);
 $feed.appendTo($main);

  // this is running automatically, not only when clicked
  $(document).on('click','.username', handleUsernameClick);

  renderFeed();

  window.isItBeautifulYet = true;






// *** document ready closing
});