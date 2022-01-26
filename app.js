$(document).ready(function(){

  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });

  // SELECT EXISTING ELEMENTS
  var $app = $('#app');
  $app.html('');

  // CREATE NEW HTML ELEMENTS AND GLOBAL VARIABLES
  var $title = $('<h1 class="primary-header">Twiddler</>');
  var $updateFeedBtn = $('<button type=button class="btn" id=update-feed>Update Feed</button>');
  var $container = $('<div class="flex-container"></div>');
  var $inputField = $('<div class="flex-item flex-1"></div>');
  var $inputNav = $('<div class="flex-2"></div>');
  var $feed = $('<div class="flex-item flex-3" id="feed"></div>');




  var renderFeed = function(user) {
    $feed.html('');
    if (user) {
      var userTweets = streams.users[user];
      var index = userTweets.length - 1;
    } else {
      index = streams.home.length - 1;
      userTweets = streams.home;
    }
    while(index >= 0){
      var tweet = userTweets[index];
      var tweetAuthor = user ? user : tweet.user;
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<div class="username">' + '@' + tweetAuthor + '</div>');
      var $pp = $('<img class="profile-photo" src="assets/img/' + tweetAuthor + '.png">');
      var $tweetMsg = $('<div class="message">' + tweet.message + '</div>');
      var $timeStamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<i class="far fa-comment comment"></i>');
      var $retweet = $('<i class="fas fa-retweet retweet"></i>');
      var $like = $('<i class="fas fa-thumbs-up like"></i>');
      var $share = $('<i class="fas fa-share share"></i>');

      var $tweetTop = $('<div class="flex-item flex-4"></div>');
      var $tweetInfo = $('<div class="flex-item flex-5"></div>');
      var $iconBox = $('<div class="flex-item flex-6"></div>');


      $tweetTop.appendTo($tweet);
      $pp.appendTo($tweetTop)
      $tweetMsg.appendTo($tweetTop)
      $username.appendTo($tweetInfo)
      $timeStamp.appendTo($tweetInfo);
      $comment.appendTo($iconBox);
      $retweet.appendTo($iconBox);
      $like.appendTo($iconBox);
      $share.appendTo($iconBox);
      $tweetTop.appendTo($tweet)
      $tweetInfo.appendTo($tweet);
      $iconBox.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    };

  }



  // CREATE EVENT HANDLER FUNCTIONS

  var handleUsernameClick = function() {
    $(this).text($(this).text() === 'Back' ? 'Update Feed' : 'Back');
  }

  // var handleUsernameClick = function(user) {
  //   if (renderFeed.arguments) {
  //     $updateFeedBtn.html('Back')
  //   } else {
  //     $updateFeedBtn.html('Update Feed')
  //   }
  // if renderFeed gets called with a username, button goes to "back"
  // else button goes to "update feed"
  // $updateFeedBtn.text()


  // SET EVENT LISTENERS
  $updateFeedBtn.on("click", function(event) {
    renderFeed();
    // handleUsernameClick ()
    $updateFeedBtn.html('Update Feed')
    // handleUsernameClick()
  });

  // $updateFeedBtn.on("click", handleUsernameClick)

  $(document).on("click", ".username", function() {
    renderFeed($(this).text().slice(1));
    $updateFeedBtn.html('Back')
    // handleUsernameClick()
  })


  // Append HTML to Dom
  // -------------------------------------
  renderFeed();

  $title.appendTo($app);
  $container.appendTo($app);
  $inputField.appendTo($container);
  // $inputNav.appendTo($inputField);
  $updateFeedBtn.appendTo($inputField);
  // $userInput.appendTo($inputField)
  $feed.appendTo($container);

  window.isItBeautifulYet = true

});

