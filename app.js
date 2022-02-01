$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);


  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($app);

  var renderFeed = function() {

    var index = streams.home.length - 1;
    while(index >= 0) {
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    $tweet.appendTo($feed);
    index -= 1;

    var $message = $('<div class="message"></div>');
    $message.text(tweet.message);
    $message.appendTo($tweet);

    var $username = $('<span class="username"></span>');
    var username = '@' + tweet.user;
    $username.text(username);
    $username.appendTo($tweet);
    $username.on('click', function (event) {
      handleUserClick(event);
    })

    var $photo = $('<img class="profile-photo"></img>');
    $photo.appendTo($tweet);

    var $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text($.timeago(tweet.created_at));
    $timestamp.appendTo($tweet);

    var $comment = $('<i class="icon"></i>');
    $comment.addClass("comment");
    $comment.addClass("fas fa-comment-dots")
    $comment.appendTo($tweet);

    var $retweet = $('<i class="icon"></i>');
    $retweet.addClass("retweet");
    $retweet.addClass("fas fa-retweet");
    $retweet.appendTo($tweet);

    var $like = $('<i class="icon"></i>');
    $like.addClass("like");
    $like.addClass("far fa-thumbs-up");
    $like.appendTo($tweet);

    var $share = $('<i class="icon"></i>');
    $share.addClass("share");
    $share.addClass("fas fa-share-square");
    $share.appendTo($tweet);

   }
  }

var handleUserClick = function(event) {
   $feed.empty();
   username = event.target.innerText;
   var index = streams.home.length - 1;
   while(index >= 0) {


    tweet = streams.home[index];
    $tweet = $('<div class="tweet"></div>');
    $tweet.appendTo($feed);
    index -= 1;

    $message = $('<div class="message"></div>');
    $message.text(tweet.message);
    $message.appendTo($tweet)

    $username = $('<span class="username"></span>');

    $username.text(username);
    $username.appendTo($tweet);

    var $photo = $('<img class="profile-photo"></img>');
    $photo.appendTo($tweet);

    var $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text($.timeago(tweet.created_at));
    $timestamp.appendTo($tweet);

    var $comment = $('<i class="icon"></i>');
    $comment.addClass("comment");
    $comment.addClass("fas fa-atom")
    $comment.appendTo($tweet);

    var $retweet = $('<i class="icon"></i>');
    $retweet.addClass("retweet");
    $retweet.addClass("fas fa-palette");
    $retweet.appendTo($tweet);

    var $like = $('<i class="icon"></i>');
    $like.addClass("like");
    $like.addClass("far fa-lightbulb");
    $like.appendTo($tweet);

    var $share = $('<i class="icon"></i>');
    $share.addClass("share");
    $share.addClass("far fa-compass");
    $share.appendTo($tweet);

    //$updateFeed.replaceWith('<button id="update-feed">BACK</button>');
    $updateFeed.text('BACK')
  }
};

$('button').on('click', function(event) {
  $feed.empty();
  renderFeed();
  $updateFeed.text('Update Feed');
});

renderFeed();
});

window.isItBeautifulYet = true;