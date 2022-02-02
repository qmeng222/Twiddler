//Generating the list of 10 tweets to display
$(document).ready(function(){
  jQuery("time.timeago").timeago(); //use jQuery.timeago(new Date()); for time stamp
  var $app = $('#app');
  $app.html('');

  var $title = $('<div class="header"><h1>Twiddler</h1></div>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  //appending the main div/buttons to html
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  //main loop that will formulate/display tweets
  var refreshFeed = function(userName) {

    //https://api.jquery.com/empty/
    //Remove all child nodes of the set of matched
    //elements from the DOM.
    $feed.empty();

    //if the user exists, we will use their tweets. Triggered by 'click'
    //else, we will use all tweets from all users.
    if(userName) {
      var userTweets = streams.users[userName];
    } else {
      var userTweets = streams.home;
    }

    //iterating the userTweets array.
    for(var i = userTweets.length-1; i >= 0; i--) {
      var tweet = userTweets[i];
      var $tweet = $('<div class="tweet"></div>');
      var $userName = $('<span class="username"></span>');
      var $message = $('<p class="message"></p>');
      var $profilePhoto = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png">');
      var $timeStamp = $('<span class="timestamp"></span>');
      $userName.text('@' + tweet.user).prependTo($tweet);
      $message.text(tweet.message).appendTo($tweet);
      $profilePhoto.prependTo($tweet);
      $timeStamp.text($.timeago(tweet.created_at)).appendTo($tweet);

      //Adding tweet bottom 4 buttons:
      var $like = $('<i class="like far fa-thumbs-up"></i>');
      var $retweet = $('<i class="retweet fas fa-retweet"></i>');
      var $share = $('<i class="share far fa-share-square"></i>');
      var $comment = $('<i class="comment far fa-comment"></i>');
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);




      //append tweetbox to feed
      $tweet.appendTo($feed);

      //called when a username is clicked
      //changes the button to 'back'
      function nameClick() {
        //needs () after text method!!!!!
        var userName = $(this).text().slice(1);
        // alert($(this).text().slice(1)); //--> name
        // alert($(this).text().slice(0)); --> @
        console.log(userName);
        $feed.empty();
        $button.text('Back');
        refreshFeed(userName);
      }
      $userName.click(nameClick);
    }
  };
  //creates first instance of feed
  refreshFeed();

    //adding event listener for update feed button:
    //sets the button text to update feed
    var updateButton = function() {
      refreshFeed();
      $button.text('Update Feed');
    }
    $button.click(updateButton);
  window.isItBeautifulYet = true;
});
