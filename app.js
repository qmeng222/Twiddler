$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');
  //$app.html('');

  //Twiddler Title
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  //update feed button (UI)
  var $updateFeed = $('<button>Update Feed</button>');
  $updateFeed.appendTo($app);
  $updateFeed.on("click", function(event) {
    console.log(event);
    updateFeed();
  });

  //updates feed
  function updateFeed() {
    //clears feed to remove duplicates
    $('#feed').empty()

    //pushing tweets from dataGenerator.js to the DOM
    var index = streams.home.length - 1;
    while(index >= 0){
      //iterate thru msg reverse chronologically
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      $tweet.appendTo($feed);
      index -= 1;

      //tweet UI components
      var tweetUI = {
      $profilepic : $('<img class="profile-photo" src=' + tweet.profilePhotoURL + '><img/>'),
      $username   : $('<span class="username">' + '@' + tweet.user + '</span>'),
      $msg        : $('<p class="message">' + tweet.message + '</p>'),
      $timestamp  : $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>'),
      $comment    : $('<img class="icon, comment" src="assets/icons/placeholder.png">'),
      $retweet    : $('<img class="icon, retweet" src="assets/icons/placeholder.png">'),
      $like       : $('<img class="icon, like" src="assets/icons/placeholder.png">'),
      $share      : $('<img class="icon, share" src="assets/icons/placeholder.png">')
      };
      for(component in tweetUI) {
        tweetUI[component].appendTo($tweet);
      }
    }
  }

  //displays feed 1st time page is loaded
  var $feed = $('<div id="feed"></div>')
  $feed.appendTo($app)
  updateFeed();

});



