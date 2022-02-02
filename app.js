
$(document).ready(function () {
  //Select already existing elements
  var $app = $('#app');

  //Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $subtitle = $('<h2>Where Twiddlers be Twiddlin\</h2>')
  var $button = $('<button type="button" id="update-feed">Update Feed</button>')
  var $feed = $('<div id="feed"></div>')

  $("time.timeago").timeago();

  //Create event handler functions
  var handleTitleClick = function (event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert(`The ${titleType} of this page is ${event.target.innerText}`)
  }

  var renderFeed = function (user = 'home') {
    $feed.html('');
    var base = user === 'home' ? streams.home : streams.users[user];
    var index = base.length - 1

    while (index >= 0) {
      var tweet = base[index]
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $iconbar = $('<nav id="mainNavBar" class="navbar navbar-dark navbar-expand-md py-0"></nav>')

      //profile photo
      var imgsrc = base[index].profilePhotoURL;
      $profilePhoto = $('<img>');
      $profilePhoto.attr({ src: imgsrc, class: "profile-photo" });

      //icons
      faCommentIcon = "icon comment fas fa-thumbs-up fa-2x";
      faRetweetIcon = "icon retweet fas fa-satellite-dish fa-2x";
      faLikeIcon = "icon like fas fa-robot fa-2x";
      faShareIcon = "icon share fas fa-rocket fa-2x";

      $commentIcon = $('<i></i>');
      $commentIcon.attr({ class: faCommentIcon });
      $retweetIcon = $('<i></i>');
      $retweetIcon.attr({ class: faRetweetIcon });
      $likeIcon = $('<i></i>');
      $likeIcon.attr({ class: faLikeIcon });
      $shareIcon = $('<i></i>');
      $shareIcon.attr({ class: faShareIcon });


      //text updates & inputs
      $message.text(tweet.message);
      $username.text('@' + tweet.user);
      $timestamp.text(jQuery.timeago(tweet.created_at))

      //main tweet DIV
      $tweet.appendTo($feed);
      //sub DIVs
      $profilePhoto.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);

      $iconbar.appendTo($tweet);
      $commentIcon.appendTo($iconbar);
      $retweetIcon.appendTo($iconbar);
      $likeIcon.appendTo($iconbar);
      $shareIcon.appendTo($iconbar);

      index -= 1;
    }
  }

  //Set event listeners
  $title.on("click", handleTitleClick);
  $subtitle.on("click", handleTitleClick);
  $app.on("click", "button", function (event) {
    event.target.innerText = "Update Feed"
    renderFeed()
  })
  $feed.on("click", "div.username", function (event) {
    document.querySelector('button').innerText = "Back";
    var currUser = event.target.innerText.slice(1);
    renderFeed(currUser)
  })

  //Append new HTMl elements to the DOM
  $app.html('');
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);
  renderFeed();

});


window.isItBeautifulYet = true;

