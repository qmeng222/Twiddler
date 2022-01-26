$(document).ready(function(){
  $("time.timeago").timeago();
  var $app = $('#app');
  $app.html('');

//Heading
  var $title = $('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on("click", function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  });

//Update Button Made
  var $update = $('<button id="update-feed">Update Feed</button>');$update.appendTo($app);


//Create Feed Element
  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

//Hover
  var inMouse = function() {
    $(this).css("color", "#262220");
  };

  var outMouse = function() {
    $(this).css("color", "#A15C38");
  };


//Gets New Tweets
  var newTweets = function() {
    $feed.html('');
    var index = streams.home.length - 1;
    while (index >= 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet"></div>');

      $('<img class="profile-photo" img src="assets/img/' + tweet.user + '.png" alt="" width="50px"/>').appendTo($tweet);

      var $message = $('<div class="message"></div>');
      $message.html(tweet.message);
      $message.appendTo($tweet);

      var $username = $('<div class="username"></div>');
      $username.html('@' + tweet.user);
      $username.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.html($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $icon = $('<div class="icon"></div>');
        $('<i class="like far fa-heart fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
        $('<i class="comment far fa-comments fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
        $('<i class="retweet fas fa-retweet fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
        $('<i class="share fas fa-share fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
      $icon.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }

  };


//Puts Intital Tweets On Page
  newTweets();


//Calls On Update
  $update.on("click", function(newUpdates) {
    newUpdates.preventDefault();
    $update.text('Update Feed');
    newTweets();
  });



//Click User
  $feed.on('click', '.username', function(event) {
    $feed.html('');
    $update.text('Back');
    var username = event.target.innerText.slice(1);

    var index = streams.users[username].length -1;
    while (index >= 0){
      var tweet = streams.users[username][index];
      var $tweet = $('<div class="tweet"></div>');

      $('<img class="profile-photo" img src="assets/img/' + tweet.user + '.png" alt="" width="50px"/>').appendTo($tweet);

      var $message = $('<div class="message"></div>');
      $message.html(tweet.message);
      $message.appendTo($tweet);

      var $username = $('<div class="username"></div>');
      $username.html('@' + tweet.user);
      $username.appendTo($tweet);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.html($.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $icon = $('<div class="icon"></div>');
        $('<i class="like far fa-heart fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
        $('<i class="comment far fa-comments fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
        $('<i class="retweet fas fa-retweet fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
        $('<i class="share fas fa-share fa-lg"></i>').on({"mouseover": inMouse, "mouseout": outMouse}).appendTo($icon);
      $icon.appendTo($tweet);
      $tweet.appendTo($feed);

      index -= 1;
    }

  });


});

