
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

  var renderFeed = function () {
    $feed.html('');
    var index = streams.home.length - 1;

    while (index >= 0) {
      var tweet = streams.home[index]; //no jQuery.. data from backend
      var $tweet = $('<div class="tweet"></div>'); //use $ to create new div
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $timestamp = $('<div class="timestamp"></div><br>');

      //profile photo
      var imgsrc = streams.home[index].profilePhotoURL
      $profilePhoto = $('<img>');
      $profilePhoto.attr({ src: imgsrc, class: "profile-photo" });

      //icons
      faCommentIcon = "icon comment fas fa-thumbs-up fa-3x";
      faRetweetIcon = "icon retweet fas fa-satellite-dish fa-3x";
      faLikeIcon = "icon like fas fa-robot fa-3x";
      faShareIcon = "icon share fas fa-rocket fa-3x";

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
      $tweet.appendTo($feed); //was app
      //sub DIVs
      $profilePhoto.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);

      $username.on("click", function (event) {
        console.log(event, event.currentTarget.innerText);
        alert("Button has been pressed " + event.currentTarget.innerText);
        document.querySelector('button').innerText = "Back";
        var currUser = event.currentTarget.innerText.slice(1);
        userFeed(currUser);
      })
      index -= 1;
    }
  }


  var userFeed = function (user) {
    $feed.html('');
    var index = streams.users[user].length - 1;

    while (index >= 0) {
      var tweet = streams.users[user][index];
      var $tweet = $('<div class="tweet"></div>');
      var $message = $('<div class="message"></div>');
      var $username = $('<div class="username"></div>');
      var $timestamp = $('<div class="timestamp"></div><br>');

      //profile photo
      var imgsrc = tweet.profilePhotoURL

      $profilePhoto = $('<img>');
      $profilePhoto.attr({ src: imgsrc, class: "profile-photo" });

      //icons
      faCommentIcon = "icon comment fas fa-thumbs-up fa-3x";
      faRetweetIcon = "icon retweet fas fa-satellite-dish fa-3x";
      faLikeIcon = "icon like fas fa-robot fa-3x";
      faShareIcon = "icon share fas fa-rocket fa-3x";

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
      $timestamp.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $commentIcon.appendTo($tweet);
      $retweetIcon.appendTo($tweet);
      $likeIcon.appendTo($tweet);
      $shareIcon.appendTo($tweet);

      index -= 1;
    }

    $button.on("click", function (event) {
      document.querySelector('button').innerText = "Update Feed";
      renderFeed()
    })
  }

  //Set event listeners
  $title.on("click", handleTitleClick);
  $subtitle.on("click", handleTitleClick);
  $button.on("click", renderFeed);


  //Append new HTMl elements to the DOM
  $app.html(''); //removes any html from the page
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);
  renderFeed();

});



window.isItBeautifulYet = true;

