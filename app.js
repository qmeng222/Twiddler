$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $('#app');

  //Twiddler Title
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  //update feed button (UI)
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  $updateFeed.appendTo($app);
  $updateFeed.on("click", function(event) {
    console.log(event);
    renderFeed();
    $updateFeed.html('Update Feed');
  });

  //displays feed 1st time page is loaded
  var $feed = $('<div id="feed"></div>')
  $feed.appendTo($app)
  renderFeed();

  //updates feed
  function renderFeed(user) {
    $('#feed').empty()

    if (user === undefined) {
      var index = streams.home.length - 1;
    } else {
      var index = streams.users[user].length - 1;
    }
    while(index >= 0){
      if (user === undefined) {
        var tweet = streams.home[index];
      } else {
        var tweet = streams.users[user][index];
      }

      var $tweet = $('<div class="tweet"></div>');
      $tweet.appendTo($feed);
      index -= 1;

      //tweet UI components
      var tweetUI = {
      $profilepic : $('<img class="profile-photo" src=' + tweet.profilePhotoURL + '><img/>'),
      $username   : $('<div class="username">' + '@' + tweet.user + '</div>'),
      $msg        : $('<p class="message"> ' + tweet.message + '</p>'),
      $timestamp  : $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>'),
      $comment    : $('<i class="icon comment fas fa-comments"></i>'),
      $retweet    : $('<i class="icon retweet fas fa-retweet"></i>'),
      $like       : $('<i class="icon like fas fa-heart"></i>'),
      $share      : $('<i class="icon share fas fa-share"></i>')
      };
      for(component in tweetUI) {
        tweetUI[component].appendTo($tweet);
      }

      $(".username").on("click", function(event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        renderFeed($(this).text().slice(1));
        console.log($(this).text().slice(1))
        //console.log(this.className)
        $updateFeed.html('Back');
      });
    }
  }
  window.isItBeautifulYet = true;
});



