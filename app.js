//  $(document).ready(function () {
//   var $app = $("#app");
//    $app.html("");
//    var $maintweedfeed = $('<div id="maintweedfeed"></div>');
//    $maintweedfeed.html("");
//   var $title = $("<h1>Twiddler</h1>");
//  // Append the h1 element to the DOM, nested inside of the #app div
//    $title.appendTo($app);
//     $maintweedfeed.appendTo($app);
//     var $homeBotton = $('<button id="feed"></button>');
//     // $homeBotton.html("");
//     $homeBotton.text("Home Feed");
//     $homeBotton.appendTo($app);

//     var maintweedfeed=[]

//    // var $deletebotton = $('<button class = "deletebutton"> delete</button>'); //delete button
//    // $deletebotton.appendTo($app);



// function addNewTweeds(){
//    var index = streams.home.length - 1;
//    while (index >= 0) {
//      var tweet = streams.home[index];
//   //   if (!maintweedfeed.includes(tweet) ){
//      var $tweet = $("<div class=tweet></div>");
//      $tweet.text("@" + tweet.user + ": " + tweet.message);
//      if (tweet.user === "mracus") {
//       // $tweet.text("@"+ <button class="mr">mracus</button> + ": "+ tweet.message);


//        $tweet.prepend('<button class = "mr" ><img src="./assets/img/mracus.png" /></botton>');
//      }
//      if (tweet.user === "douglascalhoun") {
//       // $tweet.addClass("dlh");
//        $tweet.prepend(
//          '<button class = "dlh" ><img src="./assets/img/douglascalhoun.png" /></botton>'
//        );
//      }
//      if (tweet.user === "sharksforcheap") {
//       // $tweet.addClass("sfc");
//        $tweet.prepend(
//          '<button class = "sfc" ><img src="./assets/img/sharksforcheap.png" /></botton>'
//        );
//      }
//      if (tweet.user === "shawndrost") {
//       // $tweet.addClass("sd");
//        $tweet.prepend(
//          '<button class = "sfc" ><img src="./assets/img/shawndrost.png" /></botton>'
//        );
//      }
//      $tweet.appendTo($maintweedfeed);
//      maintweedfeed.push(tweet)
//      //var $tweetuser = $('<div class="user"></div>');
//      //$tweetuser.text(tweet.user);
//      //$tweetuser.prependTo($maintweedfeed)
//      index -= 1;
//    // }else {
//    //  index -= 1;
//   //  }
//    }
//   }
//   addNewTweeds();
//   $homeBotton.click(function () {
//     $(".tweet").remove();
//     addNewTweeds();
//   });
//    $(".mr").click(function () {
//      $(".sd").hide();
//    });

