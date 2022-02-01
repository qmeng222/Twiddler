//Generating the list of 10 tweets to display
$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  jQuery("time.timeago").timeago(); //use jQuery.timeago(new Date()); for time stamp
  var $title = $('<div class="header"><h1>Twiddler</h1></div>');
  var $homeButton = $('<div class="button"><button id="home-feed">Home Feed</button></div>');
  var $updateButton = $('<div class = "button"><button id="update-feed">Update Feed</button></div>');
  var $feed = $('<div id="feed"></div>');

  $title.appendTo($app);
  $homeButton.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);




  //populating the 10 tweets
  var index = streams.home.length - 1;
  for(index; index >= 0; index--){
    //creating div for tweet.
    //tweet will have img, username, timestamp, message,
    //4 icons at bottom: comment, retweet, like, share

    //picks one of the randomly generated tweets, we can work with tweet. to reference data.
    var tweet = streams.home[index];

    var $tweet = $('<div class="tweet"></div>');
    var $userName = $('<div class="username"></div>');
      $userName.text('@' + tweet.user);
      $userName.appendTo($tweet);
    var $message = $('<span class="message"><span><br>');
      $message.text(tweet.message);
      $message.appendTo($tweet);
    var $profilePicture = $('<img class="profile-picture" src="assets/img/' + tweet.user + '.png">');
      $profilePicture.appendTo($tweet);
    var $timeStamp = $('<span class="timestamp"></span>');
      $timeStamp.text($.timeago(tweet.created_at));
      $timeStamp.appendTo($tweet);

    //append tweetbox to feed
    $tweet.appendTo($feed);
  }



    //adding event listener for update feed button:
    $("#update-feed").on("click", function() {
      event.preventDefault;
      alert('This button will update the feed soon');
    });

    $("#home-feed").on("click", function() {
      event.preventDefault;
      alert("This button will take you to your home feed soon");
    });
  window.isItBeautifulYet = true;
});
