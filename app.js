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
  var $tweetDiv = $ ('<div class="flexbox-container"></div>');

// Helper & event handler functions ------------------

// Set event listeners (providing appropriate handlers as input)
$homeFeedButton.on("click", function(event) {
  renderFeed();
  return event;
});


$(document).on("click", ".username", function() {
  $tweetDiv.empty();
  $("#update-feed").text('BACK');
  var clickedUser = this.innerHTML;
  renderUserFeed(clickedUser);
})

$(document).on("click", "#update-feed", function() {
  if (this.innerHTML === "BACK");
  $("#update-feed").text('Update Feed');
})


//----RENDER USER FEED FUN -------

  var renderUserFeed = function(userInQuestion) {
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
      var userHandle = '@' + streams.home[i].user;
        if (seen[fullTweet] === undefined && userInQuestion === userHandle) {

          var $newTweet = $ ('<div class="flexbox-container tweet"></div>');
          $newTweet.text('');

          var $image = $ ('<img class="profile-photo" + <img src="./assets/img/' + streams.home[i].user + '.png">'+ '</img>');
          $image.appendTo($newTweet);

          var $newUser = $ ('<div class="username"></div>');
          $newUser.text('@' + streams.home[i].user);
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

        }

    }

  }

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

          var $newTweet = $ ('<div class="flexbox-container tweet"></div>');
          $newTweet.text('');

          var $image = $ ('<img class="profile-photo" + <img src="./assets/img/' + streams.home[i].user + '.png">'+ '</img>');
          $image.appendTo($newTweet);

          var $newUser = $ ('<div class="username"></div>');
          $newUser.text('@' + streams.home[i].user);
          $newUser.appendTo($newTweet);

          var $newTweetMessage = $ ('<p class="message"></p>');
          $newTweetMessage.text(streams.home[i].message)
          $newTweetMessage.appendTo($newTweet);

          var $icons = $ ('<span class="icon"style="font-size: 1.5em; color: green;">');
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

  //renderUserFeed();
  renderFeed();



// Append new HTML elements to the DOM

  $homeFeedSection.appendTo($app);
  $buttonDiv.appendTo($homeFeedSection);
  $homeFeedButton.appendTo($buttonDiv);
  $tweetDiv.appendTo($homeFeedSection);
  //$tweetMessage.appendTo('.tweet');




});

