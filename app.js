$(app.js).ready(function(){
  var $app = $('#app');
  $app.html('');
  //add timeago to Jquery
//HTML Elements
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  //buttonzone
  var $buttonContainer = $('<div id="button place"></div>');
  $buttonContainer.appendTo($app);
  var $updateFeed = $('<button id="update-feed">Update Feed</button>').appendTo($buttonContainer);
  //create feed
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

 //Helper Functions
 var $renderFeed = function(stream, streamIndex) {
  var tweet = streams.home[streamIndex];
  var $tweet = $('<div class="tweet"></div>');
  var imageString = 'assets/img/' + tweet.user + '.png';
  var $profilePhoto = $('<img src=' + imageString + ' class="profile-photo"></img>').appendTo($tweet);
  var $username = $('<div class="username"></div>');
    $username.text('@' + tweet.user).appendTo($tweet);
    userFeed($username);
  var $message = $('<p class="message"></p>');
    $message.text(tweet.message).appendTo($tweet);;
  var time = jQuery.timeago(tweet.created_at.toISOString());
 //var time = tweet.created_at;
  var $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(time).appendTo($tweet);
  var $comment = $('<i class="fas fa-comments comment" style="color:black"></i>').appendTo($tweet);
  colorChange($comment);
  var $retweet = $('<i class="retweet fab fa-twitter"></i>').appendTo($tweet);
  colorChange($retweet);
  var $like = $('<i class="like fas fa-heart"></i>').appendTo($tweet);
  colorChange($like);
  var $share = $('<i class="share fas fa-share"></i>').appendTo($tweet);
  colorChange($share);
  return $tweet;
}

//starter feed code
var index = streams.home.length - 1;
while(index >= 0){
  $renderFeed(streams.home, index).appendTo($feed);
  index -= 1;
}
//* Event Listeners */
  //update feed button
  var defaultStreamIndex = 12;
  $("#update-feed").on('click', function() {
    if ($(this).text() === "Update Feed"){
      for (var i = defaultStreamIndex; i <= streams.home.length-1; i++) {
        ($renderFeed(streams.home, i).prependTo($feed));
      }
      defaultStreamIndex = streams.home.length;
    }
  });
  $updateFeed.on("click", function() {
    if ($(this).text() === "Back"){
      $( "#feed" ).empty();
      for (var i = 0; i <= streams.home.length-1; i++) {
        $renderFeed(streams.home, i).prependTo($feed);
        $("#update-feed").html("Update Feed");;
      }
    }
  });
  //change icon color on mouseover
  function colorChange(icon){
    icon.on('mouseover', function() {
      icon.attr('style', 'color:gray');
    });
    icon.on('mouseout', function() {
      icon.attr("style", "color: black");
    });
}
  // $backButton.on("click", function() {
  //   $( "#feed" ).empty();
  //   $backButton.hide();
  //   $updateFeed.show();
  //   for (var i = 0; i < streams.home.length; i++){
  //     $renderFeed(streams.home, i).prependTo($feed);
  //   }
  // })
  //clear feed on click and load user's tweets
  function userFeed () {
    $(document).on('click', ".username", function(user) {
      var clickedUser = $(this).text();
      clickedUser = clickedUser.slice(1);
      $("#update-feed").html("Back");
      //clear feed
      $( "#feed" ).empty();
      //store clicked user to variable
      // clickedUser = event.target.text();
      //console.log(clickedUser);
      //load the user's tweets
      function renderUserFeed(document) {
        for(var i = 0; i <= streams.home.length-1; i++) {
          var newTweet = streams.home;
          if (streams.home[i].user === clickedUser) {
          $newTweet = $("<div class='tweet'></div>");
          var newImageString = 'assets/img/' + clickedUser + '.png';
          var $newProfilePhoto = $('<img src=' + newImageString + ' class="profile-photo"></img>').appendTo($newTweet);
          var $newUsername = $('<div class="username"></div>');
            $newUsername.text('@' + clickedUser).appendTo($newTweet);
          var $newMessage = $('<p class="message"></p>');
            $newMessage.text(newTweet[i].message).appendTo($newTweet);;
          var newTime = jQuery.timeago(newTweet[i].created_at.toISOString());
          var $newTimestamp = $('<div class="timestamp"></div>');
            $newTimestamp.text(newTime).appendTo($newTweet);
          var $newComment = $('<i class="fas fa-comments comment" style="color:black"></i>').appendTo($newTweet);
          colorChange($newComment);
          var $newRetweet = $('<i class="retweet fab fa-twitter"></i>').appendTo($newTweet);
          colorChange($newRetweet);
          var $newLike = $('<i class="like fas fa-heart"></i>').appendTo($newTweet);
          colorChange($newLike);
          var $newShare = $('<i class="share fas fa-share"></i>').appendTo($newTweet);
          colorChange($newShare);
          $newTweet.appendTo($feed);
        }
        }
      }
      // for (var j = 0; j < 10; j++) {
      renderUserFeed(document);
      //}
    });
  }

  //Append new HTML elements to the DOM
  window.isItBeautifulYet = true;
});