//  });
$(document).ready(function () {
  var $app = $("#app");
  $app.html("");

  var $title = $("<h1> Twiddler</h1>");

  $title.appendTo($app);

  var $button = $("<button id=update-feed>Update Feed</button>");

  var renderFeed = function () {
    var $feed = $("<div id=feed></div>");
    $feed.appendTo($app);
    var index = streams.home.length - 1;
    while (index >= 0) {
      var tweet = streams.home[index];
      var $tweet = $("<div class=tweet></div>");

      var $photoShawndrost = $(
        "<img class=profile-photo src=assets/img/shawndrost.png />"
      );
      var $photoMracus = $(
        "<img class=profile-photo src=assets/img/mracus.png />"
      );
      var $photoSharksforcheap = $(
        "<img class=profile-photo src=assets/img/sharksforcheap.png />"
      );
      var $photoDouglascalhoun = $(
        "<img class=profile-photo src=assets/img/douglascalhoun.png />"
      );

      if (tweet.user === "shawndrost") {
        $photoShawndrost.prependTo($tweet);
      }
      if (tweet.user === "mracus") {
        $photoMracus.prependTo($tweet);
      }
      if (tweet.user === "sharksforcheap") {
        $photoSharksforcheap.prependTo($tweet);
      }
      if (tweet.user === "douglascalhoun") {
        $photoDouglascalhoun.prependTo($tweet);
      }

      var $username = $("<div class=username></div>");
      $username.text("@" + tweet.user);
      $username.on("click", handleUsernameClick);
      $username.appendTo($tweet);

      var $message = $("<div class=message></div>");
      $message.text(tweet.message);
      $message.appendTo($tweet);

      var $timestamp = $("<div class=timestamp></div>");
      $timestamp.text(jQuery.timeago(tweet.created_at));
      $timestamp.appendTo($tweet);

      var $comment = $('<i class="icon comment fas fa-comment"/>');
      $comment.appendTo($tweet);
      var $retweet = $('<i class="icon retweet fas fa-retweet"/>');
      $retweet.appendTo($tweet);
      var $like = $('<i class="icon like fas fa-thumbs-up"/>');
      $like.appendTo($tweet);
      var $share = $('<i class="icon share fas fa-share-alt"/>');
      $share.appendTo($tweet);

      $(".icon").hover(
        function () {
          $(this).css("color", "blue");
        },
        function () {
          $(this).css("color", "black");
        }
      );

      $tweet.appendTo($feed);
      index -= 1;
    }
  };

  var userFeed = function (username) {
    var $feed = $("<div id=feed></div>");
    $feed.appendTo($app);
    for (var key in streams.users) {
      if (key === username) {
        var index = streams.users[key].length - 1;
        while (index >= 0) {
          var tweet = streams.users[key][index];
          var $tweet = $("<div class=tweet></div>");

          var $photoShawndrost = $(
            "<img class=profile-photo src=assets/img/shawndrost.png />"
          );
          var $photoMracus = $(
            "<img class=profile-photo src=assets/img/mracus.png />"
          );
          var $photoSharksforcheap = $(
            "<img class=profile-photo src=assets/img/sharksforcheap.png />"
          );
          var $photoDouglascalhoun = $(
            "<img class=profile-photo src=assets/img/douglascalhoun.png />"
          );

          if (username === "shawndrost") {
            $photoShawndrost.prependTo($tweet);
          }
          if (username === "mracus") {
            $photoMracus.prependTo($tweet);
          }
          if (username === "sharksforcheap") {
            $photoSharksforcheap.prependTo($tweet);
          }
          if (username === "douglascalhoun") {
            $photoDouglascalhoun.prependTo($tweet);
          }

          var $username = $("<div class=username></div>");
          $username.text("@" + tweet.user);
          $(".username").on("click", handleUsernameClick);
          $username.appendTo($tweet);

          var $message = $("<div class=message></div>");
          $message.text(tweet.message);
          $message.appendTo($tweet);

          var $timestamp = $("<div class=timestamp></div>");
          $timestamp.text(jQuery.timeago(tweet.created_at));
          $timestamp.appendTo($tweet);

          var $comment = $('<i class="icon comment fa-solid fa-comment"/>');
          $comment.appendTo($tweet);
          var $retweet = $('<i class="icon retweet fa-solid fa-retweet"/>');
          $retweet.appendTo($tweet);
          var $like = $('<i class="icon like fa-solid fa-heart"/>');
          $like.appendTo($tweet);
          var $share = $('<i class="icon share fa-solid fa-share"/>');
          $share.appendTo($tweet);

          $(".icon").hover(
            function () {
              $(this).css("color", "black");
            },
            function () {
              $(this).css("color", "black");
            }
          );

          $tweet.appendTo($feed);
          index -= 1;
        }
      }
    }
  };

  $button.appendTo($app);
  renderFeed();

  var handleButtonClick = function () {
    $("#feed").remove();
    renderFeed();
    $button.text("Update Feed");
  };

  $button.on("click", handleButtonClick);

  var handleUsernameClick = function () {
    $("#feed").remove();
    $button.text("Back");
    var username = $(this).text().substring(1);
    userFeed(username);
  };
});
window.isItBeautifulYet = true;