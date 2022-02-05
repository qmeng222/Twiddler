$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  var $title = $('<h1 class="title"> Twiddler </h1>');
  var $updateFeed = $('<button type="button" id="update-feed" class="updateFeed">Update Feed</button>');
  var $feed = $('<div id = "feed" class="feed"></div>')

  var renderFeed = function(user) {
    //queue up alltweets for user's feed
    var allTweets = streams.users[user] || streams.home;
    //Clear previous feed to prevent duplicates
    $('#feed').empty();


    for (var i = allTweets.length - 1; i >= 0; i-- ){
      var tweet = allTweets[i];
      var $tweet = $('<div class="tweet"></div>');

      //profile photo with <img or div tag>, src
      var $pfp = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"/>');
      //Username <span or Div> format @username
      var $user = $('<div class="username">@' + tweet.user + '</div>');
      //message <span, p, or div>
      var $message = $('<p class="message">' + tweet.message + '</p>');
      //timestamp <span or div>
      var $time = $('<div class="timestamp">' + jQuery.timeago(tweet.created_at) + '</div>');
      //four <img id=icon> -- coment retweet like share
      var $comment = $('<i class="icon comment fas fa-comment-dots fa-fw"></i>');
      var $retweet = $('<i class="icon retweet fas fa-retweet fa-fw"></i>');
      var $like = $('<i class="icon like fas fa-heart fa-fw"></i>');
      var $share = $('<i class="icon share fas fa-share fa-fw"></i>');

      $tweet.append($pfp);
      $tweet.append($user);
      $tweet.append($message);
      $tweet.append($time);
      $tweet.append($comment);
      $tweet.append($retweet);
      $tweet.append($like);
      $tweet.append($share);

      $tweet.appendTo($feed);
      $('.username').on("click", function(event){
        var user = event.target.innerText;
        user = user.slice(1);
        filterFeed(user);
      });
    }
  }

  function filterFeed(user) {
    renderFeed(user);
    $updateFeed.html('Back');
    $updateFeed.on('click', function(even) {
      renderFeed();
      $updateFeed.text('Update Feed');
    })
  }

  renderFeed();
  $updateFeed.on("click", renderFeed);

  $title.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

  $('.username').on("click", function(event){
    var user = event.target.innerText;
    user = user.slice(1);
    filterFeed(user);
  });

  window.isItBeautifulYet = true

});