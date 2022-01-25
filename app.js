$(document).ready(function(){
  jQuery("time.timeago").timeago();

  // Select already existing elements
  var $app = $('#app');
  $app.html('');


  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $refresh = $('<button id=update-feed>Update feed</button>');
  var $feed = $('<div id=feed></div>')


  // Create event handler functions

  // Set event listeners
   $title.on("click", function(event) {
   console.log(event);
   alert('The title of this page is: ' + event.target.innerText);
  });


  $refresh.on("click", function() {
    var currentInnerText = $refresh.html();
    if (currentInnerText === "Back") {
      $refresh.html("Update feed")
      renderFeed();
    }
    else {
      renderFeed(undefined, "update");
      console.log('updated feed!');
    }
  });




  // Append new HTML elements to DOM
  $title.appendTo($app);
  $refresh.appendTo($app);
  $feed.appendTo($app);





  // Create helper function: renderFeed()
  var renderFeed = function(user, update) {
    $(".username").on("click", function(event) {
      //  console.log(event.target.innerText);
      $usernames = $(".username");

       var userToGet = event.target.innerText;
       userToGet = userToGet.slice(1, userToGet.length - 1);
       console.log(userToGet);
      // debugger;
      var $buttonToChange = $("#update-feed");
      $buttonToChange.html("Back");

       renderFeed(userToGet);

     })

    if (user === undefined && update === undefined) {
      $('#feed').empty()

      var latest = 0;
      var index = streams.home.length - 1;
      while(index >= 0){

        var tweet = streams.home[index];

        var $tweet = $('<div class="tweet"></div>');

        var profile_pic = tweet.profilePhotoURL;
        var $profilePhoto = $(`<img class="profile-photo" src="${profile_pic}"></img>`);
        $profilePhoto.appendTo($tweet);


        var $username = $('<div class=username></div>');
        $username.text('@' + tweet.user + ': ');
        $username.appendTo($tweet); //comment out to here

        var $message = $('<div class="message"></div>'); //comment out to revert to default
        $message.text(tweet.message);
        $message.appendTo($tweet);

        var $timeStamp = $('<div class="timestamp"></div>');
        $timeStamp.text(jQuery.timeago(new Date(tweet.created_at)));
        $timeStamp.appendTo($tweet);

          var $comment = $('<i class="fas fa-comments comment"></i>');
          var $retweet = $('<i class="fas fa-retweet retweet"></i>');
          var $like = $('<i class="fas fa-heart like"></i>');
          var $share = $('<i class="fas fa-share share"></i>');

        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);

        $tweet.appendTo($feed);

        index--;
        latest++;

      }

    }

    else if (user && update === undefined){
      $('#feed').empty()

      var index = streams.users[user]["length"] - 1;
      // console.log("logging index:", index, streams.users[userToGet])

      for (var x = index; x >= 0; x--) {
        var tweet = streams.users[user][x];

        var $tweet = $('<div class="tweet"></div>');

        var profile_pic = tweet.profilePhotoURL;
        var $profilePhoto = $(`<img class="profile-photo" src="${profile_pic}"></img>`);
        $profilePhoto.appendTo($tweet);


        var $username = $('<div class=username></div>');
        $username.text('@' + tweet.user + ': ');
        $username.appendTo($tweet); //comment out to here

        var $message = $('<div class="message"></div>'); //comment out to revert to default
        $message.text(tweet.message);
        $message.appendTo($tweet);

        var $timeStamp = $('<div class="timestamp"></div>');
        $timeStamp.text(jQuery.timeago(new Date(tweet.created_at)));
        $timeStamp.appendTo($tweet);

          var $comment = $('<i class="fas fa-comments comment"></i>');
          var $retweet = $('<i class="fas fa-retweet retweet"></i>');
          var $like = $('<i class="fas fa-heart like"></i>');
          var $share = $('<i class="fas fa-share share"></i>');

        $comment.appendTo($tweet);
        $retweet.appendTo($tweet);
        $like.appendTo($tweet);
        $share.appendTo($tweet);

        $tweet.appendTo($feed);

        latest++;


      }
  }

  else if (user === undefined && update) {
    console.log("updating")
    $('#feed').empty()

    index = streams.home.length - 1;
    latest = 0;
    while(index >= latest){

      var tweet = streams.home[latest];

      var $tweet = $('<div class="tweet"></div>');

      var profile_pic = tweet.profilePhotoURL;
      var $profilePhoto = $(`<img class="profile-photo" src="${profile_pic}"></img>`);
      $profilePhoto.appendTo($tweet);


      var $username = $('<div class=username></div>');
      $username.text('@' + tweet.user + ': ');
      $username.appendTo($tweet); //comment out to here

      var $message = $('<div class="message"></div>'); //comment out to revert to default
      $message.text(tweet.message);
      $message.appendTo($tweet);

      var $timeStamp = $('<div class="timestamp"></div>');
      $timeStamp.text(jQuery.timeago(new Date(tweet.created_at)));
      $timeStamp.appendTo($tweet);

        var $comment = $('<i class="fas fa-comments comment"></i>');
        var $retweet = $('<i class="fas fa-retweet retweet"></i>');
        var $like = $('<i class="fas fa-heart like"></i>');
        var $share = $('<i class="fas fa-share share"></i>');

      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);

      $tweet.prependTo($feed);

      latest++;

      $(".username").on("click", function(event) {
        //  console.log(event.target.innerText);
        $usernames = $(".username");

         var userToGet = event.target.innerText;
         userToGet = userToGet.slice(1, userToGet.length - 1);
         console.log(userToGet);
        // debugger;
        var $buttonToChange = $("#update-feed");
        $buttonToChange.html("Back");

         renderFeed(userToGet);

       })


    }
  }
  };





   renderFeed();


   $(".username").on("click", function(event) {
    //  console.log(event.target.innerText);
    $usernames = $(".username");

     var userToGet = event.target.innerText;
     userToGet = userToGet.slice(1, userToGet.length - 1);
     console.log(userToGet);
    // debugger;
    var $buttonToChange = $("#update-feed");
    $buttonToChange.html("Back");

     renderFeed(userToGet);

   })



});

