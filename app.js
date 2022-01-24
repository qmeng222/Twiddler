$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  $("time.timeago").timeago();

  var streamArray = streams.home;

  var $title = $('<h1 class="title">Twiddler</h1>');
    $title.appendTo($app);
  var $refreshFeed = $('<div id="update-feed">Update Feed</div>');
    $refreshFeed.appendTo($app);
  var $feed = $('<div id="feed"></div>');
    $feed.appendTo($app);

  var userArray = [];

  var tweetWriter = function() {
      $( "#feed" ).empty();

      for (var x = streamArray.length - 1; x >= 0; x--) {
          var tweetData = streamArray[x];

          // Profile Pic
          var picture = tweetData.user + '.png';
          var $profilePic = $('<img class="profile-photo"></img>');
          // $profilePic.attr("src", picture);
          // Icons
          var $comment = $('<i class="icon comment fas fa-robot"></i>');
          var $retweet = $('<i class="icon retweet fas fa-satellite-dish"></i>');
          var $like = $('<i class="icon like fas fa-hand-spock"></i>');
          var $share = $('<i class="icon share fas fa-globe"></i>');
          // Tweet Icons
          var $username = $('<div class="username"></div>');
          var $message = $('<div class="message"></div>');
          var $timestamp = $('<div class="timestamp"></div>');
          var $tweet = $('<div class="tweet"></div>');

          var user = $username.text('@' + tweetData.user);
          var message = $message.text(tweetData.message);
          var timeAgo = jQuery.timeago(tweetData.created_at);
          var timestamp = $timestamp.text(timeAgo);

          $($username).on("click", function() {
            $( "#feed" ).empty();
            for (var y = streamArray.length - 1; y >= 0; y--) { // variable values not updating inside the iteration
              // I don't think anything else has to happen right here
              if ('@' + streamArray[y].user === event.target.innerHTML) {  // click event not resetting
              userArray.push(streamArray[y]);  // nothing else needs to happen here
              }
            }
            for (var z = userArray.length - 1; z >= 0; z--) {
              // values need to be updated here, passing the same message over and over
                // nothing is being updated so only one unique tweet exists
              appender(userArray[z]);
            }
          });

          var appender = function(obj) {
            $($tweet).append($username, $message, $timestamp, $profilePic, $comment, $retweet, $like, $share, $profilePic);
            $tweet.appendTo($feed);
            document.get.innerHTML = '';
          }
          appender(tweetData);
        }
      }
  $(window).load(tweetWriter);
  $refreshFeed.click(tweetWriter);
});

