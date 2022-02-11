$(document).ready(function() {
  var $app = $('#app');
  $app.html('');

  var $title = $('<h1>Twiddler</h1>');
  var $updateButton = $('<button id="update-feed">Update Feed</button>');
  var $feed= $('<div id="feed"></div>');



  $title.on("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });


  var renderFeed = function (user){
    if(user === undefined){
      user= streams.home;
    }
    var index = user.length - 1;
    while(index >= 0){
      var tweet = user[index];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto=$('<img class="profile-photo"></img>');
      var $username=$('<span class= "username"></span>');
      var $message=$('<p class= "message"></p>');
      var $timeStamp=$('<span class= "timestamp"></span>');
      var $comment=$('<i class="fas fa-comment-alt icon comment"></i>');
      var $retweet=$('<i class="fab fa-twitter icon retweet"></i>');
      var $like=$('<i class= "fas fa-heart icon like"></i>');
      var $share=$('<i class= "fas fa-share icon share"></i>');


      $profilePhoto.attr('src', tweet.profilePhotoURL);
      $timeStamp.text(jQuery.timeago(tweet.created_at));
      $username.text('@' + tweet.user);
      $message.text(tweet.message);

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      $tweet.appendTo($feed);
      index -= 1;

      $username.on("click", function(event) {
        var name = event.currentTarget.innerText.slice(1);
        $feed.empty()
        $updateButton.html("Back");
        renderFeed(streams.users[name]);
        });
    }
  }



  $updateButton.on("click", function(event) {
    if ($updateButton.html() === "Back"){
      $updateButton.html("Update Feed");
    }
    $feed.empty()
    renderFeed();
    });

  $title.appendTo($app);
  $updateButton.appendTo($app);
  $feed.appendTo($app);

  renderFeed();

  window.isItBeautifulYet = true
});