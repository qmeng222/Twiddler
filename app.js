$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');
  $("time.timeago").timeago();

  // Create new HTML elements
  var $title = $('<h1>Twiddler Revolution</h1>');
  var $button = $('<button id="update-feed" type="button">Update Feed</button>');
  var $feed = $('<div id="feed"> </div>');

  // Create event handler functions
  var renderFeed = function(user) {
    $feed.html('');
    var index;
    var tweet;
    var selectedUserTweets = []

    if (user !== undefined){
      for (var i=0; i<streams.home.length; i++){
        if (('@' + streams.home[i].user) === user){
          selectedUserTweets.push(streams.home[i])
        }
      }
      tweet = selectedUserTweets;
      index = selectedUserTweets.length - 1;

    } else {
      tweet = streams.home;
      index = streams.home.length - 1;
    }

    while(index >= 0){

      var postedTime = $.timeago(tweet[index].created_at)
      var $tweet = $('<div class="tweet"></div>');
      var $imagePerson = $('<img src=" '+ tweet[index].profilePhotoURL +' " class="profile-photo"/>');
      var $userName = $('<div class="username"<br></div>');
      var $tweetMesage = $('<div class="message"<br>></div>');
      var $timeStamp = $('<div <time class="timestamp timeago" datetime="'+ tweet[index].created_at +'"></time>> </div>');
      var $comment = $('<i class="icon comment far fa-comment"</i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet"</i>');
      var $like = $('<i class="icon like far fa-thumbs-up"</i>');
      var $share = $('<i class="icon share fas fa-share-square"</i>');

      $feed.append($tweet.append($imagePerson, $userName.text('@' + tweet[index].user),
        $tweetMesage.text(tweet[index].message), $timeStamp.text("Posted " + postedTime),
        $comment, $retweet, $like, $share))

      index -= 1;
    }

    var currentMessage;
    $(".message").hover(function(){
      currentMessage = $(this).html()
      $(this).html("ENCRYPTED!").css("color", "red")
    }, function(){
      $(this).html(currentMessage).css("color", "");
    });

    // Create event handler functions
    $(".icon").hover(function(){
      $(this).css("color", "green");
      }, function(){
      $(this).css("color", "");
    });

    $(".username").click(function() {
      var username = $(this).html()
      renderFeed(username);
      document.getElementById('update-feed').innerHTML="<<  Back";
    });

    $($button).click(function() {
      document.getElementById('update-feed').innerHTML="Update Feed";
      renderFeed();
    });
  }

  // Set event listeners (providing appropriate handlers as input)
  $button.on("click", renderFeed);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  // render initial feed
  renderFeed();

});

window.isItBeautifulYet = true;