$(document).ready(function(){
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1 id="title">TWIDDLER</h1>');
  var $subtitle = $('<h1 id="subtitle">RETURN OF THE WEBSITE</h1>');

  $app.html('');
  $title.appendTo($app);
  $subtitle.appendTo($app);

  $title.on("click", function(event) {
    //console.log(event);
    alert('The title of this page is: ' + event.target.innerText); // for each username click
});

var $button = $('<button id="update-feed">Update Feed</button>');
$button.appendTo($app);
$button.click( "#update-feed", function (event) {
  //$button = $('<button id="update-feed">Back</button>');
  $feed.empty();
  renderFeed();
});

$lightsaber = $('<img class="lightsaber" src="assets/img/lightsaber.png"> </img>');
$lightsaber.appendTo($app);


  // Create handler functions
  function renderFeed(user) {
  //$feed.html(''); // .empty?

  var index = streams.home.length - 1;
  console.log(user);
  //console.log(user, index, indexed);
    // if the username is not undefined
    // execute for streams user
    //debugger;
    if (user !== undefined) {
      var tweet = streams.home[index];
      //console.log(streams.users[user]);
      console.log(user, streams.users);
      var indexed = streams.users[user].length - 1;
      while(indexed >= 0){
        var username = streams.users;

        var img = $('<img class="profile-photo" src="assets/img/'+ user + '.png"> </img>');
        var $tweet = $('<div class="tweet tweet-container"></div>');
        var $message = $('<div class="message">' + tweet.message + '</div>');
        var $username = $('<div class="username">' + '@' + user + '</div>');
        var $timestamp = $('<div class="timestamp">' + jQuery.timeago(new Date(tweet.created_at)) + '</div>');
        var $comment = $('<i class="comment far fa-comment fa-lg"></i>');
        var $retweet = $('<i class="retweet fas fa-retweet fa-lg"></i>');
        var $like = $('<i class="like far fa-heart fa-lg"></i>');
        var $share = $('<i class="share far fa-share-square fa-lg"></i>');


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

        indexed -= 1;

      } // link tweets to log 11

    } else {
    //else use streams home --> generate all users
  // streams.users[user] access users tweets
  while(index >= 0){
    var tweet = streams.home[index];
    //console.log(tweet);
    var img = $('<img class="profile-photo" src="assets/img/'+ tweet.user + '.png"> </img>');
    var $tweet = $('<div class="tweet tweet-container"></div>');
    var $message = $('<div class="message">' + tweet.message + '</div>');
    var $username = $('<div class="username">' +  '@' + tweet.user + '</div>');
    var $timestamp = $('<div class="timestamp">' + jQuery.timeago(new Date(tweet.created_at)) + '</div>');
    var $comment = $('<i class="comment far fa-comment fa-lg"></i>');
    //console.log('<i class="far fa-comment"></i>');
    //console.log(var comment = $0);
    var $retweet = $('<i class="retweet fas fa-retweet fa-lg"></i>');
    var $like = $('<i class="like far fa-heart fa-lg"></i>');
    var $share = $('<i class="share far fa-share-square fa-lg"></i>');

    // //$username.appendTo($app);
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

    $username.on("click", function(event) {
      var usernameWithAt = event.target.innerText;
      var usernameWithoutAt = usernameWithAt.substring(1);
    console.log(event);
    $feed.empty();
    //console.log(event.target.innerText); // targets whatever text i have input for $username
    renderFeed(usernameWithoutAt); // for each username click
});

$username.click(function handleUsernameClick(){
  $button.toggleClass('Update Feed');

  if($button.hasClass('Update Feed')){
      $button.text('Back');
      $button.toggleClass('Back');
  }

  });

  $button.click(function(){
  
    //$button.toggleClass('Update Feed');
    $button.toggleClass('Back');
    if($button.hasClass('Back')){
        $button.text('Update Feed');
    }

    });

    index -= 1;
  } // link tweets to log 11
}

  //console.log(user);
};


  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);
//console.log(user);
  renderFeed();
  //renderFeed('mracus');
  //renderFeed('douglascalhoun');

  window.isItBeautifulYet = true;

});

