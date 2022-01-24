$(document).ready(function(){
  var $app = $("#app");
  $app.html("");

  // adding title to the app
  var $app = $("#app");
  var $title = $("<h1>Twiddler</h1>");
  $title.appendTo($app);

  // adding home button and update-feed button to a <nav> bar
  var $nav = $("<nav></nav>");
  $("<button id='home'>Home</button>").appendTo($nav);
  $("<button id='update-feed'>Update Feed</button>").appendTo($nav);
  $nav.appendTo($app);

  // adding the friend list section
  $friendList = $("<ul id='friend-list'>Friend List</ul>");
  $.each(users, function(index, eachUser) {
    var friend = eachUser;
    $("<li class='each-friend'>" + friend + "</li>").appendTo($friendList);
  })
  $friendList.appendTo($app);

  // add new tweet section
  var $sendTweet = $("<form id='new-tweet'></form>");
  $("<h2>New Tweet</h2>").appendTo($sendTweet);
  $("<label for='user'>Username</label>").appendTo($sendTweet);
  $("<input type='text' id='user' name='user'><br>").appendTo($sendTweet);
  $("<label for='tweet'>Tweet</label>").appendTo($sendTweet);
  $("<textarea id='tweet' name='tweet' rows='5' cols='40'></textarea>").appendTo($sendTweet);
  $("<input class='btn' type='submit' value='Send'>").appendTo($sendTweet);
  $sendTweet.appendTo($app);

  // adding a section for tweets feed
  var $feed = $("<section id=feed></section>");
  $feed.appendTo($app);

  // function to render tweets with reverse chronological order
  var renderFeed = function(user){
    // if passed an argument (user)
    if (arguments.length !== 0) {
      var tweet = streams.users[user];
      var index = tweet.length - 1;
    }
    // if no argument passed
    if (arguments.length === 0){
      var tweet = streams.home;
      var index = tweet.length - 1;
    }

    // generate and append each tweet to the #tweet section
    while(index >= 0){
      var $eachTweet = $("<article class='tweet'></article>");

      // creating the content in each tweet, including profile photo, @username, timestamp, icons
      $("<img class='profile-photo' src=" + tweet[index].profilePhotoURL + ">").appendTo($eachTweet);
      $("<span class='username'>@" + tweet[index].user + "</span>").appendTo($eachTweet);
      var $timeago = $.timeago(tweet[index].created_at);
      $("<span class='timestamp'>" + $timeago+ "</span>").appendTo($eachTweet);
      $("<p class='message'>" + tweet[index].message + "</p>").appendTo($eachTweet);
      var $icons = $("<div class=icon></div>");
      $("<i class='comment far fa-comments'></i>").appendTo($icons)
      $("<i class='retweet fas fa-retweet'></i>").appendTo($icons);
      $("<i class='like far fa-heart'></i>").appendTo($icons);
      $("<i class='share far fa-share-square'></i>").appendTo($icons);
      $icons.appendTo($eachTweet);

      // append eachTweet to $feed section
      $eachTweet.appendTo($feed);

      index -= 1;
    }
  }
  // starting the app by rendering all feeds
  renderFeed();

  // event handler for "update-feed/back" button
  var handleClickButton = function(event) {
    var $buttonText = $("#update-feed").text();
    if ($buttonText === "Back") {
      $("#update-feed").text("Update Feed");
    }

    if ($buttonText === "Back") {
      $("#update-feed").text("Update Feed");
    }

    $feed.html('');
    renderFeed();
  };

  // event handler: @username click
  var handleUsernameClick = function(event) {
    var $clickedItem = $(event.target).is(".username");
    if ($clickedItem) {
      $("#update-feed").text("Back");

      var $textInUser = $(event.target).text();
      var username = $textInUser.replace(/[^a-zA-Z ]/g, "");
      $feed.html('');
      renderFeed(username);
    }
  };

  // event listner: "update-feed/back" button click
  $("#update-feed").on("click", handleClickButton);
  // event listner: "home" button click
  $("#home").on("click", handleClickButton);
  // event listner for @username
  $("#feed").on("click", handleUsernameClick)

  window.isItBeautifulYet = true;
});