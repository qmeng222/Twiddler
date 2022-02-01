$(document).ready(function(){

  // Select the div with the ID #app
  var $app = $('#app');
  $app.html('');

  // Create an h1 element with the text "Twiddler"
  var $title = $('<h1>Twiddler</h1>');

  // Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

  // Update Feed button
  var updateFeedButton = function(event){
    var $button = $('<button id=update-feed>Update Feed</button>');
    $button.appendTo($app);
    $button.on('click', function() {
    // Remove all previously existing Tweets from the Feed
    $feed.empty();
    // For each Tweet object in the stream array (in reverse order)
      // Create a new Tweet UI component
      // Append the new Tweet UI component to the Feed
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        console.log(streams.home[index]);
        var $tweet = $('<div class=tweet></div>');
        var $profilePhoto= $('<img class=profile-photo></img>').attr("src", tweet.profilePhotoURL);
        $profilePhoto.appendTo($tweet);
        var $username = $('<div class=username></div>');
        $username.text('@' + tweet.user);
        $username.appendTo($tweet);
        var $message = $('<div class=message></div>');
        $message.text(tweet.message);
        $message.appendTo($tweet);

        var $timestamp = $('<div class=timestamp></div>');
        $timestamp.text(jQuery.timeago(tweet.created_at));
        $timestamp.appendTo($tweet);

        var $icons = $('<div class=icons></div');
        var $comment =$('<i class="far fa-comments comment"></i>');
        $comment.appendTo($icons);
        var $retweet =$('<i class="fas fa-retweet retweet" ></i>');
        $retweet.appendTo($icons);
        var $like =$('<i class="far fa-heart like"></i>');
        $like.appendTo($icons);
        var $share =$('<i class="fas fa-share share"></i>');
        $share.appendTo($icons);
        $icons.appendTo($tweet);
        $tweet.appendTo($feed);
        index -= 1;
      }
    });
  }
  updateFeedButton();


  // var index = streams.home.length - 1;
  // while(index >= 0){
  //   var tweet = streams.home[index];
  //   var $tweet = $('<div class="tweet"></div>');
  //   $tweet.text('@' + tweet.user + ': ' + tweet.message);
  //   $tweet.appendTo($feed);
  //   index -= 1;
  // }

    // Feed div with all the tweets
    var $feed = $('<div id=feed></div>');
    $feed.appendTo($app);



  // Set a click event listener on the h1 element
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });


  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    console.log(streams.home[index]);
    var $tweet = $('<div class=tweet></div>');
    var $profilePhoto= $('<img class=profile-photo></img>').attr("src", tweet.profilePhotoURL);
    $profilePhoto.appendTo($tweet);
    var $username = $('<div class=username></div>');
    $username.text('@' + tweet.user);
    $username.appendTo($tweet);
    var $message = $('<div class=message></div>');
    $message.text(tweet.message);
    $message.appendTo($tweet);
    var $timestamp = $('<div class=timestamp></div>');
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $timestamp.appendTo($tweet);

    var $icons = $('<div class=icons></div');

    var $comment =$('<i class="far fa-comments comment"></i>');
    $comment.appendTo($icons);
    // <i class="far fa-comments"></i>

    var $retweet =$('<i class="fas fa-retweet retweet"></i>');
    $retweet.appendTo($icons);
    // <i class="fas fa-retweet"></i>

    var $like =$('<i class="far fa-heart like"></i>');
    $like.appendTo($icons);
    // <i class="far fa-heart"></i>

    var $share =$('<i class="fas fa-share share"></i>');
    $share.appendTo($icons);
    // <i class="fas fa-share"></i>

    $icons.appendTo($tweet);
    $tweet.appendTo($feed);
    index -= 1;
  }

});