


$(document).ready(function () {
  var $app = $('#app');
  $app.html('');

  function addGoogleFont(FontName) {
    $app.append("<link href='https://fonts.googleapis.com/css?family=" + FontName + "' rel='stylesheet' type='text/css'>");
   }
  addGoogleFont("Raleway");

  var $title = $('<h1 class="title">Twiddler</h1>');
  $title.appendTo($app);


  var $home = $('<button id="home">Home</button>');
  //$home.appendTo($feed);
  //$home.html('');
  $home.appendTo($app);
  $home.on('click', function () {
    printTweets('all');
    $updateButton.html("Update Feed");
  });

  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  $updateButton.appendTo($app);
  $updateButton.on('click', function () {
    printTweets('all');
  });

  var $feed = $('<div id="feed">Home</div>');
  $feed.appendTo($app);
  //$feed.css("border-left": "100px");
   /*$feed.on('click', function () {
    printTweets('all');
  });*/


  var printTweets = function (context) {
    var tweet;
    var $tweet;
    var $user;
    var $message
    var $tweetTime;
    var $profilePhoto;
    var $like;
    var $retweet;
    var $share;
    var comment;
    var source;
    var index;
    var readableTime;

    $feed.html('');

    if (context === 'all') {
      source = streams.home;
    } else if (context) {
      source = streams.users[context];
    }

    for (index = source.length - 1; index >= 0; index -= 1) {
      tweet = source[index];
      $tweet = $('<div class="tweet"></div>');
      //$tweet.addClass('tweet');

      $user = $('<a></a>');
      $user.attr({'href': '#', 'data-user': tweet.user, 'class': 'username'});
      $user.text('@' + tweet.user);
      $user.appendTo($tweet);

      $message = $('<div class="message"></div>');
      //$message.addClass('message');
      $message.text(' ' + tweet.message);
      $message.appendTo($tweet);
      //$tweet.append(': ' + tweet.message);

      $profilePhoto = $('<img class="img.profile-photo">');
      $profilePhoto.addClass('profile-photo');

      if(tweet.user === 'douglascalhoun') {
        $('<img class="img.profile-photo" src="assets/img/douglascalhoun.png" height="100px" width="50px">').prependTo($tweet);
      }
      if(tweet.user === 'mracus') {
        $('<img class="img.profile-photo" src="assets/img/mracus.png" height="100px" width="50px">').prependTo($tweet);
      }
      if(tweet.user === 'sharksforcheap') {
        $('<img class="img.profile-photo" src="assets/img/sharksforcheap.png" height="100px" width="50px">').prependTo($tweet);
      }
      if(tweet.user === 'shawndrost') {
      $('<img class="img.profile-photo" src="assets/img/shawndrost.png" height="100px" width="50px">').prependTo($tweet);
      }
      $profilePhoto.appendTo($tweet);



      $tweetTime = $('<div class="timestamp"></div>');
      $tweetTime.addClass('timestamp');
      readableTime = $.timeago(tweet.created_at);
      $tweetTime.text('' + readableTime);
      $tweetTime.appendTo($tweet);


      //src="assets/icons/placeholder.png"
      //$like = $('<img class="img.like" src="https://kit.fontawesome.com/c7a6d56879.js" crossorigin="anonymous">');
      $like = $('<i class="far fa-heart"></i>');
      $like.addClass('like');
      $like.appendTo($tweet);
      $share = $('<i class="fas fa-share"></i>');
      $share.addClass('share');
      $share.appendTo($tweet);
      $retweet = $('<i class="fas fa-retweet"></i>');
      $retweet.addClass('retweet');
      $retweet.appendTo($tweet);
      $comment = $('<i class="far fa-comment"></i>');
      $comment.addClass('comment');
      $comment.appendTo($tweet);

      $like.hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "");
      });
      $share.hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "");
      });
      $retweet.hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "");
      });
      $comment.hover(function(){
        $(this).css("background-color", "yellow");
        }, function(){
        $(this).css("background-color", "");
      });



      $tweet.appendTo($feed);
    }

    $('.username').on('click', function (clickHere) {
      clickHere.preventDefault();
      printTweets($(this).data('user'));
      $updateButton.text("Back");
      $updateButton.on('click', function () {
        printTweets('all');
        $updateButton.html("Update Feed");
      });
      //$updateButton.text("Back");
      //$updateButton.html("Back");

    });
  };


  //$updateButton.clone().appendTo($app);
  printTweets('all');

  /*$('input').keypress(function (e) {
    if (e.which === 13) {
      window.visitor = 'guest';
      if (!streams.users[window.visitor]) {
        streams.users[window.visitor] = [];
      }
      writeTweet($(this).val());
      $(this).val('');
      printTweets('all');
    }
  });*/
  window.isItBeautifulYet = true;

});