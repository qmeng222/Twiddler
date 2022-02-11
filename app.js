$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  var $header = $('<header></header>'); //Header is added to page
  $header.appendTo($app);
  $('<button class="interactive heading" id="update-feed">Update Feed</button>').appendTo($header);
  $('<h1 class="heading">Twiddler</h1>').appendTo($header);

  // $('<div class="heading" id="sign-in"><h3 class="new-user">Sign in here!</h3><input class="register"><button class="interactive heading" id="submit">LOG<br>IN</button></div>').appendTo($header);



  $('<div id="feed"></div>').appendTo($app); //Feed is added to page
  var $feed = $('#feed');

  $('<nav class="widget" id="friends"><h2>Friend List</h2><ul id="friendlist"></ul></nav').appendTo($app); //Friend list is added to page
  var $friendlist = $('#friendlist');
  $('<li class="friend interactive">shawndrost</li>').appendTo($friendlist);
  $('<li class="friend interactive">sharksforcheap</li>').appendTo($friendlist);
  $('<li class="friend interactive">mracus</li>').appendTo($friendlist);
  $('<li class="friend interactive">douglascalhoun</li>').appendTo($friendlist);

  $('<form id="new-tweet-form"></form>').appendTo($app);
  var $newTweet = $('#new-tweet-form');
  $('<label for="username">Username</label>').appendTo($newTweet);
  $('<input name="username">').appendTo($newTweet);
  $('<label for="message">Tweet Message</label>').appendTo($newTweet);
  $('<input name="message">').appendTo($newTweet);
  $('<input type="submit" class="interactive" id="send-tweet" value="Post">').appendTo($newTweet);


  var renderFeed = function(userFeed) {
    $feed.html('');
    if(userFeed === undefined) { //If no user selected, default renders home feed
      userFeed = streams.home;
      $('#update-feed').html('Update Feed');
    } else {
      $('#update-feed').html('Back');
    }
    for (var i = 0; i < userFeed.length; i++) {
      var tweet = userFeed[i]; //Tweet format is created
      var $tweet = $('<div class="tweet"></div>');
      var $tweetData = $('<div id="tweetData"></div>');
      var $message = $('<p class="message"></p>');
      var $icons = $('<div id="icon-container"></div>');

      $('<img class="user-data profile-photo" src="' + tweet.profilePhotoURL + '">').appendTo($tweetData); //User data is parsed here
      $('<span class="user-data username interactive">@' + tweet.user + '</span>').appendTo($tweetData);
      $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>').appendTo($tweetData);


      //Add timestamp here

      $message.text(tweet.message); //message and timestap are parsed here

      $('<i class="fa-solid fa-comment icons comment"></i>').appendTo($icons); //interaction icons are added
      $('<i class="fa-solid fa-retweet icons retweet"></i>').appendTo($icons);
      $('<i class="fa-solid fa-heart icons like"></i>').appendTo($icons);
      $('<i class="fa-solid fa-share-from-square icons share"></i>').appendTo($icons);

      $tweetData.appendTo($tweet); //Parsed data input into tweet format
      $message.appendTo($tweet);
      $icons.appendTo($tweet);



      $tweet.prependTo($feed); //Tweet added to feed
    }

  }
  var homeFeed = function() {
    renderFeed();
    $('.user-data').click(function() {
      var user = $(this).parent().find('.username').text().substring(1);
      user = streams.users[user];
      renderFeed(user);
    });
  }
  homeFeed();
  $("#update-feed").click(function() {
    homeFeed();
  });
  $('.friend').click(function() {
    var user = $(this).text();
    user = streams.users[user];
    renderFeed(user);
  });




  //function newUser
  //On submit form, invoke function
  //set local var newUser to input
  //if newUser is undefined, alert no input
  //set global currentUser variable to local variable
  //streams.user[currentUser] = [];
  //append currentUser to friends list with class "friend user"

  //function sentTweet
  //On submit form, invoke function
  //if no user/input, alert
  //var newTweet = {}
  //tweet.user = currentUser
  //tweet.message = input
  //tweet.created_at = new Date();
  //tweet.profilePhotoURL = default pic;
  //addTweet(newTweet);
  window.isItBeautifulYet = true;
});