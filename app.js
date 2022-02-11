var visitor;
$(document).ready(function(){
  var $app = $('#app');
  $app.html('');


  $('<header></header>').appendTo($app); //Header is added to page
  $('<button class="interactive heading" id="update-feed">Update Feed</button>').appendTo('header');
  $('<h1 class="heading">Twiddler</h1>').appendTo('header');



  $('<div id="feed"></div>').appendTo($app); //Feed is added to page
  $('<div id="sidebars"></div>').appendTo($app);
  var $feed = $('#feed');
  var $sidebars = $('#sidebars');

  var renderSidebar = function() {
    $sidebars.html('');
    $('<nav class="sidebar" id="friends"><h2>Friend List</h2><ul id="friendlist"></ul></nav').appendTo($sidebars); //Renders friend list
    var $friendlist = $('#friendlist');
    for (var key in streams.users) {
      $('<li class="friend interactive">' + key + '</li>').appendTo($friendlist);
    }

    var $newTweet = $('<form class="sidebar" id="new-tweet-form"></form>'); //Renders new tweet form
    $('<label for="username">Username</label>').appendTo($newTweet);
    $('<input name="username" id="username">').appendTo($newTweet);
    $('<label for="message">Tweet Message</label>').appendTo($newTweet);
    $('<input name="message" id="new-message">').appendTo($newTweet);
    $('<input type="submit" class="interactive" id="send-tweet" value="Post Tweet">').appendTo($newTweet);

    $newTweet.appendTo($sidebars);

    $( "#new-tweet-form" ).submit(function(event) {
      event.preventDefault();
      visitor = $('#username').val();
      var message = $('#new-message').val();
      writeTweet(message);
      homeFeed();
      renderSidebar();
    });
    $('li.friend').click(function() {
      var user = $(this).text();
      user = streams.users[user];
      renderFeed(user);
    });
  };

  var renderFeed = function(userFeed) {
    $feed.html('');
    if(userFeed === undefined) { //If no user selected, default renders home feed
      userFeed = streams.home;
      $('#update-feed').html('Update Feed');
    } else {
      $('#update-feed').html('Back');
    }
    for (var i = 0; i < userFeed.length; i++) {
      var tweet = userFeed[i];
      var $tweet = $('<div class="tweet"></div>'); //Tweet format is created
      var $tweetData = $('<div id="tweetData"></div>');
      var $icons = $('<div id="icon-container"></div>');

      $('<img class="user-data profile-photo" src="' + tweet.profilePhotoURL + '">').appendTo($tweetData); //Tweet data is parsed
      $('<span class="user-data friend interactive">@' + tweet.user + '</span>').appendTo($tweetData);
      $('<span class="timestamp">' + jQuery.timeago(tweet.created_at) + '</span>').appendTo($tweetData);

      $('<i class="fa-solid fa-comment icons comment"></i>').appendTo($icons); //interaction icons are added
      $('<i class="fa-solid fa-retweet icons retweet"></i>').appendTo($icons);
      $('<i class="fa-solid fa-heart icons like"></i>').appendTo($icons);
      $('<i class="fa-solid fa-share-from-square icons share"></i>').appendTo($icons);

      $tweetData.appendTo($tweet); //Parsed data input into tweet format
      $('<p class="message">' + tweet.message + '</p>').appendTo($tweet);
      $icons.appendTo($tweet);
      $tweet.prependTo($feed); //Tweet added to top of feed
    }
  }

  var homeFeed = function () {
    renderFeed();
    $('span.user-data').click(function () {
      var user = $(this).parent().find('.friend').text().substring(1);
      user = streams.users[user];
      renderFeed(user);
    });
  };
  renderSidebar();
  homeFeed();


  $("#update-feed").click(function () {
    homeFeed();
  });




  window.isItBeautifulYet = true;
});