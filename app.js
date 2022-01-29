$(document).ready(function(){
  // ======================================================================== //
  // < *-----------------Select already existing elements-----------------* > //
  // ======================================================================== //
  var $app = $("#app");
  $app.html("");

  // ======================================================================== //
  // < *---------------------Create new HTML elements---------------------* > //
  // ======================================================================== //
  // <!-----------------------------[sidebar]---------------------------------!> //
  var $header = $("<div class='header sticky'></div>")
  var $logoContainer = $("<div class='logo-container'></div>")
  var $logo = $("<img class='logo'></img>");
  $logo.attr("src", "assets/logo/amongus.png");
  var $titleContainer = $("<div class='title-container'></div>")
  var $title = $("<h1 class='title'>Twiddler</h1>");

  var $sidebar = $("<div class='sidebar'></div>");
  var $nav = $("<div class='nav sticky-nav'></div>");

  //nav content 1: accordion menu
  var $accordionNav = $("<div id='accordion'></div>");
  // 1. Crewmates
  var $navhead1 = $("<h3 class='nav-head-1'>Crewmates</h3>");
  var $friendslist = $("<ul id='friends-list'></ul>");
  var $friend1 = $("<li class='friend'><a href='#' class='friend-a'>@dontkillme</a></li>");
  var $friend2 = $("<li class='friend'><a href='#' class='friend-a'>@howtovent</a></li>");
  var $friend3 = $("<li class='friend'><a href='#' class='friend-a'>@notguilty</a></li>");
  var $friend4 = $("<li class='friend'><a href='#' class='friend-a'>@urimposter</a></li>");
  // 2. Map
  var $navhead2 = $("<h3 class='nav-head'>Map</h3>")
  // 3. Missions
  var $navhead3 = $("<h3 class='nav-head'>Missions</h3>")
  // 4. Messages
  var $navhead4 = $("<h3 class='nav-head'>Messages</h3>")
  // 5. Profile
  var $navhead5 = $("<h3 class='nav-head'>Profile</h3>")

  //nav content 2: Start Game button
  var $startgamecontainer = $("<div class='start-game-container'></div>");
  var $startgamebutton = $("<button id='start-game'>Start Game</button>");

  //nav content 3: Profile Summary
  var $profilesummary = $("<div class='profilesummary'></div>");

  // <!-----------------------------[feed content]---------------------------------!> //
  var $newPost = $("<div id='new-tweet-form'></div>");
  var $newPostProfile = $("<div class='form-container_left'></div>");

  // var $newPostInput = $("<div class='form-container_right'></div>");
  var $newPostInput = $("<form class='form-container_right'></form>");

  var $newPostInputTop = $("<div class='form-input-top'></div>");
  var $newPostInputMid = $("<div class='form-input-mid'></div>");
  var $newPostInputMidCount = $("<div class='form-input-mid-ct'></div>");
  var $newPostInputBottom = $("<div class='form-input-bottom'></div>");

  var $buttonContainer = $("<div class='buttonContainer'></div>");
  var $button = $("<button id='update-feed'>Update Feed</button>");

  var $feed = $("<div id='feed'></div>"); // *id required

  // <!-----------------------------[sidebar-right]--------------------------------!> //
  var $sidebarRight = $("<div class='sidebar-right'></div>");
  var $searchbarContainer = $("<div id='searchbar-container'></div>");
  var $searchbar = $("<input id='searchbar' type='text' placeholder='Search Twiddler'></input>");

  // ======================================================================== //
  // < *------------------Create event handler functions------------------* > //
  // ======================================================================== //

  // Load the form for posting tweets when the page is accessed
  $.fn.postMsg = function () {
    var $myProfilePhoto = $("<img class='my-profile-photo'></img>");
    $myProfilePhoto.attr("src", "assets/img/default-user.png");

    var $myusername = $("<input type='text' id='myusername' placeholder='@username' maxlength='12'></input>");
    var $textarea = $("<textarea placeholder='What&#39s happening?'></textarea>");
    var $currentchars = $("<span id='currentchars'>0</span>")
    var $maxchars = $("<span id='maxchars'>/ 250</span>")
    var $icons = $("<div class='myicons'></div>");
    var $submit = $("<input type='submit' value='Report' class='submit'></input>");
    //icons
    var $media = $("<i class='far fa-images media'></i>");
    var $poll = $("<i class='fas fa-poll-h poll'></i>");
    var $emoji = $("<i class='far fa-smile emoji'></i>");
    var $schedule = $("<i class='far fa-calendar-alt'></i>");
    var $location = $("<i class='fas fa-map-marker-alt location'></i>");

    // Count characters
    $textarea.keyup(function(e) {
      // when you start typing the submit button is no longer opaque
      $submit.css("opacity", "1");
      // starts counting characters you type
      $total = $(this).val().length;
      if ($total <= 250) {
        $currentchars.text($total);
      } else {
        // when the number of characters reach 250
        $currentchars.text("250");
        $(this).val($(this).val().substring(0, 250));
        // prevent writing more characters
        $textarea.attr("readonly");
      }
    });

    //appendTo
    $myProfilePhoto.appendTo($newPostProfile);
    $myusername.appendTo($newPostInputTop);

    $textarea.appendTo($newPostInputMid);
    $maxchars.appendTo($newPostInputMidCount);
    $currentchars.appendTo($newPostInputMidCount);

    $icons.appendTo($newPostInputBottom);
    $media.appendTo($icons);
    $poll.appendTo($icons);
    $emoji.appendTo($icons);
    $schedule.appendTo($icons);
    $location.appendTo($icons);
    $submit.appendTo($newPostInputBottom);
  }

  // Load tweets when the page is accessed
  $.fn.renderFeed = function (user) {

    // Default: when username is not clicked
    if (!user) {
      // render all the tweets in the home feed
      var currentScreen = streams.home;
    // Or when username is clicked
    } else {
      // Remove the existing tweets
      $(".tweet").remove();
      // Render the page to show only the clicked user's tweets
      var currentScreen = streams.users[user.slice(1)];
    }

    // the total number of tweets per user
    var index = currentScreen.length - 1;
    console.log("The total number of tweets by " + user + " is " + index);

    while(index >= 0){
      var tweet = currentScreen[index];
      // Declare div.tweet, appending it to div.feed
      var $tweet = $("<div class='tweet'></div>");
      var $tweetContainerLeft = $("<div class='tweet-container-left'></div>");
      var $tweetContainerRight = $("<div class='tweet-container-right'></div>");
      var $tweetContainerRightTop = $("<div class='tweet-container-right_top'></div>");
      var $tweetContainerRightTopTxt = $("<div class='tweet-container-right_top-txt'></div>");

      var $profilePhoto = $("<img class='profile-photo'></img>");
      // Change the profile image src to match the username
      $profilePhoto.attr("src", function(){
        return "assets/img/" + tweet.user + ".png";
      });

      var $username = $("<div class='username'></div>");
      var $timestamp = $("<div class='timestamp'></div>");
      var $message = $("<div class='message'></div>");
      var $icons = $("<div class='icons'></div>");

      // Icons
      var $more = $("<i class='fas fa-ellipsis-h more'></i>");
      var $iconComment = $("<i class='far fa-comment comment'></i>");
      var $iconRetweet = $("<i class='fas fa-sync-alt retweet'></i>");
      var $iconLike = $("<i class='far fa-heart like'></i>");
      var $iconShare = $("<i class='far fa-paper-plane share'></i>");

      // Icons change color on hover - if I want to do this with js
      // $(function() {
      //   $("i").hover(function() {
      //     $(this).css("color", "red");
      //   },
      //   function() {
      //     $(this).css("color", "black");
      //   }).css("cursor", "pointer");
      // });

      // Text elements in each tweet box
      $username.text("@" + tweet.user);
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $message.text(tweet.message);

      // Click username
      $username.on("click", function() {
        var clickedUsername = $(this).text();
        $.fn.handleUsernameClick(clickedUsername);

        // Invoke the function that changes the button text
        // $.fn.handleUsernameClick(clickedUsername);

        if (!user) {
          $button.on("click", function() {
            $button.text("Update Feed");
          });
        }

      }).css("cursor", "pointer");


      index -= 1;
      // store the tweets inside feed div, which is inside app div
      $tweet.appendTo($feed);

      $tweetContainerLeft.appendTo($tweet);
      $profilePhoto.appendTo($tweetContainerLeft);

      $tweetContainerRight.appendTo($tweet);

      $tweetContainerRightTop.appendTo($tweetContainerRight);
      $tweetContainerRightTopTxt.appendTo($tweetContainerRightTop);
      $username.appendTo($tweetContainerRightTopTxt);
      $timestamp.appendTo($tweetContainerRightTopTxt);
      $more.appendTo($tweetContainerRightTop);

      $message.appendTo($tweetContainerRight);
      $icons.appendTo($tweetContainerRight);
      $iconComment.appendTo($icons);
      $iconRetweet.appendTo($icons);
      $iconLike.appendTo($icons);
      $iconShare.appendTo($icons);
    }
  }

  $.fn.handleUsernameClick = function(clickedUsername) {
    // the username has been clicked > the button text is now set to 'Back'
    $button.text("Back");
    // click the button and the text changes to 'Update Feed'
    $button.on("click", function() {
    // the text changes back to 'Update Feed'
    $(this).text($(this).text() == "Back" ? "Update Feed" : "Back");
    });

    // Pass the cliked username to renderFeed as param
    // to generate only the clicked username's tweets
    $.fn.renderFeed(clickedUsername);
  }

  // When the page is first accessed, render feed with undefined user
  $.fn.renderFeed();
  $.fn.postMsg();

  // ======================================================================== //
  // < *--Set event listeners (providing appropriate handlers as inputs)--* > //
  // ======================================================================== //

  // when the button is first clicked (default: #update-feed)
  $button.on("click", function() {
    // Remove all previously existing Tweets from the Feed
    $(".tweet").remove();
    // Load new tweets
    $.fn.renderFeed();
  }).css("cursor", "pointer");

  // when username in the friend list is clicked, filter the tweets
  // **need to figure out how to group each friend as a single var
  $friend1.on("click", function(clickedUsername) {
    console.log("friend is clicked!");
    $(".tweet").remove();
    clickedUsername = $(this).text();
    $.fn.handleUsernameClick(clickedUsername);
  }).css("cursor", "pointer");
  $friend2.on("click", function(clickedUsername) {
    console.log("friend is clicked!");
    $(".tweet").remove();
    clickedUsername = $(this).text();
    $.fn.handleUsernameClick(clickedUsername);
  }).css("cursor", "pointer");
  $friend3.on("click", function(clickedUsername) {
    console.log("friend is clicked!");
    $(".tweet").remove();
    clickedUsername = $(this).text();
    $.fn.handleUsernameClick(clickedUsername);
  }).css("cursor", "pointer");
  $friend4.on("click", function(clickedUsername) {
    console.log("friend is clicked!");
    $(".tweet").remove();
    clickedUsername = $(this).text();
    $.fn.handleUsernameClick(clickedUsername);
  }).css("cursor", "pointer");

  // when submit ('Tweet') is clickedsave the new tweet data in localStorage


  // ======================================================================== //
  // < *---------------Append new HTML elements to the DOM----------------* > //
  // ======================================================================== //

  // <!-----------------------------[sidebar]---------------------------------!> //
  $header.appendTo($app);
  $logoContainer.appendTo($header);
  $logo.appendTo($logoContainer);
  $titleContainer.appendTo($header);
  $title.appendTo($titleContainer);

  $sidebar.appendTo($app);
  $nav.appendTo($sidebar);

  $accordionNav.appendTo($nav);
  $navhead1.appendTo($accordionNav);
  $friendslist.appendTo($accordionNav);
  $friend1.appendTo($friendslist);
  $friend2.appendTo($friendslist);
  $friend3.appendTo($friendslist);
  $friend4.appendTo($friendslist);
  $navhead2.appendTo($accordionNav);
  $navhead3.appendTo($accordionNav);
  $navhead4.appendTo($accordionNav);
  $navhead5.appendTo($accordionNav);

  $startgamecontainer.appendTo($nav);
  $startgamebutton.appendTo($startgamecontainer);

  $profilesummary.appendTo($nav);

  // <!------------------------------[feed]---------------------------------!> //
  // top: new-tweet-form
  $newPost.appendTo($app);
  $newPostProfile.appendTo($newPost);
  $newPostInput.appendTo($newPost);
  $newPostInputTop.appendTo($newPostInput);
  $newPostInputMid.appendTo($newPostInput);
  $newPostInputMidCount.appendTo($newPostInputMid);
  $newPostInputBottom.appendTo($newPostInput);

  // mid: button (update-feed / back)
  $buttonContainer.appendTo($app);
  $button.appendTo($buttonContainer);

  // bottom: live tweet feed
  $feed.appendTo($app);

  // <!-----------------------------[sidebar-right]--------------------------------!> //
  // $sidebarRight.appendTo($app);
  // $searchbarContainer.appendTo($sidebarRight);
  // $searchbar.appendTo($searchbarContainer);

  window.isItBeautifulYet = true;
});