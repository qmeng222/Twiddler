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
    var time = tweet.created_at.toString().slice(0,15)
    $tweet.html('@' + '<a class="user_access" href=#>' + tweet.user + '</a>' + ': ' + tweet.message + '@' + time);
    $tweet.prependTo($feed);
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
    $tweet.html('@' + '<a class="user_access" href=#>' + tweet.user + '</a>' + ': ' + tweet.message + '@' + time);
    $tweet.prependTo($feed);
    index -= 1;
  }
};

//need to find out why buttons are clickable once
var $updateButton = $('<button class="update_button">Update Twiddler Feed</button>')
$updateButton.appendTo($app)
var $feed = $('<div class="feed_container"></div>')
$feed.appendTo($app)
getTweets()
$updateButton.on('click', function(){
  getTweets().prependTo($feed)
})

$('.user_access').on('click', function(event){
  console.log(event)
  $updateButton.text('Home')
  $feed.html('')
  var username = event.target.innerText;
  console.log(username)
  getUserTweets(username)
})

});

