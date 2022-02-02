$(document).ready(function(){
  jQuery("time.timeago").timeago();
  var $app = $ ('#app');
  $app.html('');

  var $title = $ ('<h1>Twiddler</h1>');
  $title.appendTo($app);
  $title.on ("click", function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  });

// Create new HTML elements ----------------
  var $homeFeedSection = $ ('<section id="feed"></section>');
  var $buttonDiv = $ ('<div class="buttons"></div>');
  var $homeFeedButton = $ ('<button id = "update-feed">Update Feed</button>');
  var $tweetDiv = $ ('<div class="tweetsContainer"></div>');
  //var $tweetMessage = $ ('<p class="message"></p>');


// Helper & event handler functions ------------------

  //-------PREPEND & APPEND CORRECTLY ------
  var orderCorrectly = function(input){
    input.prependTo($tweetDiv);
    $tweetDiv.appendTo($homeFeedSection);
    return orderCorrectly;
  }

  //-------RENDER FEED FUNCTION -----------


  var renderFeed = function() {
    var seen = {};
    $('.message').each(function() {
      var message = $(this).text();
      if (seen[message]) {
        $(this).remove();
      } else {
        seen[message] = true;
      }
    });
    //I HAVE REPLACED .TWEET WITH .MESSAGE ABOVE SO THAT MAY FIX THE PROB.. NOT WHOLE STRING??
    for (var i = 0; i < streams.home.length; i++) {
      var fullTweet = streams.home[i].message;
      console.log(streams.home[i]);
        if (seen[fullTweet] === undefined) {
          var newTweetObj = streams.home[i];
          var $newTweet = $ ('<div class="tweet"></div>');
          $newTweet.text('');
          $newTweet.text('');

          var $newUser = $ ('<div class="username"></div>');
          $newUser.html('');
          $newUser.text('@' + newTweetObj.user + ':' );
          $newUser.appendTo($newTweet);
          orderCorrectly($newTweet);

          var $newTweetMessage = $ ('<p class="message"></p>');
          $newTweetMessage.html('');
          $newTweetMessage.text(streams.home[i].message)
          $newTweetMessage.appendTo($newTweet);
          orderCorrectly($newTweet);

          var $image = $ ('<img class="profile-photo"src="assets/img/>' + newTweetObj.user + '.png"></img>');
          $image.appendTo($newTweet);
          orderCorrectly($newTweet);

          var $icons = $ ('<span class="icon"style="font-size: 1em; color: Tomato;">');
          var $comment = $ ('<i class="icon comment far fa-comment"></i>');
          $comment.appendTo($icons);
          var $retweet = $ ('<i class="icon retweet fas fa-retweet"></i>');
          $retweet.appendTo($icons);
          var $like = $ ('<i class="icon like fas fa-thubs-up"></i>');
          $like.appendTo($icons);
          var $share = $ ('<i class="icon share fas fa-share"></i>');
          $share.appendTo($icons);
          $icons.appendTo($newTweet);
          orderCorrectly($newTweet);

          var $timeStamp = $ ('<div class="timestamp"></div>');
          $timeStamp.appendTo($newTweet);
          $timeStamp.text(jQuery.timeago(streams.home[i].created_at));
          orderCorrectly($newTweet);

        }
    }

    return renderFeed;
  }

  renderFeed();
  // var $newUser = $ ('<div class="username"></div>');
  //         $newUser.html('');
  //         $newUser.text('--- placeholder user ---')
  //         $newUser.appendTo($newTweet);
  //         orderCorrectly($newTweet);

  //         var $newTweetMessage = $ ('<p class="message"></p>');
  //         $newTweetMessage.html('');
  //         $newTweetMessage.text('--placeholder message --')
  //         $newTweetMessage.appendTo($newTweet);
  //         orderCorrectly($newTweet);


// Set event listeners (providing appropriate handlers as input)
  $homeFeedButton.on("click", function(event) {
    renderFeed();
    return event;
  });

// Append new HTML elements to the DOM

  $homeFeedSection.appendTo($app);
  $buttonDiv.appendTo($homeFeedSection);
  $homeFeedButton.appendTo($buttonDiv);
  $tweetDiv.appendTo($homeFeedSection);
  //$tweetMessage.appendTo('.tweet');

});

