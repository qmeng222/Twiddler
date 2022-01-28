$(document).ready(function(){
  var $app = $('#app');
  $app.html('');//clear app body

  var $title = $('<h1>Twiddler</h1>');

// Append the h1 element to the DOM, nested inside of the #app div
  $title.appendTo($app);

// Set a click event listener on the h1 element
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
});

  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed=$('<div id="feed"></div>');



  $updateFeed.appendTo($app);
  $updateFeed.on("click", function(event) {
    $feed.html('');//Remove all previously existing Tweets from the Feed
    if ($updateFeed.html() === "Back") {
      $updateFeed.text("Update Feed");
    }
    renderFeed()

});

  $feed.appendTo($app);

  var handleUsernameClick = function(event){
    $feed.html("");
    var user=event.target.innerText.substring(1);
    $updateFeed.text("Back");
    renderFeed(user);


};


  var renderFeed = function (user){
    $feed.html('');
    if(user===undefined){
      var index = streams.home.length - 1;
    } else{
      var index = streams.users[user].length - 1;
    }

    while(index >= 0){
      if (user=== undefined) {
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[user][index];
      }

    var $tweet = $('<div class="tweet"></div>');
    var $message = $('<div class="message"></div>');
    var $profileImg = $('<img class="profile-photo" src="./assets/img/' + tweet.user + '.png" alt="profile-photo"/>');
    var $username = $('<div class="username"></div>');
    var $timestamp = $('<div class= "timestamp"></div>');
    var $icons = $('<div id="icons"></div>');
    var $comment = $('<i class="comment fas fa-comment" alt="comment"></i>');
    var $retweet = $('<i class="retweet fas fa-retweet" alt="retweet"></i>');
    var $like = $('<i class="like fas fa-thumbs-up" alt="like"></i>');
    var $share =$('<i class="share fas fa-share" alt="share"></i>');


    $username.text('@'+tweet.user);
    $message.text(tweet.message);
    $timestamp.text(jQuery.timeago(tweet.created_at));
    $comment.appendTo($icons);
    $retweet.appendTo($icons);
    $like.appendTo($icons);
    $share.appendTo($icons);
    $profileImg.appendTo($tweet);
    $username.appendTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $icons.appendTo($tweet);
    $tweet.appendTo($feed)

    //$tweet.text('@' + tweet.user + ': ' + tweet.message);
    $username.on('click', handleUsernameClick);

    index -= 1;
    }
}

renderFeed();
$title.appendTo($app);
$updateFeed.appendTo($app);
$feed.appendTo($app);

window.isItBeautifulYet = true

});