$(document).ready(function(){

  var $app = $('#app');
  $app.html('');

  var tweetWriter = function() {
      $( "#feed" ).empty();

      for (var x = streamArray.length - 1; x >= 0; x--) {  // appending array objects backwards
          var tweetData = streamArray[x];  // individual tweet data

          var picture = tweetData.profilePhotoURL;
          console.log(picture);

          var $profilePic = $('<img class="picture" src= picture </img>');
          var $username = $('<div class="username"></div>');
          var $message = $('<div class="message"></div>');
          var $timestamp = $('<div class="timestamp"></div>');
          var $tweet = $('<div class="tweet"></div>');

          var user = $username.text('@' + tweetData.user);
          var message = $message.text(tweetData.message);
          var timestamp = $timestamp.text(tweetData.created_at);

          $($tweet).append($username, $message, $timestamp, $profilePic);
          $tweet.appendTo($feed); // applying to feed element on page

        }
      }

  var $feed = $('<div id="feed"></div>'); // create feed div, has to be ID feed per cypress tests
    $feed.appendTo($app); // append feed element

  var $title = $('<h1 class="title">Twiddler</h1>'); // create title h element
    $title.appendTo($app); // append title

  var $refreshFeed = $('<div id="update-feed">Update Feed</div>'); // create refresh button div
    $refreshFeed.appendTo($app); // append refresh button

  var streamArray = streams.home; // aliased array of tweet objects

  $(window).load(tweetWriter);
  $refreshFeed.click(tweetWriter);

});