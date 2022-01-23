$(document).ready(function(){
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  $app.html('');
  $title.appendTo($app);
  $title.on("click", function(event) {
    //console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
});

  // Create handler functions
  function renderFeed(user) {
  //$feed.html(''); // .empty?
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    //console.log(tweet);
    var img = $('<img class="profile-photo" src="assets/img/'+ tweet.user + '.png"> </img>');
    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $username = $('<div class="username">' + '@' + tweet.user + '</div>');
    var $timestamp = $('<div class="timestamp">' + jQuery.timeago(new Date(tweet.created_at)) + '</div>');
    var $comment = $('<i class="comment far fa-comment"></i>');
    //console.log('<i class="far fa-comment"></i>');
    //console.log(var comment = $0);
    var $retweet = $('<i class="retweet fas fa-retweet"></i>');
    var $like = $('<i class="like far fa-heart"></i>');
    var $share = $('<i class="share far fa-share-square"></i>');
    //var $text = $('<div class="text"></div>');

    //var $text = $('<button id="username">' + tweet.user + '</button>');



    // Append new HTML elements to the DOM
    img.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $tweet.appendTo($feed);// app
    //$text.appendTo($username);
    index -= 1;
  } // link tweets to log 11

  console.log(user);


};

    function handleUsernameClick(user) {
      // populate a feed with only the users tweets
      // if a username is referenced
      // use that username to populate only that users feed
      var i = streams.users.length - 1;

      while(i >= 0){
        var shawndrost = streams.users.shawndrost;
        //streams.users
        console.log('@', shawndrost);
        // if (shawndrost) {
        //   $message;
        //   console.log($message);
        // }
      }

    };


var $username = $('<button id="username"></button>');
$username.click("#username", function (event) {
  // if the username is clicked
  // render a feed with only that usernames tweets
  $feed.empty();
  handleUsernameClick(streams.users);


});

var $button = $('<button id="update-feed">Update Feed</button>');
$button.appendTo($app);
$button.click("#update-feed", function (event) {
  $feed.empty();
  renderFeed();

});


  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);
//console.log(user);
  renderFeed(streams.users);

});

