$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $ ('#app');
  $app.html('');

  var $title = $ ('<h1 class="title2">Twiddler</h1>');
  $title.appendTo($app);
  $('.title2').on ("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

// Create new HTML elements ----------------
  var $homeFeedSection = $ ('<section id="feed"></section>');
  var $buttonDiv = $ ('<div class="buttons"></div>');
  var $homeFeedButton = $ ('<button id = "update-feed">Update Feed</button>');
  var $tweetDiv = $ ('<div class="tweetsContainer"></div>');

// Helper & event handler functions ------------------

// Set event listeners (providing appropriate handlers as input)
$homeFeedButton.on("click", function(event) {
  //$tweetDiv.empty();
  renderFeed();
  return event;
});


$(document).on("click", ".username", function() {
  $tweetDiv.empty();
  $("#update-feed").text('BACK');
  renderFeed();

  //feed button needs to be included in render!!
})


//----RENDER USER FEED FUN -------

  // var renderUserFeed = function(userInQuestion) {
  //   var seen = {};
  //   $('.message').each(function() {
  //     var message = $(this).text();
  //     if (seen[message]) {
  //       $(this).remove();
  //     } else {
  //       seen[message] = true;
  //     }
  //   });

  //   for (var i = 0; i < streams.home.length; i++) {
  //     var fullTweet = streams.home[i].message;
  //     var userHandle = '@' + streams.home[i].username + ': ';
  //     //console.log(userHandle);
  //       if (seen[fullTweet] === undefined && userHandle === userInQuestion) {
  //         var newTweetObj = streams.home[i];

  //         var $newTweet2 = $ ('<div class="tweet"></div>');
  //         $newTweet2.text('');
  //         $newTweet2.text('');

  //         var $image2 = $ ('<img class="profile-photo"src="assets/img/>' + newTweetObj.user + '.png">');
  //         $image2.appendTo($newTweet2);

  //         var $newUser2 = $ ('<div class="username"></div>');
  //         $newUser2.text('');
  //         $newUser2.text('@' + newTweetObj.user + ':' );
  //         $newUser2.appendTo($newTweet2);

  //         var $newTweetMessage2 = $ ('<p class="message"></p>');
  //         $newTweetMessage2.html('');
  //         $newTweetMessage2.text(streams.home[i].message)
  //         $newTweetMessage2.appendTo($newTweet2);

  //         var $icons2 = $ ('<span class="icon"style="font-size: 1em; color: Tomato;">');
  //         var $comment2 = $ ('<i class="icon comment far fa-comment"></i>');
  //         $comment2.appendTo($icons2);
  //         var $retweet2 = $ ('<i class="icon retweet fas fa-retweet"></i>');
  //         $retweet2.appendTo($icons2);
  //         var $like2 = $ ('<i class="icon like fas fa-thumbs-up"></i>');
  //         $like2.appendTo($icons2);
  //         var $share2 = $ ('<i class="icon share fas fa-share"></i>');
  //         $share2.appendTo($icons);
  //         $icons2.appendTo($newTweet2);

  //         var $timeStamp2 = $ ('<div class="timestamp"></div>');
  //         $timeStamp2.appendTo($newTweet2);
  //         $timeStamp2.text(jQuery.timeago(streams.home[i].created_at));
  //         orderCorrectly($newTweet2);

  //       }

  //   }
  //   return renderUserFeed;
  // }

  //-------RENDER FEED FUNCTION -----------

  // REFRESH ITERATION NOT YET WORKING IN THIS FUNCTION.
  var renderFeed = function(clickInupt) {
    var seen = {};
    $('.message').each(function() {
      var message = $(this).text();
      if (seen[message]) {
        $(this).remove();
      } else {
        seen[message] = true;
      }
    });

    for (var i = 0; i < streams.home.length; i++) {
      var fullTweet = streams.home[i].message;
        if (seen[fullTweet] === undefined) {
          var newTweetObj = streams.home[i];



          var $newTweet = $ ('<div class="tweet"></div>');
          $newTweet.text('');

          var $image = $ ('<img class="profile-photo" + <img src="./assets/img/' + newTweetObj.user + '.png">'+ '</img>');
          $image.appendTo($newTweet);

          var $newUser = $ ('<div class="username"></div>');
          $newUser.text('@' + newTweetObj.user + ':' );
          $newUser.appendTo($newTweet);

          var $newTweetMessage = $ ('<p class="message"></p>');
          $newTweetMessage.text(streams.home[i].message)
          $newTweetMessage.appendTo($newTweet);

          var $icons = $ ('<span class="icon"style="font-size: 1em; color: Tomato;">');
          var $comment = $ ('<i class="icon comment far fa-comment"></i>');
          $comment.appendTo($icons);
          var $retweet = $ ('<i class="icon retweet fas fa-retweet"></i>');
          $retweet.appendTo($icons);
          var $like = $ ('<i class="icon like fas fa-thumbs-up"></i>');
          $like.appendTo($icons);
          var $share = $ ('<i class="icon share fas fa-share"></i>');
          $share.appendTo($icons);
          $icons.appendTo($newTweet);

          var $timeStamp = $ ('<div class="timestamp"></div>');
          $timeStamp.appendTo($newTweet);
          $timeStamp.text(jQuery.timeago(streams.home[i].created_at));

          $newTweet.prependTo($tweetDiv);
          $tweetDiv.appendTo($homeFeedSection);



          // $newUser.on ("click", function(event) {
          //   $homeFeedButton.text('BACK');
          //   var theUser = event.target.innerText /* WILL RETURN USERNAME.. PASS INTO USER FEED FUNCTION */
          //   // $newUser.html('');
          //   // $newTweetMessage.text('');
          //   $tweetDiv.empty();
          //   //EMPTY IS WORKING, RE-RENDER IS NOT
          //   rendeUserFeed(event, theUser);
          // });

        }

    }


  }

  renderFeed();


// Append new HTML elements to the DOM

  $homeFeedSection.appendTo($app);
  $buttonDiv.appendTo($homeFeedSection);
  $homeFeedButton.appendTo($buttonDiv);
  $tweetDiv.appendTo($homeFeedSection);
  //$tweetMessage.appendTo('.tweet');




});

