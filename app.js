$(document).ready(function(){


  jQuery(document).ready(function() {
    jQuery("time.timeago").timeago();
  });

  // SELECT EXISTING ELEMENTS
  var $app = $('#app');
  $app.html('');



  // CREATE NEW HTML ELEMENTS
  var $title = $('<h1 class="primary-header">Twiddler</>');
  var $updateFeedBtn = $('<button type=button class="btn" id=update-feed>Update Feed</button>');
  var $feed = $('<div id="feed"></div>')

  var stream = streams.home;
  console.log(stream);




  // CREATE EVENT HANDLER FUNCTIONS
  var renderFeed = function() {
    $feed.html('');
    addTweetsToFeed();
  }


  var addTweetsToFeed = function () {
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
      var $pp = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
      var $tweetMsg = $('<div class="message">' + tweet.message + '</div>');
      var $timeStamp = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      var $comment = $('<img class="icon comment" src="assets/icons/placeholder.png">');
      var $retweet = $('<img class="icon retweet" src="assets/icons/placeholder.png">');
      var $like = $('<img class="icon like" src="assets/icons/placeholder.png">');
      var $share = $('<img class="icon share" src="assets/icons/placeholder.png">');


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
  addTweetsToFeed();

  // jQuery.timeago(new Date())
  // jQuery.timeago(`${tweet.created_at.toString()}`)
  // `${tweet.created_at.toString()}`


  // SET EVENT LISTENERS
  $updateFeedBtn.on("click", function(event) {
    renderFeed();
  });






  // Append HTML to Dom
  // -------------------------------------

  $title.appendTo($app);
  $updateFeedBtn.appendTo($app);
  $feed.appendTo($app);

});


























  // var $pp;
  // var $username;
  // var $tweetMsg;
  // var $timeStamp;
  // var $comment;
  // var $retweet;
  // var $like;
  // var $share;
