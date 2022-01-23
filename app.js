$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  $("time.timeago").timeago();

  var $left = $('<div class="left"></div>');

  var $header = $('<header class="page-header"><h1>Twiddler</h1></header>');
  var $sidebar = $('<div class="sidebar"></div>');
  var $feed = $('<div class="feed" id="feed"></div>');

  var $updatefeed = $('<button class="update-feed-button" id="update-feed">Update Feed</button>');
  var $friendslist = $('<div class="friends-list"></div>');

  var $friendsheader = $('<h4>Friends List</h4>');
  var $shawndrost = $('<li>shawndrost</li>');
  var $sharksforcheap = $('<li>sharksforcheap</li>');
  var $mracus = $('<li>mracus</li>');
  var $douglascalhoun = $('<li>douglascalhoun</li>');

  $shawndrost.click(function(){
    updateFeed($(this).text());
  })

  $sharksforcheap.click(function(){
    updateFeed($(this).text());
  })

  $mracus.click(function(){
    updateFeed($(this).text());
  })

  $douglascalhoun.click(function(){
    updateFeed($(this).text());
  })

  $friendsheader.appendTo($friendslist);
  $shawndrost.appendTo($friendslist);
  $sharksforcheap.appendTo($friendslist);
  $mracus.appendTo($friendslist);
  $douglascalhoun.appendTo($friendslist);

  $updatefeed.appendTo($sidebar);
  $friendslist.appendTo($sidebar);

  $header.appendTo($left);
  $sidebar.appendTo($left);

  $left.appendTo($app);

  var updateFeed = function(name = "home") {
    $(".feed").empty();
    var targetArray = [];
    if (name === "home") {
      var index = streams.home.length - 1;
      targetArray = streams.home;
      $updatefeed.text('Update Feed')
    } else {
      var index = streams.users[name].length - 1;
      targetArray = streams.users[name];
      $updatefeed.text('Back');
    }

    while(index >= 0){
      var tweet = targetArray[index];

      var $tweet = $('<div class="tweet"></div>');
      var $image = $('<img src="#" alt="Temp" class="profile-photo"/>');
      var $top = $('<div class="top"></div>');
      var $container = $('<div class="container"></div>');
      var $buttons = $('<div class="buttons"></div>');

      var $user = $('<span class="username"></span>');
      var $time = $('<span class="timestamp"><time class="timeago"></time></span>');
      var $message = $('<p class="message"></p>');
      var $btn1 = $('<i class="comment fa-comment far "></i>');
      var $btn2 = $('<i class="retweet fa-retweet fas"></i>');
      var $btn3 = $('<i class="like fa-heart far"></i>');
      var $btn4 = $('<i class="share fa-share fas"></i>');

      $tweet.text();
      $image.attr("src",tweet.profilePhotoURL);
      $user.text('@' + tweet.user);
      $user.click(function(){
        updateFeed($(this).text().slice(1));
      })
      $message.text(tweet.message);
      $time.attr("datetime",$.timeago(tweet.created_at));
      $time.text($.timeago(tweet.created_at));

      $image.appendTo($tweet);
      $user.appendTo($top);
      $time.appendTo($top);
      $top.appendTo($container);
      $message.appendTo($container);
      $btn1.appendTo($buttons);
      $btn2.appendTo($buttons);
      $btn3.appendTo($buttons);
      $btn4.appendTo($buttons);
      $buttons.appendTo($container);
      $container.appendTo($tweet);

      $tweet.appendTo($feed);

      $feed.appendTo($app);

      index -= 1;
    }
  }

  updateFeed();

  $updatefeed.on("click", function(){updateFeed();});

  window.isItBeautifulYet = true;
});