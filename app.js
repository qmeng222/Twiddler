$(document).ready(function(){
  var $app = $('#app');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  $app.html('');

  var renderFeed = function(clickedUser) {
    var checkClicked = streams.users[clickedUser] || streams.home;

    $feed.empty();

    var index = checkClicked.length - 1;

    while(index >= 0){
      var tweet = checkClicked[index];
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<div class="username"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $message = $('<div class="message"</div>');
      var $profilePic = $('<img class="profile-photo" src="./assets/img/' + tweet.user + '.png"></img>');
      var $comment = $('<i class="icon comment far fa-comment"></i>')
      var $retweet = $('<i class="icon retweet fas fa-retweet"></i>')
      var $like = $('<i class="icon like far fa-heart"></i>');
      var $share = $('<i class="icon share far fa-share-square"></i>');

      $username.text('@' + tweet.user);
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $message.text(tweet.message);
      $tweet.append($profilePic, $username, $timestamp, $message, $comment, $retweet, $like, $share);
      $tweet.appendTo($feed);

      index -= 1;

      $('.username').on("click", function(event) {
        var clicked = event.target.innerText;
        clicked = clicked.slice(1);
        clickUser(clicked);
      });
    }
  };

  renderFeed();
  $button.on("click", renderFeed);

  $button.appendTo($app);
  $feed.appendTo($app);

  function clickUser(user) {
    renderFeed(user);
    $button.text('Back');
    $button.on('click', function(event) {
      renderFeed();
      $button.text('Update Feed');
    })
  }

  window.isItBeautifulYet = true

});