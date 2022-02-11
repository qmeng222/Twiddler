$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  //create an h1 element with the text 'Twiddler'
  var $title = $('<h1>Twiddler 2.0</h1>');
  //append the h1 element to the DOM, nested inside the #app div
  $title.appendTo($app);

  /*set a click event listener on the h1 element
  $title.on('click', function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });
  */

  var $refreshFeed = $('<button id="update-feed"class="button button1">Update Feed</button>');
  $refreshFeed.on('click', function(event) {
    renderTweets();
  })
  $refreshFeed.appendTo($app);

  var $feed = $('<div id="feed">Feed</div>');
  $feed.appendTo($app);

  renderTweets();

  function renderTweets() {
    //create a div with the text 'Feed' & append it to the DOM
    var $feed = $('#feed');
    $feed.html("");

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<div class="username"></div>');
      var $profilePic = $("<img src='assets/img/douglascalhoun.png' class='profile-photo'>");
      var $message = $('<div class="message"></div>');
      var $time = $('<div class="timestamp"></div>');
      var $comment = $('<i class="comment fa-solid fa-comment"></i>');
      var $like = $('<i class="like fa-solid fa-heart">');
      var $share = $('<i class="share fa-solid fa-share-from-square"></i>');
      var $retweet = $('<i class="retweet fa-solid fa-retweet"></i>');

      //$tweet.text('@' + tweet.user + ': ' + tweet.message);
      $user.text('@' + tweet.user);
      $message.text(tweet.message);
      $time.append(jQuery.timeago(tweet.created_at));
      jQuery("time.timeago").timeago();
      $tweet.append($user, $profilePic, $message, $time, $like, $comment, $retweet, $share);
      $tweet.appendTo($feed);
      index -= 1;

      let userName = tweet.user;
      $user.on("click", function() {
        renderUserTweets(userName);
      });
    }
    $refreshFeed.text("Refresh Feed");
  }


  function renderUserTweets(userName) {
    var $feed = $('#feed');
    $feed.html("");

    var index = streams.users[userName].length - 1;
    while (index >= 0) {
      var userTweet = streams.users[userName][index];
      var $tweet = $('<div class="tweet"></div>');
      var $user = $('<div class="username"></div>');
      var $profilePic = $("<img src='assets/img/douglascalhoun.png' class='profile-photo'>");
      var $message = $('<div class="message"></div>');
      var $time = $('<div class="timestamp"></div>');
      var $comment = $('<i class="comment fa-solid fa-comment"></i>');
      var $like = $('<i class="like fa-solid fa-heart">');
      var $share = $('<i class="share fa-solid fa-share-from-square"></i>');
      var $retweet = $('<i class="retweet fa-solid fa-retweet"></i>');

      $user.text('@' + userTweet.user);
      $message.text(userTweet.message);
      $time.text(userTweet.created_at);
      $tweet.append($user, $message, $time, $like, $comment, $retweet, $share);
      $tweet.appendTo($feed);
      index -= 1;
    }
    $refreshFeed.text("Back");
  }

  window.isItBeautifulYet = true;

});