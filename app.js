$(document).ready(function(){
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
  var $tweetMessage = $ ('<p class="message"></p>');


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
    $('.tweet').each(function() {
      var message = $(this).text();
      if (seen[message]) {
        $(this).remove();
      } else {
        seen[message] = true;
      }
    });
    for (var i = 0; i < streams.home.length; i++) {
      var fullTweet = '@' + streams.home[i].user + ': ' + streams.home[i].message;
        if (seen[fullTweet] === undefined) {
          var newTweetObj = streams.home[i];
          var $newTweet = $ ('<div class="tweet"></div>');
          $newTweet.html('');
          $newTweet.text('@' + newTweetObj.user + ': ' );
          var $newTweetMessage = $ ('<p class="message"></p>');
          $newTweetMessage.html('');
          $newTweetMessage.text(newTweetObj.message)
          $newTweetMessage.appendTo($newTweet);
          orderCorrectly($newTweet);

        }
    }

    return renderFeed;
  }

  renderFeed();

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

