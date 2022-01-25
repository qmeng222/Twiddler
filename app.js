$(document).ready(function() {
  var $app = $('#app');
  $app.html('');
  $("time.timeago").timeago();

  var streamArray = streams.home;

  var $title = $('<h1 class="title">Twiddler</h1>');
    $title.appendTo($app);
  var $refreshFeed = $('<div id="update-feed"></div>');
    $refreshFeed.text('Update Feed');
    $refreshFeed.appendTo($app);
  var $feed = $('<div id="feed"></div>');
    $feed.appendTo($app);

  var tweetWriter = function() {
    $( "#feed" ).empty();
    for (var x = streamArray.length - 1; x >= 0; x--) {
      appender(streamArray[x]);
      $refreshFeed.text('Update Feed')
      }
    }

  var appender = function(obj) {
    var picture = 'assets/img/' + obj.user + '.png';
    var $profilePic = $('<img class="profile-photo"></img>');
      $profilePic.attr("src", picture);
    var $comment = $('<i class="icon comment fas fa-robot"></i>');
    var $retweet = $('<i class="icon retweet fas fa-satellite-dish"></i>');
    var $like = $('<i class="icon like fas fa-hand-spock"></i>');
    var $share = $('<i class="icon share fas fa-globe"></i>');
    var $username = $('<div class="username"></div>');
    var $message = $('<div class="message"></div>');
    var $timestamp = $('<div class="timestamp"></div>');
    var $tweet = $('<div class="tweet"></div>');

    var user = $username.text('@' + obj.user);
    var message = $message.text(obj.message);
    var timeAgo = jQuery.timeago(obj.created_at);
    console.log(timeAgo);
    var timestamp = $timestamp.text(timeAgo);
    console.log(timestamp);

    $($tweet).append($profilePic, $username, $message, $timestamp, $comment, $retweet, $like, $share, $profilePic);
      $tweet.appendTo($feed);

    $('.username').on("click", function() {
      $( "#feed" ).empty();
      $refreshFeed.text('Back');
      for (var y = streamArray.length - 1; y >= 0; y--) {
        if ('@' + streamArray[y].user === event.target.outerText) {
        appender(streamArray[y]);
        }
      }
    });

    $(".icon").hover(function(){
      $(this).css("color", "black");
      $(this).css("color", "blue");
  });
  }
  $(window).load(tweetWriter);
  $refreshFeed.click(tweetWriter);
});

