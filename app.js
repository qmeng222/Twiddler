$(document).ready(function(){

  var $app = $('#app');

  var $title = $('<h1 class="title">Twiddler</h1>');
  var $button = $('<button id="update-feed" type="button">Update Feed</button>')
  var $feed = $('<div id="feed"></div>');


  var renderfeed = function (user) {
    $feed.empty();
    if (user) {
      var tweetarray = streams.users[user];
    } else {
      var tweetarray = streams.home;
    }
    var index = tweetarray.length - 1;
    while(index >= 0){
      var tweet = tweetarray[index];
      $tweet = $('<div class="tweet"></div>')

      $username = $('<div class="username"></div>');
      $username.text('@' + tweet.user);
      $username.attr({id: tweet.user});


      var $tweetmessage = $('<div class="message"></div>');
      $tweetmessage.text(tweet.message);

      $profilephoto = $('<img class="profile-photo" alt="profile photo">');
      $profilephoto.attr("src",tweet.profilePhotoURL);

      $timestamp = $('<span class="timestamp">timestamp</span>');
      $timestamp.text(jQuery.timeago(tweet.created_at));

      $comment = $('<i class="icon comment fas fa-comments"></i>');
      $retweet = $('<i class="icon retweet fas fa-retweet"></i>');
      $like    = $('<i class="icon like fas fa-heart"></i>');
      $share   = $('<i class="icon share fas fa-share"></i>');

      $profilephoto.appendTo($tweet);
      $username.appendTo($tweet);
      $timestamp.appendTo($tweet);

      $tweetmessage.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);


      $tweet.appendTo($feed);

      var handleusernameclick = function () {
        var currentusername = $(this).attr("id");
        renderfeed(currentusername);
        $button.text('Back');
      }

      $username.on("click",handleusernameclick);

      index -= 1;
    }
  }
  renderfeed();


  var updatefeedbuttonhandler = function () {
    renderfeed();
    $button.text('Update Feed');
  }

  $button.on("click", updatefeedbuttonhandler);


  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  window.isItBeautifulYet = true;


});