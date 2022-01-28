$(document).ready(function(){
  // Select the div with the ID #app
  var $app = $('<div id = "app"></div>');
  $app.appendTo('body');
  $app.html('');

  // Create an element within the #app element with id feed
  var $feed = $('<div id = "feed"></div>');
  $feed.appendTo($app);

  // Create an element with id called called update-feed
  var $updateFeed = $('<h2 id = "update-feed">Update Feed</h2>');
  $updateFeed.prependTo($app);

  // Initial tweet
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<div class="message"></div>');
    var $userName = $('<div class="username"></div>')
    var $userImage = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
    var $timeStamp = $('<div class="timestamp"></div>');

    //icons
    var $comment = $('<i class="comment fas fa-comment"></i>');
    var $retweet = $('<i class="retweet fas fa-retweet"></i>');
    var $like = $('<i class="like fas fa-thumbs-up"></i>');
    var $share = $('<i class="share fas fa-share"></i>');

    //set the content within desired elements
    $message.text(tweet.message);
    $userName.text('@' + tweet.user);
    $timeStamp.text(jQuery.timeago(tweet.created_at));
    //$comment.addClass($thumbsUp);

    //insert elements into the DOM
    $tweet.appendTo($feed);
    $message.appendTo($tweet);
    $userName.appendTo($tweet);
    $userImage.appendTo($tweet);
    $timeStamp.appendTo($tweet);
    $comment.appendTo($tweet);
    //$thumbsUp.appendTo($comment);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    index -= 1;
  }

  console.log("hold here");

  $updateFeed.on("click", function(event) {
    // remove all div.tweet elements within the feed
    var index = streams.home.length - 1;
    $feed.html('');
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $userName = $('<div class="username"></div>');
      var $userImage = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
      var $timeStamp = $('<div class="timestamp"></div>');

      //icons
      var $timeStamp = $('<div class="timestamp"></div>');
      var $comment = $('<i class="comment fas fa-comment"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-thumbs-up"></i>');
      var $share = $('<i class="share fas fa-share"></i>');

      //set content within the desired elements
      $message.text(tweet.message);
      $userName.text('@' + tweet.user);
      $timeStamp.text(jQuery.timeago(tweet.created_at));

      // insert elements into DOM
      $tweet.appendTo($feed);
      $message.appendTo($tweet);
      $userName.appendTo($tweet);
      $userImage.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $comment.appendTo($tweet);
     // $thumbsUp.appendTo($comment);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      index -= 1;
    }
  });

  console.log('hold here');

  $('.tweet .username').on("click", function(event) {
    var selectedName = event.currentTarget.innerText.substring(1);
    console.log(selectedName);
    var index = streams.users[selectedName].length - 1;
    $feed.html('');
    while(index >= 0) {
     var tweet = streams.users[selectedName][index];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $userName = $('<div class="username"></div>');
      var $userImage = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
      var $timeStamp = $('<div class="timestamp"></div>');

      //icons
      var $timeStamp = $('<div class="timestamp"></div>');
      var $comment = $('<i class="comment fas fa-comment"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $like = $('<i class="like fas fa-thumbs-up"></i>');
      var $share = $('<i class="share fas fa-share"></i>');

      //set content within the desired elements
      $message.text(tweet.message);
      $userName.text('@' + tweet.user);
      $timeStamp.text(jQuery.timeago(tweet.created_at));

      // insert elements into DOM
      $tweet.appendTo($feed);
      $message.appendTo($tweet);
      $userName.appendTo($tweet);
      $userImage.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $comment.appendTo($tweet);
     // $thumbsUp.appendTo($comment);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);

      index -= 1;
    }
  });
});

  /*
  var $title = $('<h1>Twiddler</h1>');
  var $tweetInput = $('<div>TweetComp</div>');
  var $homeFeed = $('<div>HomeFeed</div>');
  var $userFeed = $('<div>UserFeed</div>');


  //Append elements to the DOM, nested inside the #app div
  $title.appendTo($app);
  $tweetInput.appendTo($app);
  $homeFeed.appendTo($app);
  $userFeed.appendTo($app);


  // Set a click event listener on the h1 element
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText)
  });
  */