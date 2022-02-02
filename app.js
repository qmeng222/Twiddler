$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  /*****************************************************************************
  * CREATE NEW HTML ELEMENTS
  *****************************************************************************/
  // Header
  var $header = $('<header></header>');
  var $logo = $('<div id="logo">Logo will go here</div>');
  // Main Container
  var $mainContainer = $('<main></main>');
  // Sidebar
  var $sidebar = $('<div id="sidebar"></div>');
  // Friends list
  var $friendsListHeader = $('<h1>Friends List:</h1>');
  var $friendsList = $('<ul id="friends-list"></ul>');
  // Tweet Container
  var $tweetContainer = $('<div id="tweet-container"></div>');
  // Update Feed Button
  var $updateFeedButton = $('<button id="update-feed"></button>');
  $updateFeedButton.text('Update Feed');
  // Feed
  var $feed = $('<div id="feed"></div>');

  /*****************************************************************************
  ** CREATE EVENT HANDLER FUNCTIONS
  *****************************************************************************/
  // When user clicks 'Update Feed'/'Back' button:
  var handleUpdateClick = function() {
    $("#feed").empty();
    renderFeed();
  };
  // When user clicks on a @username:
  var handleUsernameClick = function(e) {
    $("#feed").empty();
    var username = e.target.innerText.slice(1); // strips leading '@'
    renderFeed(username);
  }
  // Render feed:
  var renderFeed = function(username) {
    var stream = username ? streams.users[username] : streams.home;
    for (var index = stream.length - 1; index >= 0; index--) {
      var tweet = stream[index];
      var $tweet = newTweetComponent(tweet);
      $tweet.appendTo($feed);
    }
    $updateFeedButton.text(username ? 'Back' : 'Update Feed');
  };

  /*****************************************************************************
  * SET EVENT LISTENERS
  *****************************************************************************/
  // When user clicks 'Update Feed' button:
  $updateFeedButton.on('click', handleUpdateClick);

  /*****************************************************************************
  * APPEND NEW HTML ELEMENTS TO THE DOM
  *****************************************************************************/
  // Header
  $header.appendTo($app);
  $logo.appendTo($header);
  // Main Container
  $mainContainer.appendTo($app);
  // Sidebar
  $sidebar.appendTo($mainContainer);
  // Friends List
  $friendsListHeader.appendTo($sidebar);
  $friendsList.appendTo($sidebar);
  for (var user in streams.users) {
    var $listElement = $('<li></li>');
    $listElement.text('@' + user);
    $listElement.appendTo($friendsList);
    $listElement.on('click', handleUsernameClick);
  }
  // Tweet Container
  $tweetContainer.appendTo($mainContainer);
  // Update Feed Button
  $updateFeedButton.appendTo($tweetContainer);
  // Feed
  $feed.appendTo($tweetContainer);

  /*****************************************************************************
  ** CREATE COMPONENT GENERATING FUNCTIONS
  *****************************************************************************/
  // Tweet component
  var newTweetComponent = function(tweet) {
    // Tweet container: contains header, body, footer
    var $tweet = $('<div class="tweet"></div>');
    // Tweet Header: contains avatar, @username, timestamp
    var $tweetHeader = $('<div class="tweet-header"></div>');
    $tweetHeader.appendTo($tweet);
    var $avatar = $('<img class="profile-photo" />');
    $avatar.attr('src', tweet.profilePhotoURL);
    $avatar.appendTo($tweetHeader);
    var $tweetUser = $('<div class="username"></div>');
    $tweetUser.text('@' + tweet.user);
    $tweetUser.appendTo($tweetHeader);
    $tweetUser.on('click', handleUsernameClick);
    var $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $timestamp.appendTo($tweetHeader);
    // Tweet Body: contains message
    var $tweetBody = $('<div class="tweet-body"></div>');
    $tweetBody.appendTo($tweet);
    var $message = $('<div class="message"></div>');
    $message.text(tweet.message);
    $message.appendTo($tweetBody);
    // Tweet Footer: contains a bunch of icons
    var $tweetFooter = $('<div class="tweet-footer"></div>');
    $tweetFooter.appendTo($tweet);
    var $commentIcon = $('<div class="icon"><i class="comment fas fa-comment"></i></div>');
    var $retweetIcon = $('<div class="icon"><i class="retweet fas fa-retweet"></i></div>');
    var $likeIcon = $('<div class="icon"><i class="like fas fa-heart"></i></div>');
    var $shareIcon = $('<div class="icon"><i class="share fas fa-share"></i></div>');
    $commentIcon.appendTo($tweetFooter);
    $retweetIcon.appendTo($tweetFooter);
    $likeIcon.appendTo($tweetFooter);
    $shareIcon.appendTo($tweetFooter);

    // Return the tweet component just generated
    return $tweet;
  }

  // Render the home feed upon first page load
  renderFeed();

  // Complete the assignment:
  window.isItBeautifulYet = true;
});