
$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $header = $('<div class="header"></div>')
  $header.appendTo($app)
  var $title = $('<h1>Twiddler</h1>')
  $title.appendTo($app)
  $title.on('click', function(event){
    console.log(event)
    alert('The title of this page is: ' + event.target.innerText);
  })

  var getTweets = function(){
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $timestamp = $('<p class="timestamp">' + tweet.created_at + '</p>')
    // var $username = $('<p class="username"></p>');
    // $username.html('@' + tweet.user);
    var $message = $('<div class="message">' + '@' + '<a class="username" href=#>' + tweet.user + '</a>' + ': ' + tweet.message + '<br>' + '@' + $timestamp + '</div>');
    var image = function(name){
      if(name === 'douglascalhoun'){
        var $douglascalhoun = $('<img class="profile-picture" src="images/cute_puppy.jpeg"></img>')
        $douglascalhoun.prependTo($tweet)
      } else if(name === 'shawndrost'){
        var $shawndrost = $('<img class="profile-picture" src="images/turtle.jpeg"></img>')
        $shawndrost.prependTo($tweet)
      } else if(name === 'mracus'){
        var $mracus = $('<img class="profile-picture" src="images/polar_bear.jpeg"></img>')
        $mracus.prependTo($tweet)
      } else if(name === 'sharksforcheap'){
        var $sharksforcheap = $('<img class="profile-picture" src="images/hedgehog.jpeg"></img>')
        $sharksforcheap.prependTo($tweet)
      }
    }
    image(tweet.user)
    var $icons = $('<div class="icons">' + '<br>' + '<i class="like"><img src="images/like.jpeg" class="icon"></img></i>' + ' ' + '<i class="comment"><img src="images/comment.png" class="icon"></img></i>' + ' ' + '<i class="share"><img src="images/share.png" class="icon"></img></i>' + ' ' + '<i class="retweet"><img src="images/retweet.png" class="icon"></img>></i>' + '</div>')
    $message.appendTo($tweet)
    $icons.appendTo($tweet)
    $tweet.appendTo($feed);
    index -= 1;
  }
}

var getUserTweets = function(username) {
  console.log('clicked');
  var index = streams.users[username].length - 1;
  while(index >= 0){
    var tweet = streams.users[username][index];
    var $tweet = $('<div class="tweet"></div>');
    var time = tweet.created_at.toString().slice(0,15)
    var $message = $('<div class="message">' + '@' + '<a class="user_access" href=#>' + tweet.user + '</a>' + ': ' + tweet.message + '<br>' + '@' + time + '</div>');
    var image = function(name){
      if(name === 'douglascalhoun'){
        var $douglascalhoun = $('<img class="images" src="images/cute_puppy.jpeg" ></img>')
        $douglascalhoun.prependTo($tweet)
      } else if(name === 'shawndrost'){
        var $shawndrost = $('<img class="images" src="images/turtle.jpeg" class="></img>')
        $shawndrost.prependTo($tweet)
      } else if(name === 'mracus'){
        var $mracus = $('<img class="images" src="images/polar_bear.jpeg" class="></img>')
        $mracus.prependTo($tweet)
      } else if(name === 'sharksforcheap'){
        var $sharksforcheap = $('<img class="images" src="images/hedgehog.jpeg"></img>')
        $sharksforcheap.prependTo($tweet)
      }
    }
    image(tweet.user)
    var $icons = $('<div class="icons">' + '<br>' + '<i class="like"><img src="images/like.jpeg" class="icon"></img></i>' + ' ' + '<i class="comment"><img src="images/comment.png" class="icon"></img></i>' + ' ' + '<i class="share"><img src="images/share.png" class="icon"></img></i>' + ' ' + '<i class="retweet"><img src="images/retweet.png" class="icon"></img>></i>' + '</div>')
    $message.appendTo($tweet)
    $icons.appendTo($tweet)
    $tweet.prependTo($feed);
    index -= 1;
  }
};

//need to find out why buttons are clickable once
var $updateButton = $('<button id="update-feed">Update Twiddler Feed</button>')
$updateButton.appendTo($app)
var $feed = $('<div id="feed"></div>')
$feed.appendTo($app)
getTweets()
$updateButton.on('click', function(){
  if($updateButton.text() === "Back"){
    $updateButton.text('Update Twiddler Feed')
  }
  $feed.html('')
  getTweets()
})

$('.user_access').on('click', function(event){
  console.log(event)
  $updateButton.text('Back')
  $feed.html('')
  var username = event.target.innerText;
  console.log(username)
  getUserTweets(username)
})

});

