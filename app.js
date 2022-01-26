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
  var $feed = $('<div id="feed"></div>');


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
      $pp.appendTo($tweet)
      $username.appendTo($tweet)
      $tweetMsg.appendTo($tweet)
      $username.appendTo($tweet)
      $timeStamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    };

  }
  renderFeed();


  // CREATE EVENT HANDLER FUNCTIONS

  var handleUsernameClick = function() {
    $(this).text($(this).text() === 'Back' ? $updateFeedBtn.text() : 'Back');
  }



  // SET EVENT LISTENERS
  $updateFeedBtn.on("click", function(event) {
    renderFeed();
  });

  $updateFeedBtn.on("click", handleUsernameClick)

  $(document).on("click", ".username", function() {
    renderFeed($(this).text().slice(1));
    $updateFeedBtn.html('Back')
  })


   // Toggle over icon - placement?
  //  $('.icon').mouseover(function() {
  //   $('.icon').toggleClass(***CHANGE COLOR***);
  // })



  // Append HTML to Dom
  // -------------------------------------

  $title.appendTo($app);
  $updateFeedBtn.appendTo($app);
  $feed.appendTo($app);

});

