$(document).ready(function(){
  $("time.timeago").timeago();
  // Select already existing elements
  var $app = $('#app');

  // Create new HTML elements
  var $title = $('<h1 class="title">Twiddler</h1>');
  var $homeFeed = $("<div id='feed'></div>");
  var $button = $("<button id='update-feed' type='button'>Update Feed</button>");
  var $userFeed = $("<div class='userFeed'></div>")
  var $tweetDiv = $('<div class="tweetDiv"></div>');
  var $tweetPic = $('<img class="profile-photo" src="assets/img/fsociety.png">');
  var $visitorName = $('<span class="username fsociety">@fsociety</span>');
  var $tweetForm = $('<form class="tweetForm" enctype="multipart/form-data" name="tweetForm">What\'s on your mind?<br><textarea class="textArea" name="tweet" rows="12" cols="62"></textarea></form>');
  var $tweetButton = $('<button class="tweetSubmit" type="button">Post Tweet!</button>');
  var commentToggle = false;

  // Create event handler functions
  function renderFeed() {
    $('#feed').hide();
    $('#feed').fadeIn(0); // 750
    clearFeed();
    renderTweets();
  }

  function renderTweets(user) {
    var homeStream;
    if (user === undefined) {
      homeStream = streams.home;
    }
    else {
      homeStream = streams.users[user];
    }
    for (var i = homeStream.length - 1; i >= 0; i--) {
      var tweet = homeStream[i];
      var $tweet = $('<div class="tweet"></div>');
      var $profilePhoto = $("<img class='profile-photo' src='assets/img/" + tweet.user + ".png'>");
      var $userName = $("<span class='username " + tweet.user + "'>@" + tweet.user + "</span>");
      var $message = $("<p class='message'>" + tweet.message + "</p>");
      var $timeStamp = $("<div class='timestamp'>" + $.timeago(tweet.created_at) + "</div>");
      var $iconC = $("<i class='icon comment fas fa-comment-dots fa-2x'></i>");
      var $iconR = $("<i class='icon retweet fas fa-retweet fa-2x'></i>");
      var $iconL = $("<i class='icon like far fa-thumbs-up fa-2x'></i>");
      var $iconS = $("<i class='icon share fab fa-slideshare fa-2x'></i>");
      var $commentDiv = $("<div class='commentDiv'></div>");
      var $commentForm = $("<form class='commentForm' action='mailto:mitchwintrow@iamwintrow.com' method='POST' enctype='multipart/form-data' name='EmailForm'>Comment:<br><textarea class='textArea' name='comment' rows='12' cols='24'></textarea><br><input class='commentSubmit' type='submit' value='Submit'></form>");
      $profilePhoto.appendTo($tweet);
      if (tweet.user === 'douglascalhoun') {
        $('.douglascalhoun').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('douglascalhoun');
        });
      } else if (tweet.user === 'mracus') {
        $('.mracus').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('mracus');
        });
      } else if (tweet.user === 'sharksforcheap') {
        $('.sharksforcheap').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('sharksforcheap');
        });
      } else if (tweet.user === 'shawndrost') {
        $('.shawndrost').on("click", function() {
          $('#feed').hide();
          $('#feed').fadeIn(0); // 750
          renderUserFeed('shawndrost');
        });
      }
      $userName.appendTo($tweet);
      $message.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $('.comment').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.comment').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      $('.retweet').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.retweet').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      $('.like').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.like').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      $('.like').on('click', function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.share').mouseenter(function(e) {
        $(this).css('background-color', 'blue');
      });
      $('.share').mouseleave(function(e) {
        $(this).css('background-color', 'dodgerblue');
      });
      $('.comment').on('click', function(e) {
        $('.commentForm').hide();
        $('.commentForm').slideDown(250);
      });
      $('.commentSubmit').on('click', function(e) {
        $('.commentForm').slideUp(250);
      });
      // $('.comment').on('click', function(e) {
      //   if (commentToggle === false) {
      //     $('.commentForm').hide();
      //     $('.commentForm').slideDown(250);
      //     commentToggle = true;
      //   } else if (commentToggle === true) {
      //     $('.commentForm').slideUp(250);
      //     commentToggle = false;
      //   }
      // });
      $iconC.appendTo($tweet);
      $iconR.appendTo($tweet);
      $iconL.appendTo($tweet);
      $iconS.appendTo($tweet);
      $commentDiv.appendTo($tweet);
      $commentForm.appendTo($commentDiv);
      $tweet.appendTo($homeFeed);
    }
  }

  function clearFeed() {
    if ($homeFeed.length > 0) {
      for (var i = 0; i < $homeFeed.length; i++) {
        $('#feed .tweet').remove();
      }
    }
  }

  function renderUserFeed(user) {
    clearFeed();
    $("#update-feed").text("Back");
    renderTweets(user);
  }

  function renderFSociety() {
    console.log('working on it!');
    // clearFeed();
    // renderFSocietyTweet();
    // renderTweets();
  }

  // Set event listeners (providing appropriate handlers as input)
  $title.on('click', function(e) {
    console.log(e);
    alert('The title of this page is: ' + event.target.innerText);
  });
  $button.on("click", function(e) {
    console.log('The feed has been refreshed');
    if ($("#update-feed").val().indexOf('Update Feed') === -1) {
      $("#update-feed").text('Update Feed');
    }
    renderFeed();
  });
  $button.hover(function(e) {
    $(e.target).css('background-color', 'blue');
  }, function(e) {
    $(e.target).css('background-color', 'dodgerblue');
  });
  $tweetButton.on('click', function(e) {
    // console.log('working on it!');
    // console.log(e);
    renderFSociety();
  });
  // $tweetButton.on('mouseenter', function(e) {
  //   $(e.target).css('background-color', 'blue');
  // });
  // $tweetButton.on('mouseleave', function(e) {
  //   $(e.target).css('background-color', 'dodgerblue');
  // });
  $tweetButton.hover(function(e) {
    $(e.target).css('background-color', 'blue');
  }, function(e) {
    $(e.target).css('background-color', 'dodgerblue');
  });

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $tweetDiv.appendTo($app);
  $tweetPic.appendTo($tweetDiv);
  $visitorName.appendTo($tweetDiv);
  $tweetForm.appendTo($tweetDiv);
  $tweetButton.appendTo($tweetDiv);
  $button.appendTo($app);
  $homeFeed.appendTo($app);


  renderFeed();
  window.isItBeautifulYet = true;

});