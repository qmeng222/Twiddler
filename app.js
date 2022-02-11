var visitor;
$(document).ready(function(){
  var $app = $('#app');
  $app.html('');

  $('<header></header>').appendTo($app); //Header is added to page
  $('<button class="interactive heading" id="update-feed">Update</button>').appendTo('header');
  $('<h1 class="heading interactive" id="current-feed">Home Feed</h1>').appendTo('header');
  $('<h1 class="heading">Twiddler</h1>').appendTo('header');

  $('<div id="feed"></div>').appendTo($app); //Feed is added to page
  $('<div id="sidebars"></div>').appendTo($app);
  var $feed = $('#feed');
  var $sidebars = $('#sidebars');

  var newTweetTemplate = (function () {
    var $newTweet = $('<form class="sidebar" id="new-tweet-form"></form>'); //new tweet template
    $('<label for="username">Username</label>').appendTo($newTweet);
    $('<input name="username" id="username">').appendTo($newTweet);
    $('<label for="message">Tweet Message</label>').appendTo($newTweet);
    $('<input name="message" id="new-message">').appendTo($newTweet);
    $('<input type="submit" class="interactive" id="send-tweet" value="Post Tweet">').appendTo($newTweet);
    return $newTweet;
  })();

  var renderSidebar = function() {
    $sidebars.html('');
    $('<nav class="sidebar" id="friends"><h2>Friend List</h2><ul id="friendlist"></ul></nav').appendTo($sidebars); //Renders friend list
    var $friendlist = $('#friendlist');
    for (var key in streams.users) {
      $('<li class="friend interactive">' + key + '</li>').appendTo($friendlist);
    }

    newTweetTemplate.clone().appendTo($sidebars);

    $( "#new-tweet-form" ).click(function(event) { //write a new tweet
      event.preventDefault();
      visitor = $('#username').val();
      writeTweet($('#new-message').val());
      homeFeed();
      renderSidebar();
    });

    $('li.friend').click(function() { //Renders user feed from friend list
      var user = $(this).text();
      renderFeed(user);
    });
  };

  var tweetIcons = (function () { //Creates icon container object
    var $icons = $('<div id="icon-container"></div>');
    $('<i class="fa-solid fa-comment icons comment"></i>').appendTo($icons);
    $('<i class="fa-solid fa-retweet icons retweet"></i>').appendTo($icons);
    $('<i class="fa-solid fa-heart icons like"></i>').appendTo($icons);
    $('<i class="fa-solid fa-share-from-square icons share"></i>').appendTo($icons);
    console.log(typeof $icons);
    return $icons;
  })();

  var renderFeed = function(username) {
    $feed.html('');
    var userFeed;
    if(username === undefined) { //If no user selected, default renders home feed
      userFeed = streams.home;
      $('#update-feed').html('Update');
      $('#current-feed').html('Home');
    } else {
      $('#update-feed').html('Back');
      $('#current-feed').html('@' + username);
      userFeed = streams.users[username];
    }
    for (var i = 0; i < userFeed.length; i++) {
      var tweet = userFeed[i];
      var $tweet = $('<div class="tweet"></div>'); //Tweet format is created
      var $tweetData = $('<div id="tweetData"></div>');


      $('<img class="profile-photo" src="' + tweet.profilePhotoURL + '">').appendTo($tweetData); //Tweet data is parsed
      $('<span class="friend interactive">@' + tweet.user + '</span>').appendTo($tweetData);
      $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>').appendTo($tweetData);



      $tweetData.appendTo($tweet);
      $('<p class="message">' + tweet.message + '</p>').appendTo($tweet);
      tweetIcons.clone().appendTo($tweet);
      $tweet.prependTo($feed); //Tweet added to top of feed
    }
  }

  var homeFeed = function () { //Renders the home feed
    renderFeed();
    $('span.friend').click(function () {
      var user = $(this).parent().find('.friend').text().substring(1);
      renderFeed(user);
    });
  };
  renderSidebar();
  homeFeed();


  $("#update-feed").click(homeFeed); //Updates home feed

  $("#current-feed").click(function () { //updates a specific user's feed
    var user = $(this).text();
    if(user === 'Home') {
      homeFeed();
    } else { renderFeed(user.substring(1)); }
  });

  window.isItBeautifulYet = true;
});