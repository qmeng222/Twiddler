$(document).ready(function(){


  var $app = $('#app');
  $app.html('');
  var latest = 0;


  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });





  var $updateFeed = $('<button id="update-feed" type="button">Update Feed</button>');
  $updateFeed.appendTo($app);
  $updateFeed.on("click", function(event) {
    var index = streams.home.length - 1;

    while(index >= latest){
      var newTweet = streams.home[latest];
      var $tweet = $('<div class="tweet"></div>');

      var $photo = $('<img class="profile-photo"></img>');

      var $username = $('<div class="username"></div>');
      $username.text('@' + newTweet.user);

      var $message = $('<div class="message"></div>');
      $message.text(newTweet.message);

      var $timestamp = $(`<time class="timestamp"></time>`);
      $timestamp.attr("datetime", newTweet.created_at.toISOString())


      var $icons = $('<div class="icon"></div>');
      var $comment = $('<img src="assets/icons/placeholder.png" class="comment"></img>');

      var $retweet = $('<img src="assets/icons/placeholder.png" class="retweet"></img>');

      var $like = $('<img src="assets/icons/placeholder.png" class="like"></img>');

      var $share = $('<img src="assets/icons/placeholder.png" class="share"></img>');


      $photo.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($icons);
      $retweet.appendTo($icons);
      $like.appendTo($icons);
      $share.appendTo($icons);
      $icons.appendTo($tweet);
      $tweet.prependTo($feed);

      latest++;

      $("time.timestamp").timeago();
    }
  });


  var $feed = $('<div id="feed"></div>');
  var index = streams.home.length - 1;
  var latest = 0;

  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');

    var $photo = $('<img class="profile-photo"></img>');

    var $username = $('<div class="username"></div>');
    $username.text('@' + tweet.user);

    var $message = $('<div class="message"></div>');
    $message.text(tweet.message);

    var $timestamp = $(`<time class="timestamp"></time>`);
    $timestamp.attr("datetime", tweet.created_at.toISOString())


    var $icons = $('<div class="icon"></div>');
    var $comment = $('<img src="assets/icons/placeholder.png" class="comment"></img>');

    var $retweet = $('<img src="assets/icons/placeholder.png" class="retweet"></img>');

    var $like = $('<img src="assets/icons/placeholder.png" class="like"></img>');

    var $share = $('<img src="assets/icons/placeholder.png" class="share"></img>');


    $photo.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);
    $icons.appendTo($tweet);
    $tweet.appendTo($feed);

    index--;
    latest++;

  }

  $feed.appendTo($app);

  $("time.timestamp").timeago();




});


