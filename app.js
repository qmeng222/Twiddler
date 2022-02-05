$(document).ready(function(){
  //Selecting already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2>Where Twiddlers be Twiddlin\'</h2>');
  var $updateFeed = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  //Create event handler functions
  var renderFeed = function(user) {
    user ?  index = streams.users[user].length - 1 : index = streams.home.length - 1;
    $feed.html('');

    while (index >= 0){
      if (user === undefined) {
        tweet = streams.home[index];
      } else {
        streams.users[user][index];
      }
      user ? tweet = streams.users[user][index] : tweet = streams.home[index];

      var $tweet = $('<div class="tweet"></div>')

      //Create user and tweet info
      var $profilePhoto = $('<img class="profile-photo" src=' +  tweet.profilePhotoURL + '></img>');
      var $username = $('<div class="username"></div>');
      var $message = $('<div class="message"></div>');
      var $timestamp = $('<div class="timestamp"></div>');

      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $timestamp.text(jQuery.timeago((tweet.created_at)));

      //Create icons
      var $comment = $('<i class="comment icon fas fa-comment">');
      var $retweet = $('<i class="retweet icon fas fa-retweet">');
      var $like = $('<i class="like icon fas fa-thumbs-up">');
      var $share = $('<i class="share icon fas fa-share">');
      var $iconContainer = $('<div class="icon-container"></div>')

      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);

      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);

      $comment.appendTo($iconContainer);
      $retweet.appendTo($iconContainer);
      $like.appendTo($iconContainer);
      $share.appendTo($iconContainer);

      $iconContainer.appendTo($tweet);



      //Append tweet to feed
      $tweet.appendTo($feed);

      index -= 1;

      //Create event handlers within the feed
      var handleUsernameClick = function() {
        var name = $(this).text().slice(1);
        $updateFeed.text() === 'Update Feed' ? $updateFeed.text('Back') : null;
        renderFeed(name);
      };

      //Set event listeners within the feed
      $username.on('click', handleUsernameClick);
    }
  }

  //Set event listeners (providing appropriate handlers as input)
  $updateFeed.on('click', function() {
    $updateFeed.text() === 'Back' ? $updateFeed.text('Update Feed') : null;
    renderFeed()
  });

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $updateFeed.appendTo($app);
  $feed.appendTo($app);

  renderFeed();
  window.isItBeautifulYet = true;
});