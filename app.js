$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  var $title = $('<h1 class="home-title">Twiddler</h1>');
  var $feed = $('<div id="feed"></div>');
  var $refreshbutton = $('<div class="button" id="update-feed">Refresh Feed</div>');
  var $backbutton = $('<div class="button" id="update-feed">Back</div>');
  // Title
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  //Feed
  $refreshbutton.appendTo($app);
  $feed.appendTo($app);

  //refresh feature
  $(document).on("click", "#update-feed", function() {;
    $(".button").replaceWith($refreshbutton);
    $feed.html('');
    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet pagefont"></div>');
      var $message = $('<p class="message"></p>')
      $message.text(tweet.message);
      //Username
      var $username = $('<span class="username"></span>');
      $username.attr("id", tweet.user);
      $username.text('@'+ tweet.user + ': ');
      //Profile Picture
      var $pp = $('<img class="profile-photo"></img>');
      $pp.attr("src" , 'assets/img/' + tweet.user + '.png');
      $pp.appendTo($tweet);
      //Timestamp
      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));

      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $message.appendTo($tweet);

      //Icons
      var $comment = $('<i class="icon comment far fa-comment-dots"></i>');
      $comment.appendTo($tweet);
      var $retweet = $('<i class="icon retweet far fa-share-square"></i>');
      $retweet.appendTo($tweet);
      var $like = $('<i class="icon like far fa-thumbs-up"></i>');
      $like.appendTo($tweet);
      var $share = $('<i class="icon share far fa-paper-plane"></i>');
      $share.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;
    }
  });
  $("#update-feed").click();
  // Implementing User Feed
  $(document).on("click", ".username", function() {
    $feed.html('');
    var userid = $(this).attr("id");
    console.log(userid);
    var index = streams.users[userid].length - 1;
    while(index >= 0){
      var tweet = streams.users[userid][index];
      var $tweet = $('<div class="tweet pagefont"></div>');
      var $message = $('<p class="message"></p>')
      $message.text(tweet.message);
      //Username
      var $username = $('<span class="username"></span>');
      $username.attr("id", tweet.user);
      $username.text('@'+ tweet.user + ': ');
      //Profile Picture
      var $pp = $('<img class="profile-photo"></img>');
      $pp.attr("src" , 'assets/img/' + tweet.user + '.png');
      $pp.appendTo($tweet);
      //Timestamp
      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));

      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $message.appendTo($tweet);

      //Icons
      var $comment = $('<i class="icon comment fas fa-comment-dots"></i>');
      $comment.appendTo($tweet);
      var $retweet = $('<i class="icon retweet fas fa-share-square"></i>');
      $retweet.appendTo($tweet);
      var $like = $('<i class="icon like fas fa-thumbs-up"></i>');
      $like.appendTo($tweet);
      var $share = $('<i class="icon share fas fa-paper-plane"></i>');
      $share.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }
    //Change button text to home page
    $refreshbutton.replaceWith($backbutton);
  })
window.isItBeautifulYet = true;
});