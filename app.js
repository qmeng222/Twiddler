$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  jQuery(document).ready(function() {
    jQuery("span.timestamp").timeago();
  });

  //page title
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    alert('The title of this page is ' + event.target.innerText);
  });

  //feed where tweets are displayed
  var $homefeed = $('<div id="feed"></div>');
  $homefeed.appendTo($app);

  //helper function to create new feed.
  var renderFeed = function (tweet) {

    $tweet = $('<div class="tweet"></div>');
    var $tweettime = $('<span class="timestamp"></span>')
    var $tweetmessage = $('<span class="message"></span>');
    var $tweetuser = $('<span class="username"></span>');
    var $profilepic = $('<img class="profile-photo" src="assets/img/' + tweet.user + '.png"/>')
    var $comment = $('<i class="comment fa-solid fa-comment"></i>');
    var $retweet = $('<i class="retweet fa-solid fa-retweet"></i>');
    var $like = $('<i class="like fa-solid fa-heart"></i>');
    var $share = $('<i class="share fa-solid fa-share"></i>');
    var time = jQuery.timeago(tweet.created_at);
    $tweetmessage.text(tweet.message + ' ');
    $tweetuser.text('@' + tweet.user + ': ');
    $tweettime.text(time);
    $tweetmessage.appendTo($tweet);
    $tweetuser.prependTo($tweet);
    $profilepic.prependTo($tweet);
    $tweettime.appendTo($tweet);
    $comment.appendTo($tweet);
    $retweet.appendTo($tweet);
    $like.appendTo($tweet);
    $share.appendTo($tweet);
    $tweet.appendTo($homefeed);
  };

  //renderFeed upon document ready
  var index = streams.home.length - 1;
  while (index >= 0) {
    var tweet = streams.home[index];
    renderFeed(tweet);
    index -= 1;
  }

  //renderFeed when update button is pressed
  var updateFeed = function () {
    $( ".tweet" ).remove();
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      renderFeed(tweet);
      index -= 1;
    }
  };

  //render specific user feed when username is clicked
  var userFeed = function (user) {

    user = user.substring(1, user.length - 2);

    $( ".tweet" ).remove();
    var index = streams.users[user].length - 1;
    while (index >= 0) {
      var tweet = streams.users[user][index];
      renderFeed(tweet);
      index -= 1;
    }
  }

  //update feed button
  var $button = $('<button id="update-feed">Update Feed</button>');
  $button.appendTo($app);
  $button.on("click", function(event) {
    $('#update-feed').text(function(i, text) {
      if(text === 'Back') {
        return 'Update Feed'
      }
    });
    updateFeed();
 });


  //event for when username is clicked
  $(document).on('click', 'span.username', function () {
    userFeed($(this).text());
    $('#update-feed').text('Back')
  });

  window.isItBeautifulYet = true;
});

