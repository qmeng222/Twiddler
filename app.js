$(document).ready(function(){

  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button type="button" id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');
  // var $usernamelink = $('.username');

  // Create event handler functions
  var handleTitleClick = function(event) {
    console.log(event);
    alert('The title of this page is: ' + event.target.innerText);
  }
  // Renders the Tweets in the Home Stream if no input is provided for user
  // Renders the Tweets in a specific User Stream if a user is provided as input

  var renderFeed = function(inputUser) {
    var arrToRender = [];
    if (inputUser == undefined) {
      arrToRender = streams.home;
    } else {
      arrToRender = streams.home.filter(tweet => tweet.user == inputUser.slice(1));
    }
    var index = arrToRender.length - 1;
    $feed.empty();
    while(index >= 0){
      var tweet = arrToRender[index];
      var $tweet = $("<div class='tweet'></div>");
      var $profilephoto = $("<img class='profile-photo'></img>");
      $profilephoto.attr("src", './assets/img/' + tweet.user + '.png');
      $tweet.append($profilephoto);

      var $username = $("<div class='username';></div>")
      $username.text('@' + tweet.user)
      // $username.change(function() {
      //   $username.css("font-family", $(this).val('Fira Sans', sans-serif));
      // });
      // $username.on('click', handleUsernameClick); // need to figure out how to make username a global variable
      $username.click(function() {
        $button.text($button.text() == 'Update Feed' ? 'Back' : 'Back');
        renderFeed($(this).text());
        // alert($(this).text());
      });
      $tweet.append($username);
      var $message = $("<div class='message'></div>");
      $message.text(tweet.message);
      $tweet.append($message);
      var $timestamp = $("<div class='timestamp'></div>");
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $tweet.append($timestamp);
      $icon = $("<i class='icon fas fa-icons'></i>");
      $tweet.append($icon);
      $comment = $("<i class='comment far fa-comment'></i>");
      $tweet.append($comment);
      $retweet = $("<i class='retweet fas fa-retweet'></i>");
      $tweet.append($retweet);
      $like = $("<i class='like far fa-heart'></i>");
      $tweet.append($like);
      $share = $("<i class='share fas fa-share-alt-square'></i>");
      $tweet.append($share);
      // user feed additions below
      // if (user === null) {
      //   $tweet.appendTo($feed);
      // } else if(streams.home[index].user === user) {
      //   $tweet.appendTo($feed);
      // }
      $tweet.appendTo($feed);
      // console.log($username);
      index -= 1;
    }
  };
   renderFeed();


  // Set event listeners (providing appropriate handlers as input) // Note: research event delegation
  $title.on('click', handleTitleClick);
  $button.click(function() {
    $(this).text($(this).text() == 'Back' ? 'Update Feed' : 'Update Feed');
    renderFeed();
  });


  // $comment.on( "mouseover", function(event) {
  //   // $(this).css( "color", "red" );
  // });
  // $("i").hover(
  //   function() {
  //     $( this ).css("color", "red");
  //   },
  // );

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);
});



 // Toggles your button's text from "Update Feed" to "Back" if the button's text is currently "Update Feed"
    // Re-renders the Feed with only the clicked user's Tweets
    // $feed.filter(streams.home[index].user).show();
      // var buttonContent = document.getElementsByID("update-feed")[0];
      // if(buttonContent.innerHTML === "Back ") {
      //   $button.text("Update Feed");
      // } else {
      //   $button.text("Back");
      // }
      // $feed.filter(____) OR $feed.show(____)
      // renderFeed();
      // renderFeed(inputUser);