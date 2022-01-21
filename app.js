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
  var $friendsHeader = $('<h3 class="friends-header">Friends List:</h3>');
  var $friendsList = $('<ul class="friends-list"></ul>');



  //Create event handler functions
  var renderFeed = function(user) {
    $feed.html('');
    var stream;

    //check if the passed in user parameter is stored already
    window.users.includes(user) ? stream = streams.users[user] : stream = streams.home;

    var index = stream.length - 1;
    while(index >= 0){
      //alias the current tweet
      var tweet = stream[index];

      //create new elements for tweet component

      // TWEET FORMAT:
      /*
        Tweet Container
        - tweetMain (top 90%)
          -tweetPhoto
            -img
          -tweetMessage
            -username
            -message
        - tweetInfo (bottom 10%)
          -icons (flex-start)
          -timestamp (flex-end)
      */

      var $tweet = $('<div class="tweet"></div>');
      var $tweetProfilePhoto = $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '" alt="profile photo">');
      var $tweetUserName = $('<span class="username">' + '@' + tweet.user + '</span>');
      var $tweetMessage = $('<p class="message">' + tweet.message + '</p>');
      var $tweetTimeStamp = $('<span class="timestamp">' + $.timeago(tweet.created_at) + '</span>');
      var $tweetIconContainer = $('<div class="icon-container"></div>');
      var $tweetIconComment = $('<i class="icon comment fas fa-comments"></i>');
      var $tweetIconRetweet = $('<i class="icon retweet fas fa-retweet"></i>');
      var $tweetIconLike = $('<i class="icon like far fa-heart"></i>');
      var $tweetIconShare = $('<i class="icon share fas fa-share"></i>');



      //give the username a click listener
      $tweetUserName.on('click', handleUsernameClick);

      //construct the container of tweetIcons
      $tweetIconContainer.append(
        $tweetIconLike,
        $tweetIconComment,
        $tweetIconRetweet,
        $tweetIconShare);

      //construct a tweet
      $tweet.append(
        $tweetProfilePhoto,
        $tweetUserName,
        $tweetMessage,
        $tweetTimeStamp,
        $tweetIconContainer
        );

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

  //Set up event listeners
  $updateFeedBtn.on('click', function() {
    if($updateFeedBtn.text() === 'Back') {
      $updateFeedBtn.text('Update Feed');
    }

    renderFeed();
  });


  //Append new HTML elements to the DOM
  $header.appendTo($app);
  $title.appendTo($header);
  $main.appendTo($app);
  $main.append($sidebar, $feed);
  $friendsContainer.append($friendsHeader, $friendsList);
  $sidebar.append($updateFeedBtn, $friendsContainer);


  //On load invocations
  renderFeed();
});